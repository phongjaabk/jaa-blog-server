const mongoose = require("mongoose");
const { POST_STATUS } = require("../config");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, ref: "User", required: true },
    body: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: Number, default: POST_STATUS.PUBLIC },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const PostModel = mongoose.model("Post", postSchema);
module.exports = PostModel;
