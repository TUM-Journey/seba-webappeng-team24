import mongoose from 'mongoose';
import bluebird from 'bluebird';
import config from './config.json';

// Loading models
import User from './models/user'
import Form from './models/form'
import Matrix from './models/matrix'
import Feedback from './models/feedback'

export default callback => {
    mongoose.Promise = bluebird;
    mongoose.connect(config.mongoose);

	callback(mongoose.connection);
}
