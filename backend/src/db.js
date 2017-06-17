import mongoose from 'mongoose';

// Loading models
import User from './models/user'
import Form from './models/form'
import Matrix from './models/matrix'
import Feedback from './models/feedback'

export default callback => {
    mongoose.connect('mongodb://localhost/test');

	callback(mongoose.connection);
}
