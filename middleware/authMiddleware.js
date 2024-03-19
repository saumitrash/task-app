const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const authHeader = req.headers.authorization;

  // Check if token exists
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, "your_secret_key");

    // Attach the decoded user information to the request object
    req.userId = decoded.userId;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = authMiddleware;
