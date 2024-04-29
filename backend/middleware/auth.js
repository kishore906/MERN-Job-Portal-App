import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

// middleware to handle token verification
const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Please login first to access the route" });
  }

  try {
    // const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await User.findById(_id);
    // console.log(user);

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload); // { _id: '66094ecca670984d066fad52', role: 'admin', iat: 1711886130, exp: 1711972530 }

    req.user = payload;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token Expired Please Login" });
    }
    res.status(500).json({ error: err.message });
  }
};

// middleware to verify role and grant access to the route
const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role ${req.user.role} doesn't have access to this route`,
      });
    }

    next();
  };
};

export { isAuthenticated, isAuthorized };
