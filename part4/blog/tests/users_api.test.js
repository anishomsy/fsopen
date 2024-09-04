const { test, after, beforeEach, describe, it } = require("node:test");
const assert = require("assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const api = supertest(app);

describe("when creating a new user, test that", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash("jamespassword", saltRounds);

    const newUser = User({
      username: "root",
      name: "super",
      passwordHash: passwordHash,
    });
    await newUser.save();
  });
  it("user can be created with a new username", async () => {
    const newUser = {
      username: "jamesmorgan",
      name: "james Morgan",
      password: "jamespassword",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  it("user can not be created if the username has less than 3 characters", async () => {
    const newUser = {
      username: "th",
      name: "james Morgan",
      password: "jamespassword",
    };
    await api.post("/api/users").send(newUser).expect(400);
  });
  it("user can not be created if the username is not unique", async () => {
    // root is already taken
    const newUser = {
      username: "root",
      name: "james Morgan",
      password: "jamespassword",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
  it("user can not be created if the password is less than 6 characters", async () => {
    const newUser = {
      username: "newUser",
      name: "james Morgan",
      password: "jam",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
  after(() => {
    mongoose.connection.close();
  });
});
