const mongoose = require("mongoose");
const PostModel = require("../models/post.model");

class PostService {
  instance;
  getInstance() {
    if (!this.instance) {
      this.instance = new PostService();
    }
    return this.instance;
  }

  async findOne(query = {}, join = {}) {
    const Post = await PostModel.findOne(query).populate(join);
    return Post;
  }

  async createOne(Post) {
    const newPost = new PostModel(Post);
    const resultSavePost = await newPost.save();
    return resultSavePost;
  }

  async findMany(query = {}, join = {}) {
    const recs = await PostModel.find(query).populate(join);
    return recs;
  }

  async updateOne(query= {}, body = {}) {
    const recs = await PostModel.updateOne(query, {$set: body});
    return recs;
  }

  async deleteOne(query= {}) {
    const recs = await PostModel.deleteOne(query);
    return recs;
  }
}

module.exports = new PostService().getInstance();
