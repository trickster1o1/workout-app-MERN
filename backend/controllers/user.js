const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    if(user.msg && user.msg === 'error') {
      return res.status(400).json({error: user.message})
    }
    // create JWT
    const token = createToken(user._id);
    return res.status(200).json({email, token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  res.json({ msg: "logged in" });
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup({ email, password });

    if(user.msg && user.msg === 'error') {
      return res.status(400).json({error: user.message});
    }

    // JWT creation
    const token = createToken(user._id);
    return res.status(200).json({ email, token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
  res.json({ msg: "signed up" });
};

module.exports = { loginUser, signupUser };
