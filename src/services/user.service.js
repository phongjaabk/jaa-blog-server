const mongoose = require("mongoose");
const UserModel = require("../models/user.model");

class UserService {
  instance;
  getInstance() {
    if (!this.instance) {
      this.instance = new UserService();
    }
    return this.instance;
  }

  async findOne(query = {}) {
    const user = await UserModel.findOne(query);
    return user;
  }

  async createOne(user) {
    const newUser = new UserModel(user);
    const resultSaveUser = await newUser.save();
    return resultSaveUser;
  }
}

module.exports = new UserService().getInstance();
