import mongoose from 'mongoose';
import UserType from './user_type';
import uniqueValidator from 'mongoose-unique-validator';

export default mongoose.model('User', mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true},
  customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
  type: {type: String, enum: Object.keys(UserType).map(key => UserType[key])},
  name: {type: String, required: true},
  username: {type: String, index: true, unique: true, required: true},
  email: {type: String, index: true, required: true, unique: true},
  password: {type: String, required: true},
  position: String,
  created_at: {type: Date, default: Date.now}
}).plugin(uniqueValidator));
