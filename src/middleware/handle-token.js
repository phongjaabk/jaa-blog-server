const jwt = require("jsonwebtoken");

const access_token_secret = process.env.ACCESS_TOKEN_SECRET || "acc_secret";
const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET || "ref_secret";
const access_token_expire_time = process.env.REFRESH_TOKEN_EXPIRE_TIME || 900;
const refresh_token_expire_time =
  process.env.REFRESH_TOKEN_EXPIRE_TIME || 604800;

// define the home page route
const generateToken = (payload) => {
  const access_token = jwt.sign(payload, access_token_secret, {
    expiresIn: access_token_expire_time,
  });
  const refresh_token = jwt.sign(payload, refresh_token_secret, {
    expiresIn: refresh_token_expire_time,
  });
  return { access_token, refresh_token };
};

const verifyAccessToken = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    console.log("auth", { auth });
    const tokenSplit = auth.split(" ");
    if (tokenSplit[0] === "Bearer") {
      const decoded = jwt.verify(tokenSplit[1], access_token_secret);
      req.userData = decoded;
      console.log("decoded", { decoded });
      next();
    } else {
      throw new Error("Token is not bearer type");
    }
  } catch (err) {
    res.status(401).json({ message: err || "Token is invalid" });
  }
};

const verifyRefreshToken = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    console.log("auth", { auth });
    const tokenSplit = auth.split(" ");
    if (tokenSplit[0] === "Bearer") {
      const decoded = jwt.verify(tokenSplit[1], refresh_token_secret);
      req.userData = decoded;
      console.log("decoded", { decoded });
      next(req);
    } else {
      throw new Error("Token is not bearer type");
    }
  } catch (err) {
    res.status(401).json({ message: err || "Token is invalid" });
  }
};
module.exports = { generateToken, verifyAccessToken, verifyRefreshToken };
