const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const { success, error } = require("../utils/responses");

const createToken = _id => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);
    success(res, { data: { name: user.name, email, token } });
  } catch (err) {
    error(res, { message: err.message, code: 400 });
  }
}

// signup user
async function signup(req, res) {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);

    // create a token
    const token = createToken(user._id);
    success(res, { data: { name, email, token }, code: 201 });
  } catch (err) {
    error(res, { message: err.message, code: 400 });
  }
}

module.exports = {
  login,
  signup
};
