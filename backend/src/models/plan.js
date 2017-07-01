import mongoose from 'mongoose';

export default mongoose.model('Plan', mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, index: true, auto: true},
  name: {type: String, required: true},
  price: {type: Number, required: true},
  feedbackLimit: {type: Number, required: true},
  userLimit: {type: Number, required: true},
  advancedSupport: {type: Boolean, required: true}
}));
