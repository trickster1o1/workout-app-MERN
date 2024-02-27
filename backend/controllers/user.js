const user = require('../models/user');

const loginUser = async (req, res) => {
    res.json({msg: 'logged in'});
}

const signupUser = async (req, res) => {
    res.json({msg: 'signed up'});
}

module.exports = {loginUser, signupUser}