const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, "masai", function (err, decoded) {
    if (decoded) {
      console.log("decoded", decoded);
      req.body.userId = decoded.userId;
      req.body.userName = decoded?.userName;
      next();
    } else {
      res.send({ message: "you are not authorized" });
    }
  });
};

module.exports = { auth };
