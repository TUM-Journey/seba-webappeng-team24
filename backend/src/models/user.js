import mongoose from 'mongoose';
import UserType from './user_type';

export default mongoose.model('User', mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true},
    type: {type: String, enum: Object.keys(UserType).map(key => UserType[key])},
    name: String,
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    position: String,
    created_at: Date
}));