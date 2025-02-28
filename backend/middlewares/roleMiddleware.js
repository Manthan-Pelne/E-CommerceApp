const checkRole = (roles) => (req, res, next) => {
  const userRole = req.user?.[0]?.role;  
  const ownerRole = req.owner?.[0]?.role;
  if (!roles.includes(userRole) && !roles.includes(ownerRole)) {
      return res.status(403).json({ message: "Access Denied" });
  }
  next();
};



  module.exports = {checkRole}