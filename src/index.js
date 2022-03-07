const express = require("express");
const app = express()
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const userRouter = require("./controllers/user.controller");

dotenv.config();

const port = process.env.PORT || 3000;

(async () => {
  await connectDB();

  // app.get("/tao_muon_lay", (req, res) => {
  //   res.send("May thich lay gi!");
  // });
  app.use(cors());
  app.use("/user", userRouter);

  app.listen(port, () => {
    console.log(`Jaa Server listening on port ${port}`);
  });
})();
