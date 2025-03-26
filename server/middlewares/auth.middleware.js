const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; // Extract token from 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the user info to the request object
    next();
  } catch (error) {
    console.error("JWT Verification Error: ", error); // Log the detailed error
    res.status(401).json({ message: "Token is not valid", error: error.message });
  }
};

module.exports = { authMiddleware };
