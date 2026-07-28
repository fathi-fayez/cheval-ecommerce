import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.headers.cookie) {
    const cookieMatch = req.headers.cookie.match(/(?:^|;\s*)jwt=([^;]+)/);
    if (cookieMatch) {
      token = decodeURIComponent(cookieMatch[1]);
    }
  }

  if (!token) {
    return next(
      new AppError("You are not logged in. Please log in to get access.", 401),
    );
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
  } catch (error) {
    return next(new AppError("Invalid or expired token", 401));
  }

  const currentUser = await userModel.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists.", 401),
    );
  }

  req.user = currentUser;
  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );
    }

    next();
  };
};

export { protect, restrictTo };
