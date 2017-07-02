import mongoose from 'mongoose'

//@Deprecated
export default mongoose.model("CompanyDomain", mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true},
  domain: {type: String, index: true, unique: true, required: true},
  created_at: {type: Date, default: Date.now},
}))
