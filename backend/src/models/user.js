import mongoose from 'mongoose';
import UserType from './user_type';

export default mongoose.model('User', mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true },
    company_id: { type: mongoose.Schema.Types.ObjectId },
    type: { type: String, enum: Object.keys(UserType).map(key => UserType[key]) },
    name: String,
    username: { type: String, index: true, unique: true, required: true },
    email: { type: String, index: true, required: true, unique: true },
    password: { type: String, required: true },
    position: String,
    created_at: { type: Date, default: Date.now }
}));