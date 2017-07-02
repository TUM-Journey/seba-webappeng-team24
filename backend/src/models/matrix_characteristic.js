import mongoose from 'mongoose';

export default mongoose.model('MatrixCharacteristic', mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true},
  _creator: {type: mongoose.Schema.Types.ObjectId, ref: 'Matrix'},
  name: {type: String, required: true},
  description: String
}));
