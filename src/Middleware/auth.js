const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const { access_token } = req.cookies;
  const { authorization: access_token_header } = req.headers;

  // check if token exists  in cookie
  if (access_token) {
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
  }
  // check if token exists in headers 
  else {
    // check if token exists
    if (access_token_header) {
      // verify the token
      try {
        const decode = jwt.verify(access_token_header, process.env.JWT_SECRET);
        // setting a user to a payload object
        req.user = decode;
      } catch (error) {
        res.status(403).json({ message: "Invalid token" });
        console.log(error);
      }
      next();
    }
    else {
      // if no token, return 401
      return res.status(403).json({ message: "Please login first" });
    }
  }

};

module.exports = authenticate;
