const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const { access_token } = req.cookies;

  // check if token exists
  if (!access_token) {
    return res.status(403).json({ message: "Please login first" });
  }
  // verify the token
  try {
    const decode = jwt.verify(access_token, process.env.JWT_SECRET);

    // setting a user to a payload object
    req.user = decode;
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
    console.log(error);
  }
  next();
};

module.exports = authenticate;
