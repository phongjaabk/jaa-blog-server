const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: Number,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
