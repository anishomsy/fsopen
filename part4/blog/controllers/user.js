const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.post("/", async (request, response, next) => {
  const { username, password, name } = request.body;
  // validate stuff here for early return
  if (password.length < 6) {
    return response
      .status(400)
      .json({ error: "password should be at least 6 characters long" });
  }

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({ username, name, passwordHash });

    const savedUser = await user.save();

    return response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({}).populate("blogs", {
      title: 1,
      author: 1,
      likes: 1,
    });
    return response.status(200).json(users);
  } catch (error) {
    next(error);
  }
});
module.exports = usersRouter;
