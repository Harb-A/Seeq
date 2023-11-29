const { Mongoose } = require("mongoose");

const user = require("../Models/UserModel");

// app.use(express.json());


async function getUsers() {
  try {
    const users = await user.find({});
    console.log(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
  }
}

module.exports = getUsers;