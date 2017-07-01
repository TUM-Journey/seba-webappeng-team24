import mongoose from 'mongoose';

export default mongoose.model('Feedback', mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true},
  summary: {type: String, required: true},
  competencies: [{type: mongoose.Schema.Types.ObjectId, ref: 'FeedbackCompetency'}],
  created_at: {type: Date, default: Date.now}
}));
