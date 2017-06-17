import mongoose from 'mongoose';

export default mongoose.model('MatrixCharacteristic', mongoose.Schema({
    _id: Number,
    _creator: {type: Number, ref: 'Matrix'},
    name: String,
    description: String
}));