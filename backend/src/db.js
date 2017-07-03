import mongoose from 'mongoose';
import bluebird from 'bluebird';

import * as config from './config';

export default callback => {
  mongoose.Promise = bluebird;

  if (config.runningInDocker) {
    mongoose.connect(config.dockermongoose);
  } else {
    mongoose.connect(config.localmongoose);
  }

  callback(mongoose.connection);
}
