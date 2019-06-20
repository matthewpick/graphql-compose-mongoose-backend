const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const ClubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: String,
  state: String,

  memberIds: {
    type: [ObjectId],
    ref: 'Member',
    unique: true,
    default: [],
  },
  adminIds: {
    type: [ObjectId],
    ref: 'Admin',
    unique: true,
    default: [],
  },
})

const Club = mongoose.model('Club', ClubSchema)

module.exports = {
  Club,
  ClubSchema,
}
