const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { promisify } = require('util')

const signToken = (id, username, email, role) => {
  return jwt.sign({ id, username, email, role }, process.env.JWT_SECRET)
}

const createSendToken = (user, status, res) => {
  const { _id, username, email, role } = user
  const token = signToken(_id, username, email, role)

  // Clear fill password before response to client
  user.password = undefined

  res.status(status).json({
    status: 'success',
    token,
    data: {
      user,
    },
  })
}

// ---------------- SIGN UP ------------------
exports.signup = async (req, res, next) => {
  try {
    const { username, email, password, passwordConfirm, role } = req.body
    const newUser = await User.create({
      username,
      email,
      password,
      passwordConfirm,
      role,
    })
    createSendToken(newUser, 201, res)
  } catch (error) {
    if (error.status === 11000) {
      console.log('error', error)
    }
    res.status(400).json({
      message: error,
    })
  }
}

// ---------------- LOGIN ------------------
exports.login = async (req, res, next) => {
  // Check email, check password
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).json({
      message: 'Please provide email or password',
    })
  }

  const user = await User.findOne({ email }).select('+password')
  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(401).json({
      message: 'Incorrect email or password',
    })
  }
  console.log(user)

  //   If everything ok then send cookie to client
  createSendToken(user, 200, res)
}