import mongoose from 'mongoose';

export default mongoose.model('Form', mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true},
    name: String,
    description: {type: String, required: false},
    matrix: {type: mongoose.Schema.Types.ObjectId, ref: 'Matrix'}
}));