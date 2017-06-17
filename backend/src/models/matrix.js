import mongoose from 'mongoose';
import MatrixCharacteristic from './matrix_characteristic';

export default mongoose.model('Matrix', mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true},
    name: String,
    characteristics: [{type: mongoose.Schema.Types.ObjectId, ref: 'MatrixCharacteristic'}]
}));