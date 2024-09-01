const config = require("./utils/config");
const logger = require("./utils/logger");
const express = require("express");

const middleware = require("./utils/middleware");
const cors = require("cors");
const blogRouter = require("./controllers/blog");

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
app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use(middleware.errorHandler);
module.exports = app;
