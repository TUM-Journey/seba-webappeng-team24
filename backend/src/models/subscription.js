import mongoose from 'mongoose';

export default mongoose.model('Subscription', mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, index: true, auto: true},
  plan: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Plan'},
  paymentMethod: String,
  timestamp: {type: Date, default: Date.now}
}));
