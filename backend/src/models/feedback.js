import mongoose from 'mongoose';

export default mongoose.model('Feedback', mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // feedbackee
  userGroup: {type: mongoose.Schema.Types.ObjectId, ref: 'UserGroup'}, // feedbackee
  form: {type: mongoose.Schema.Types.ObjectId, ref: 'Form'},
  summary: {type: String, required: true},
  competencies: [{type: mongoose.Schema.Types.ObjectId, ref: 'FeedbackCompetency'}],
  created_at: {type: Date, default: Date.now}
}));
