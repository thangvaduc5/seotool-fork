const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  website: {
    type: String,
  },
  comment: {
    type: String,
  },
})

const Profile = mongoose.model('profiles', profileSchema)

module.exports = Profile
