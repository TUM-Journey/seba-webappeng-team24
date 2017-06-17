import mongoose from 'mongoose';
import FeedbackCompetency from './feedback_competency';

export default mongoose.model('Feedback', mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true},
    summary: String,
    competencies: [{type: mongoose.Schema.Types.ObjectId, ref: 'FeedbackCompetency'}],
    created_at: Date
}));