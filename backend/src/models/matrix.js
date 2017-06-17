import mongoose from 'mongoose';

export default mongoose.model('Matrix', mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true},
    name: {type: String, required: true},
    characteristics: [{type: mongoose.Schema.Types.ObjectId, ref: 'MatrixCharacteristic'}]
}));