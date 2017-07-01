import mongoose from 'mongoose';

export default mongoose.model('Report', mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  userGroup: {type: mongoose.Schema.Types.ObjectId, ref: 'UserGroup'},
  document: {type: String, required: true},
  created_at: {type: Date, default: Date.now}
}));
