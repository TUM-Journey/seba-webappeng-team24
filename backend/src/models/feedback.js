import mongoose from 'mongoose';
import FeedbackCompetency from './feedback_competency';

export default mongoose.model('Feedback', mongoose.Schema({
    _id: Number,
    summary: String,
    competencies: [{type: mongoose.Schema.Types.ObjectId, ref: 'FeedbackCompetency'}],
    created_at: Date
}));