const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
      if (!req.user || !req.user.role) {
        return res.status(403).json({ message: "Unauthorized: No role found" });
      }
  
      if (req.user.role !== requiredRole) {
        return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }
  
      next();
    };
  };
  
  module.exports = roleMiddleware;
  