// middlewares/error.middleware.js

const errorHandler = (err, req, res, next) => {
  // Log the error for debugging purposes
  console.error(err.stack);

  // Check the type of error and set the appropriate status code and message
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ error: "Unauthorized access" });
  }
  if (err.name === "NotFoundError") {
    return res.status(404).json({ error: "Resource not found" });
  }

  // General error handling
  return res.status(500).json({ error: "Internal Server Error" });
};

module.exports = errorHandler;
