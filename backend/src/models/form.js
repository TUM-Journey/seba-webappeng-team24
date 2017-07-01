import mongoose from 'mongoose';

export default mongoose.model('Form', mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true},
  name: {type: String, required: true},
  description: String,
  matrix: {type: mongoose.Schema.Types.ObjectId, ref: 'Matrix'}
}));
