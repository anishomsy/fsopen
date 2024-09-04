const blogRouter = require("express").Router();

const Blog = require("../models/blog");
const User = require("../models/user.js");

blogRouter.get("/", async (request, response, next) => {
  // Blog.find({}).then((blogs) => {
  //   response.json(blogs);
  // });
  //

  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  const body = request.body;

  try {
    const user = await User.findOne({});

    const newBlog = {
      title: body.title,
      author: body.author,
      likes: body.likes,
      url: body.url,
      user: user._id,
    };

    const blog = new Blog(newBlog);

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
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
