import resource from 'resource-router-middleware';
import User from '../models/user';
import bcrypt from 'bcryptjs';

const BCRYPT_SALT_ROUNDS = 10;

export default ({config, db}) => resource({

  id: 'user',

  // Preloads resource for requests with :username placeholder
  async load(req, username, callback) {
    const user = await User.findOne({username: username});
    const errorCode = user ? null : '404';

    callback(errorCode, user);
  },

  // GET / - List all entities
  async list({}, res) {
    const users = await User.find();
    res.json(users);
  },

  // GET /:username - Return a given entity
  async read({user}, res) {
    res.json(user);
  },

  // PUT /:id - Update a given entity
  async update({user, body}, res) {

    for (let key in body) {
      if (key !== '_id' && body.hasOwnProperty(key)) {
        if (key === 'password') {
          const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
          user['password'] = await bcrypt.hash(body['password'], salt);
        } else {
          user[key] = body[key];
        }
      }
    }

    await User.update(user);

    res.status(200).send(user);
  },


  // DELETE /:username - Delete a given entity
  async delete({user}, res) {
    await User.remove(user);
    res.sendStatus(202);
  }
});
