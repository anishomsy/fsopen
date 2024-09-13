const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user.js");

const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware.js");

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

blogRouter.post(
  "/",
  middleware.userExtractor,
  async (request, response, next) => {
    const body = request.body;
    try {
      const decodedToken = await jwt.verify(request.token, process.env.SECRET);

      if (!decodedToken.id) {
        return response.status(401).json({ error: "token invalid" });
      }

      const user = await User.findById(decodedToken.id);

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

      const toBeReturned = await savedBlog.populate("user", {
        username: 1,
        name: 1,
      });
      response.status(201).json(toBeReturned);
    } catch (error) {
      next(error);
    }
    // blog.save().then((result) => {
    //   response.status(201).json(result);
    // });
  },
);

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response, next) => {
    const id = request.params.id;
    try {
      // const deletedBlog = await Blog.findByIdAndDelete(id);

      // const deletedBlog = await Blog.findOneAndDelete({
      //   user: decodedToken.id,
      //   _id: id,
      // });
      // if (!deletedBlog) {
      //   return response.status(404).end();
      // }
      const user = request.user;

      const blogToBeDeleted = await Blog.findOne({ _id: id });
      if (!blogToBeDeleted) {
        return response.status(404).end();
      }

      if (blogToBeDeleted.user.toString() !== user._id.toString()) {
        return response.status(401).json({ error: "user is not authorized" });
      }

      // delete resource
      await blogToBeDeleted.deleteOne();

      return response.status(200).json(blogToBeDeleted);
    } catch (error) {
      next(error);
    }
  },
);

blogRouter.put("/:id", async (request, response, next) => {
  const id = request.params.id;
  try {
    const updatedBlog = {
      title: request.body.title,
      url: request.body.url,
      author: request.body.author,
      likes: request.body.likes,
    };
    const result = await Blog.findByIdAndUpdate(
      id,
      {
        $set: updatedBlog,
      },
      { new: true },
    ).populate("user", {
      username: 1,
      name: 1,
    });
    // if (!originalBlog) {
    //   return response.status(404).end();
    // }
    //
    // const result = await originalBlog.updateOne(updatedBlog, {
    //   returnDocument: true,
    // });
    if (!result) {
      return response.status(404).end();
    }

    console.log(result);
    // console.log(result);
    return response.status(200).json(result);
  } catch (error) {
    next(error);
  }
});
module.exports = blogRouter;
