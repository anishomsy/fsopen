const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const { blogs } = require("./helper");

describe("most Likes", () => {
  test("mostLikes returns undefined when no blogs are provided (empty array)", () => {
    const result = listHelper.mostLikes([]);
    assert.strictEqual(result, null);
  });
  test("mostLikes returns the author when a single blog is provided", () => {
    const result = listHelper.mostLikes([blogs[0]]);
    assert.deepStrictEqual(result, { author: "Michael Chan", likes: 7 });
  });
  test("mostLikes returns the author with the most blogs when multiple authors are present", () => {
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 17 });
  });
});
