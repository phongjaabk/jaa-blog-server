const mongoose = require('mongoose');
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
    try {
      const user = await UserModel.findOne(query);
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  async createOne(user) {
    try {
      const newUser = new UserModel(user);
      const resultSaveUser = await newUser.save();
      return resultSaveUser;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new UserService().getInstance();
