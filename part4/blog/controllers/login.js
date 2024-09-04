const loginRouter = require("express").Router();

const Blog = require("../models/blog");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (request, response, next) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username: username });

  if (!user) {
    return response.status(401).json({ error: "invalid username" });
  }

  if (password.length < 6) {
    return response.status(401).json({ error: "invalid password" });
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

  if (!passwordCorrect) {
    return response.status(401).json({ error: "invalid password" });
  }

  const userInfoForToken = {
    username: user.username,
    name: user.name,
    id: user._id,
  };
  const token = jwt.sign(userInfoForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  return response.status(200).json({
    token: token,
    username: user.username,
    name: user.name,
    id: user._id,
  });
});

module.exports = loginRouter;
