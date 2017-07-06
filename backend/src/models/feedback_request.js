import mongoose from 'mongoose';

export default mongoose.model('FeedbackRequest', mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // requestee
  userGroup: {type: mongoose.Schema.Types.ObjectId, ref: 'UserGroup'}, // requestee
  created_at: {type: Date, default: Date.now}
}));
