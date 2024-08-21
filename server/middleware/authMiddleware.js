const User = require('../models/User');
const jwt = require('jsonwebtoken')

const requireAuth = async(req, res, next) => {
    const token = req.cookies.accessCookies;

    console.log("Token:", token, "Type:", typeof token, "req ", req.cookies); // Debugging
    if (token) {
        console.log("has token")
        jwt.verify(
          token,
          process.env.JWT_SECRET_TOKEN,
          async function (err, decodedToken) {
            if (err) {
              console.log("check user failed");
              console.log(err.message);
              req.user = null;
              next();
            } else {
              console.log("check user successfully");
              console.log(decodedToken);
              let user = await User.findOne({ where: { id: decodedToken.id } });
              req.user = user;
              next();
            }
          }
        );
      }
      else{
        console.log("no token")
        res.status(401).send({ error: 'Not authorized to access this resource' })
      }
}

const checkUser = function (req, res, next) {
  const token = req.cookies.accessCookies;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET_TOKEN,
      async function (err, decodedToken) {
        if (err) {
          console.log("check user failed");
          console.log(err.message);
          req.user = null;
          next();
        } else {
          console.log("check user successfully");
          console.log(decodedToken);
          let user = await User.findOne({ where: { id: decodedToken.id } });
          req.user = user;
          next();
        }
      }
    );
  } else {
    console.log("check user null");
    req.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
