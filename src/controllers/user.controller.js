const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const userService = require("../services/user.service");
const { generateToken } = require("../middleware/handle-token");

userRouter.post("/login", async (req, res) => {
  try {
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
    res.status(201).json({ message: "register successfully" });
  } catch (e) {
    res.status(400).json({ message: e.message || String(e) });
  }
});

userRouter.post("/refresh-token", async (req, res) => {
  try {
    const { refresh_token } = req.body;
    const decoded = jwt.verify(refresh_token, refresh_token_secret);
    delete decoded.iat;
    delete decoded.exp;
    res.status(200).json(generateToken(decoded));
  } catch (e) {
    res.status(400).json({ message: e.message || String(e) });
  }
});

module.exports = userRouter;
