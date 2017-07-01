import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'

export default mongoose.model('Customer', mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, index: true, auto: true},
  name: {type: String, required: true},
  subscriptions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subscription'}],
  domain: {type: String, required: true, index: true, unique: true}
}).plugin(uniqueValidator));
