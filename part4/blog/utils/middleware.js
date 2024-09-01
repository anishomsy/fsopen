const logger = require("./logger");
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

module.exports = { errorHandler };
