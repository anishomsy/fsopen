const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginUser, createBlog } = require("./helper");

const testUser = {
  name: "John Doe",
  username: "testUser",
  password: "password",
};

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await page.goto("http://localhost:5173");
    await request.post("http://localhost:5173/api/testing/reset");
    await request.post("http://localhost:5173/api/users", {
      data: testUser,
    });
  });

  test("Login form is shown", async ({ page }) => {
    await page.getByRole("button", { name: "login" }).click();
    await expect(page.getByTestId("username")).toBeVisible();
    await expect(page.getByTestId("password")).toBeVisible();
    await expect(page.getByTestId("loginBtn")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with the correct credientials", async ({ page }) => {
      await loginUser(page, testUser.username, testUser.password);
      await expect(
        page.getByText(`${testUser.name} is logged in`),
      ).toBeVisible();
    });

    test("fails with incorrect credientials", async ({ page }) => {
      await loginUser(page, testUser.username, "wrongPassword");

      const locator = await page.locator(".notification.error");
      await expect(locator.getByText("invalid password")).toBeVisible();
    });
  });

  describe("When is logged in", () => {
    beforeEach(async ({ page }) => {
      await loginUser(page, testUser.username, testUser.password);
    });

    test(" new blog can be created", async ({ page }) => {
      await createBlog(page, "Test Blog 1", "Jane Doe", "http://example.com/");

      await expect(page.getByText("Test Blog 1 - Jane Doe")).toBeVisible();
    });

    describe("new blog", () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          "Test Blog 2",
          "Jane Doe",
          "http://example.com/",
        );
      });

      test("can be liked", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click();

        // verify that the likes count is 0
        await expect(page.getByText("likes:0")).toBeVisible();

        // click the like button and verify that the likes increase by one
        await page.getByRole("button", { name: "like" }).click();

        await expect(page.getByText("likes:1")).toBeVisible();
      });

      test("can be deleted", async ({ page }) => {
        await expect(page.getByText("Test Blog 2 - Jane Doe")).toBeVisible();

        await page.getByRole("button", { name: "view" }).click();

        // find delete button and check that the blog is deleted
        //
        await page.getByRole("button", { name: "delete" }).click();

        page.on("dialog", async (dialog) => console.log(await dialog.accept()));

        await expect(page.getByText("Test Blog 2 - Jane Doe")).toHaveCount(0);
      });
    });

    test("blog can only be deleted by the user that added it", async ({
      page,
      request,
    }) => {
      // create a new blog and verify that you can see the delete button

      await createBlog(page, "Test Blog 1", "Jane Doe", "http://example.com/");

      await expect(page.getByText("Test Blog 1 - Jane Doe")).toBeVisible();

      await page.getByRole("button", { name: "view" }).click();

      await expect(page.getByRole("button", { name: "delete" })).toHaveCount(1);

      // logout
      page.getByRole("button", { name: "logout" }).click();

      await expect(page.getByText(`${testUser.name} is logged in`)).toHaveCount(
        0,
      );

      await page.getByRole("button", { name: "hide" }).click();

      const testUser2 = {
        username: "testUser2",
        name: "Jane Doe",
        password: "password",
      };

      // create a new user
      await request.post("http://localhost:5173/api/users", {
        data: testUser2,
      });

      await loginUser(page, testUser2.username, testUser2.password);
      await expect(
        page.getByText(`${testUser2.name} is logged in`),
      ).toBeVisible();

      await page.getByRole("button", { name: "view" }).click();

      await expect(page.getByRole("button", { name: "delete" })).toHaveCount(0);
    });

    test("blog is sorted by likes", async ({ page }) => {
      await createBlog(page, "Test Blog 1", "Jane Doe", "http://example.com/");

      await expect(page.getByText("Test Blog 1 - Jane Doe")).toBeVisible();

      await createBlog(page, "Test Blog 2", "Katie Doe", "http://example.com/");

      await expect(page.getByText("Test Blog 2 - Katie Doe")).toBeVisible();

      // Check that they are in the correct order before the likes

      const blogList = page.locator(".blog-list .blog");
      await expect(
        blogList.nth(0).getByText("Test Blog 1 - Jane Doe"),
      ).toBeVisible();
      await expect(
        blogList.nth(1).getByText("Test Blog 2 - Katie Doe"),
      ).toBeVisible();

      // like the second blog
      const secondBlog = await blogList.nth(1);
      await secondBlog.getByRole("button", { name: "view" }).click();

      // verify that the likes count is 0
      await expect(secondBlog.getByText("likes:0")).toBeVisible();
      await secondBlog.getByRole("button", { name: "like" }).click();

      // it changed to the first blog
      await expect(blogList.nth(0).getByText("likes:1")).toBeVisible();

      await blogList.nth(0).getByRole("button", { name: "hide" }).click();

      await expect(
        blogList.nth(0).getByText("Test Blog 2 - Katie Doe"),
      ).toBeVisible();

      await expect(
        blogList.nth(1).getByText("Test Blog 1 - Jane Doe"),
      ).toBeVisible();
    });
  });
});
