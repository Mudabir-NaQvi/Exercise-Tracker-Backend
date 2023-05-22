const User = require("../Models/userSchema");
const getUsers = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

const getUser = async (req, res) => {
  const {id} = req.params;

  res.json(await User.findById(id))
}

module.exports = { getUsers,getUser };
