const loginUser = async (page, username, password) => {
  await page.getByRole("button", { name: "login" }).click();
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByTestId("loginBtn").click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "new blog" }).click();
  await page.getByTestId("newBlogTitle").fill(title);
  await page.getByTestId("newBlogAuthor").fill(author);
  await page.getByTestId("newBlogUrl").fill(url);
  await page.getByTestId("newBlogCreateBtn").click();
  await page.getByRole("button", { name: "cancel" }).click();
};

export { loginUser, createBlog };
