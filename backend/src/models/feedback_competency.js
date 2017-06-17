import mongoose from 'mongoose';

export default mongoose.model('FeedbackCompetency', mongoose.Schema({
    _id: Number,
    _creator: {type: Number, ref: 'Feedback'},
    characteristic: {type: mongoose.Schema.Types.ObjectId, ref: 'MatrixCharacteristic'},
    grade: Number
}));