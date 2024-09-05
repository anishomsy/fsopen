const config = require("./utils/config");
const logger = require("./utils/logger");
const express = require("express");

const middleware = require("./utils/middleware");
const cors = require("cors");
const blogRouter = require("./controllers/blog");
const usersRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const morgan = require("morgan");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

// config express
const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);

app.use("/api/login", loginRouter);
app.use(middleware.errorHandler);
module.exports = app;
