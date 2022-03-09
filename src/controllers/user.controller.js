const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const userService = require("../services/user.service");

const access_token_secret = process.env.ACCESS_TOKEN_SECRET || "acc_secret";
const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET || "ref_secret";

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log("Time: ", Date.now());
//   next();
// });
// define the home page route
const generateToken = (payload) => {
  const access_token = jwt.sign(payload, access_token_secret, {
    expiresIn: 15*60,
  });
  const refresh_token = jwt.sign(payload, refresh_token_secret, {
    expiresIn: 7*24*60*60,
  });
  return {access_token, refresh_token};
};

userRouter.post("/login", async (req, res) => {
  try {
    console.log("goi get user");
    const { username, password } = req.body;

    const user = await userService.findOne({ username });
    if (!user) throw new Error("Username wrong");
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) throw new Error("Password wrong");
    res.status(200).json(generateToken({ id: user.id, username }));
  } catch (e) {
    res.status(400).json({ message: e.message || String(e) });
  }
});

// define the about route
userRouter.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    // console.log('username', username);
    console.log(req.body);
    const result = await userService.createOne({
      username,
      password: bcrypt.hashSync(password, 10),
      role: 1,
    });
    res.send("post successfully");
  } catch (e) {
    res.status(400).json({ message: e.message || String(e) });
  }
});

userRouter.post("/refresh-token", async (req, res) => {
  try {
    const { refresh_token } = req.body;
    const decoded = jwt.verify(refresh_token, refresh_token_secret);
    console.log({ decoded }); // bar
    delete decoded.iat;
    delete decoded.exp;
    res.status(200).json(generateToken(decoded));
  } catch (e) {
    res.status(400).json({ message: e.message || String(e) });
  }
});

module.exports = userRouter;
