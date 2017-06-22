import mongoose from 'mongoose';
import bluebird from 'bluebird';
import config from './config.json';

// Loading models
import User from './models/user'
import Form from './models/form'
import Matrix from './models/matrix'
import Feedback from './models/feedback'
import { runningInDocker } from './config'

export default callback => {
    mongoose.Promise = bluebird;

    if (runningInDocker) {
        mongoose.connect(config.dockermongoose)
    } else {
        mongoose.connect(config.localmongoose);
    }

    callback(mongoose.connection);
}
