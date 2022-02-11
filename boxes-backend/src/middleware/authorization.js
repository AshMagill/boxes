const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will continue on if the token is inside the local storage
module.exports = async (req, res, next) => {
  const jwtToken = req.header("token");
  if (!jwtToken) {
    return res.status(403).json("Autherization denied");
  }
  try {
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    req.user = payload.user;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Token is not valid");
  }
};
