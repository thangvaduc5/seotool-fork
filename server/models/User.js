const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, 'Please provide your name!'],
  },
  email: {
    type: String,
    require: [true, 'Please provide your email!'],
    unique: true,
  },
  password: {
    type: String,
    require: [true, 'Please provide your password!'],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    require: [true, 'Please confirm your password!'],
    minLength: 8,
    select: false,
    validate: {
      // This only works on CREATE and SAVE!
      validator: function (el) {
        return el === this.password
      },
      message: 'Password are not the same',
    },
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
})

// Encrypt password before saving document to database
userSchema.pre('save', async function (next) {
  // Run this only password is modify
  if (!this.isModified('password')) return next()

  // Hash password with cost 12
  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined
  next()
})

// Check password
userSchema.methods.correctPassword = async (
  candidatePassword,
  userPassword
) => {
  return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('users', userSchema)

module.exports = User
