const express = require("express");
const userRouter = express.Router();
const userService = require('../services/user.service');

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log("Time: ", Date.now());
//   next();
// });
// define the home page route
userRouter.get("/", async (req, res) => {
  console.log('goi get user');
  const user = await userService.findOne({});
  res.send(user);
});
// define the about route
userRouter.post("/", async (req, res) => {
  const user = {username: 'Tran Van Bon', password: 'abc123', role: 1};
  const result = await userService.createOne(user);
  console.log({ result });
  res.send("post successfully");
});

module.exports = userRouter;
