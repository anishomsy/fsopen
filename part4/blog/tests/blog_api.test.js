const { test, after, beforeEach, describe, it } = require("node:test");
const assert = require("assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const helper = require("./helper");
const app = require("../app.js");

const api = supertest(app);
describe("testing Blog API", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    await Blog.insertMany(helper.blogs);
  });

  describe("when getting blogs, test that ", () => {
    test("blogs are returned as json", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test(" the correct amount of blogs are returned", async () => {
      const blogs = await api.get("/api/blogs");

      assert.strictEqual(blogs.body.length, 6);
    });

    test("the id property is returned instead of _id", async () => {
      const data = await api.get("/api/blogs").expect(200);
      assert(Object.keys(data.body[0]).find((key) => key === "id"));
    });
  });

  describe("when adding a blog, test that", () => {
    test("the length of the blogs increased by one", async () => {
      const newBlogObject = {
        title: "Test 1",
        author: "Author 1",
        url: "localhost.com",
        likes: 30,
      };

      await api.post("/api/blogs").send(newBlogObject).expect(201);
      const blogs = await api.get("/api/blogs");
      // console.log(blogs.body);
      assert.strictEqual(helper.blogs.length + 1, blogs.body.length);
    });

    test("if the likes property was not in the request,  return a default value of 0 likes", async () => {
      const newBlogObject = {
        title: "Test 1",
        author: "Author 1",
        url: "localhost.com",
      };

      const result = await api
        .post("/api/blogs")
        .send(newBlogObject)
        .expect(201);
      assert.strictEqual(result.body.likes, 0);
    });
    test("if title is missing, return an error 400", async () => {
      const newBlogObject = {
        author: "Author 1",
        url: "localhost.com",
        likes: 4,
      };

      const result = await api
        .post("/api/blogs")
        .send(newBlogObject)
        .expect(400);
    });
    test("if url is missing, return an error 400", async () => {
      const newBlogObject = {
        title: "Test 1",
        author: "Author 1",
        likes: 4,
      };

      const result = await api
        .post("/api/blogs")
        .send(newBlogObject)
        .expect(400);
    });
  });

  describe("when deleting a blog, test that", () => {
    it("blog is deleted successfully", async () => {
      // get lists of blogs and get the first id
      const blogs = await api.get("/api/blogs").expect(200);
      const chosenBlog = blogs.body[0];
      const deletedBlog = await api
        .delete(`/api/blogs/${chosenBlog.id}`)
        .expect(200);
      assert.deepStrictEqual(deletedBlog.body, chosenBlog);
    });
    it("if the id is not valid, returns error 400", async () => {
      const id = "afdsfsdr34342";
      await api.delete(`/api/blogs/${id}`).expect(400);
    });
    it("if the id is valid, but the resources is already deleted, returns 404", async () => {
      const id = "5a422b3a1b54a676234d17f3";
      await api.delete(`/api/blogs/${id}`).expect(404);
    });
  });

  describe("when updating a blog, test that", () => {
    it("blog is updated successfully", async () => {
      const blogs = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
      const chosenBlog = blogs.body[0];
      const newBlog = {
        ...chosenBlog,
        likes: chosenBlog.likes + 1,
      };
      // console.log(chosenBlog);
      const result = await api
        .put(`/api/blogs/${chosenBlog.id}`)
        .send(newBlog)
        .expect(200);
      // console.log(result.body);
      assert.deepStrictEqual(result.body, newBlog);
    });
    it("if the id is valid, but the resource does not exists, returns a 404", async () => {
      const blogs = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
      const chosenBlog = blogs.body[0];
      const newBlog = {
        ...chosenBlog,
        likes: chosenBlog.likes + 1,
      };
      const id = "5a422a851b54a676234d17f3";
      // console.log(chosenBlog);
      await api.put(`/api/blogs/${id}`).send(newBlog).expect(404);
      // console.log(result.body);
    });
    it("if the id is invalid, returns a 400", async () => {
      const blogs = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
      const chosenBlog = blogs.body[0];
      const newBlog = {
        ...chosenBlog,
        likes: chosenBlog.likes + 1,
      };
      const id = "this_id_is_invalid";
      // console.log(chosenBlog);
      await api.put(`/api/blogs/${id}`).send(newBlog).expect(400);
      // console.log(result.body);
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
