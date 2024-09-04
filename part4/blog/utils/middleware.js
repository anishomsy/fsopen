const User = require("../models/user");
const logger = require("./logger");

const jwt = require("jsonwebtoken");

const errorHandler = (error, request, response, next) => {
  switch (error.name) {
    case "CastError": {
      return response.status(400).send({ error: "malformatted id" });
    }
    case "ValidationError": {
      return response.status(400).json(
        Object.values(error.errors).map((val) => ({
          field: val.path,
          message: val.message,
        })),
      );
    }

    case "MongoServerError": {
      if (error.code === 11000) {
        const message = Object.keys(error.keyPattern).map((val) => ({
          error: `${val} should be unique`,
        }));
        return response.status(400).json(message[0]);
      }
    }
    case "TokenExpiredError": {
      return response.status(401).json({ error: "token expired" });
    }
    // console.log();
    case "JsonWebTokenError": {
      if (error.message === "jwt must be provided") {
        return response.status(401).json({ error: "token must be provided" });
      }
      return response.status(401).json({ error: error.message });
    }

    default:
      break;
  }
  // if (error.name === "CastError") {
  //   return response.status(400).send({ error: "malformatted id" });
  // } else if (error.name === "ValidationError") {
  //   return response
  //     .status(400)
  //     .json(
  //       Object.values(error.errors).map((val) => ({
  //         path: val.path,
  //         message: val.message,
  //       })),
  //     );
  // }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
    next();
    return;
  }
  request.token = null;
  next();
};

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = await jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);
    request.user = user;

    next();
    return;
  } catch (error) {
    next(error);
  }
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
