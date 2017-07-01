import mongoose from 'mongoose';

export default mongoose.model('FeedbackCompetency', mongoose.Schema({
  _creator: {type: Number, ref: 'Feedback'},
  characteristic: {type: mongoose.Schema.Types.ObjectId, ref: 'MatrixCharacteristic'},
  grade: {type: Number, required: true},
}));
