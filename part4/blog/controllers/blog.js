const blogRouter = require("express").Router();

const Blog = require("../models/blog");
blogRouter.get("/", async (request, response, next) => {
  // Blog.find({}).then((blogs) => {
  //   response.json(blogs);
  // });

  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  // if (!request.body.title || !request.body.url) {
  //   return response.status(400).json({ error: "title missing" });
  // }

  try {
    const blog = new Blog(request.body);
    const result = await blog.save();

    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
  // blog.save().then((result) => {
  //   response.status(201).json(result);
  // });
});

blogRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return response.status(404).end();
    }

    return response.status(200).json(deletedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  const id = request.params.id;
  try {
    const updatedObject = {
      title: request.body.title,
      url: request.body.url,
      author: request.body.author,
      likes: request.body.likes,
    };
    const result = await Blog.findByIdAndUpdate(id, updatedObject, {
      new: true,
    });
    if (!result) {
      return response.status(404).end();
    }
    // console.log(result);
    return response.status(200).json(result);
  } catch (error) {
    next(error);
  }
});
module.exports = blogRouter;
