import mongoose from 'mongoose';
import bluebird from 'bluebird';
import config from './config.json';

import {runningInDocker} from './config';

export default callback => {
  mongoose.Promise = bluebird;

  if (runningInDocker) {
    mongoose.connect(config.dockermongoose);
  } else {
    mongoose.connect(config.localmongoose);
  }

  callback(mongoose.connection);
}
