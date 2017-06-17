import mongoose from 'mongoose';

export default mongoose.model('Form', mongoose.Schema({
    _id: Number,
    name: String,
    description: {type: String, required: false},
    matrix: {type: mongoose.Schema.Types.ObjectId, ref: 'Matrix'}
}));