const mongoose = require( 'mongoose')

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isSiteAdmin: {
    type: Boolean,
    required: false,
    select: false,
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = {
  User,
  UserSchema,
}
