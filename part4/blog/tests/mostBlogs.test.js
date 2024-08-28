const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const { blogs } = require("./helper");

describe("most Blogs", () => {
  test("mostBlogs returns undefined when no blogs are provided (empty array)", () => {
    const result = listHelper.mostBlogs([]);
    assert.strictEqual(result, null);
  });
  test("mostBlogs returns the author when a single blog is provided", () => {
    const result = listHelper.mostBlogs([blogs[0]]);
    assert.deepStrictEqual(result, { author: "Michael Chan", blogs: 1 });
  });

  test("mostBlogs returns the author with the most blogs when multiple authors are present", () => {
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, { author: "Robert C. Martin", blogs: 3 });
  });

  test("mostBlogs handles a tie by returning one of the authors with the most blogs", () => {
    const blogs = [
      { author: "Author 1", title: "Blog 1" },
      { author: "Author 2", title: "Blog 2" },
      { author: "Author 1", title: "Blog 3" },
      { author: "Author 2", title: "Blog 4" },
    ];
    const result = listHelper.mostBlogs(blogs);

    assert.deepStrictEqual(result, { author: "Author 1", blogs: 2 });
  });
});
