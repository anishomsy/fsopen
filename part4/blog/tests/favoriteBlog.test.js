const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

const { blogs } = require("./helper");

describe("favourite blog", () => {
  test("when list is just one blog object, return the same object", () => {
    const favorite = listHelper.favoriteBlog(blogs[0]);
    assert.deepStrictEqual(blogs[0], favorite);
  });

  test("when provided list of blogs, return the one with the maximum likes", () => {
    const favorite = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(blogs[2], favorite);
  });
});
