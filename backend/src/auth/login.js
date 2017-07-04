import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
import {failure} from '../lib/util';

export default async (req, res) => {
  const username = req.body.username || req.query.username;
  const password = req.body.password || req.query.password;

  if (!username || !password)
    return failure(res, 'No username and/or password parameter (query or body are supported)', 400);

  const persistedUser = await User.findOne({username: username});
  if (!persistedUser)
    return failure(res, 'No user found with given username', 404);

  const persistedUserPasswordHash = persistedUser.password;
  if (!await bcrypt.compare(password, persistedUserPasswordHash))
    return failure(res, 'Invalid password', 400);

  const token = jwt.sign({
    id: persistedUser._id,
    customer: persistedUser.customer,
    username: username,
    type: persistedUser.type,
    email: persistedUser.email,
    position: persistedUser.position
  }, config.get('auth:secret'), {expiresIn: config.get('auth:expiresIn')});

  res.status(200).send(token);
}
