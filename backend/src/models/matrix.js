import mongoose from 'mongoose';
import MatrixCharacteristic from './matrix_characteristic';

export default mongoose.model('Matrix', mongoose.Schema({
    _id: Number,
    name: String,
    characteristics: [{type: mongoose.Schema.Types.ObjectId, ref: 'MatrixCharacteristic'}]
}));