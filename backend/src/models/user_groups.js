import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'

export default mongoose.model('UserGroup', mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, index: true, auto: true},
  userGroupname: {type: String, unique: true, required: true, background: false},
  description: String,
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}).plugin(uniqueValidator));
