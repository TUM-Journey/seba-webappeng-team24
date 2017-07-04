import mongoose from 'mongoose';
import bluebird from 'bluebird';

mongoose.Promise = bluebird;

export default async (config) => {
  await mongoose.connect(config.get('db:url'), {useMongoClient: true});
  return mongoose.connection;
}
