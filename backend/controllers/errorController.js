import AppError from "../utils/appError.js";

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const field = err.keyValue
    ? Object.keys(err.keyValue)[0]
    : err.errmsg?.match(/\{\s*"?([a-zA-Z0-9_]+)"?\s*:/)?.[1];

  const value = err.keyValue ? err.keyValue[field] : err.errmsg;

  if (field === "email") {
    return new AppError(
      "User already exists. Please use a different email.",
      409,
    );
  }

  const message = field
    ? `Duplicate field value for ${field}: ${value}. Please use another value!`
    : "Duplicate field value. Please use another value!";

  return new AppError(message, 409);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

const shouldSendJson = (req) => {
  return (
    req.originalUrl.startsWith("/api") ||
    req.headers.accept?.includes("application/json")
  );
};

const sendErrorDev = (err, req, res) => {
  if (shouldSendJson(req)) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  const viewEngine = req.app.get("view engine");
  if (!viewEngine) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  if (shouldSendJson(req)) {
    // Operational, trusted error: send message to client
    // Operational, trusted error: send message to client
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });

      // Programming or other unknown error: don't leak error details
    } else {
      // 1) Log error
      console.error("ERROR 💥", err);

      // 2) Send generic message
      res.status(500).json({
        status: "error",
        message: "Something went very wrong!",
      });
    }
  } else {
    const viewEngine = req.app.get("view engine");
    if (!viewEngine) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.isOperational ? err.message : "Something went very wrong!",
      });
    }

    if (err.isOperational) {
      res.status(err.statusCode).render("error", {
        title: "Something went wrong!",
        msg: err.message,
      });
    } else {
      console.error("ERROR 💥", err);

      res.status(err.statusCode).render("error", {
        title: "Something went wrong!",
        msg: "Please try again later.",
      });
    }
  }
};

export default (err, req, res, next) => {
  let error = { ...err };
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  const env = process.env.NODE_ENV || "development";

  if (error.name === "CastError") error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === "ValidationError") error = handleValidationErrorDB(error);
  if (error.name === "JsonWebTokenError") error = handleJWTError();
  if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

  if (env === "development") {
    sendErrorDev(error, req, res);
  } else if (env === "production") {
    sendErrorProd(error, req, res);
  } else {
    sendErrorDev(error, req, res);
  }
};
