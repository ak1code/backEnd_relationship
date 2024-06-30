const express = require("express");
const { UserModal } = require("../Modal/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../Middleware/authMiddleware");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, password, email } = req.body;
  bcrypt.hash(password, 5, async (err, hash) => {
    if (err) console.log("err", err);
    else {
      const user = await new UserModal({ name, password: hash, email });
      user.save();
      res.send("user created succefully");
    }
  });
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModal.findOne({ email });
  if (user) {
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) console.log("err", err);
      else {
        if (result) {
          const token = jwt.sign(
            { userId: user?._id, userName: user?.name },
            "masai"
          );
          res.send({ token, name: user.name, message: "login succefully" });
        }
      }
    });
  }
});

userRouter.get("/", auth, async (req, res) => {
  const users = await UserModal.find();
  res.send({ data: users });
});

module.exports = { userRouter };
