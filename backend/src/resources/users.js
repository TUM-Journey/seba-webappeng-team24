import resource from 'resource-router-middleware';
import User from '../models/user';
import UserGroup from '../models/user_groups';
import bcrypt from 'bcryptjs';
import {failure} from '../lib/util';

const BCRYPT_SALT_ROUNDS = 10;

export default ({config, db}) => resource({

  id: 'user',

  // Preloads resource for requests with :username placeholder
  async load(req, username, callback) {
    const user = await User.findOne({username: username});
    const errorCode = user ? null : '404';

    callback(errorCode, user);
  },

  // GET / - List all entities (?notme=true&search=%name%)
  async list(req, res) {

    const searchParam = req.query.search ? {name: new RegExp('^(.*)' + req.query.search + '(.*)$', 'i')} : {};

    let users;
    if (req.query.notme) {
      if (!req.user)
        return failure(res, "Not authorized", 401);
      else if (!req.user.id)
        return failure(res, "Failed to retrieve user id (no auth mode?)");

      const meUserId = req.user.id;

      users = await User.find(searchParam).where('_id').ne(meUserId);
    } else {
      users = await User.find(searchParam);
    }

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
})
  // GET /:username/usergroups - List of customer's groups
  .get('/:username/usergroups', async (req, res) => {
    const username = req.params.username;

    const persistedUser = await User.findOne({username: username});
    if (!persistedUser)
      return failure(res, "User not found!", 404);

    const persistedUserGroups = await UserGroup.find({users: persistedUser._id});
    res.json(persistedUserGroups);
  })

  // GET /:username/closest
  .get('/:username/closest', async (req, res) => {
    const username = req.params.username;

    const persistedUser = await User.findOne({username: username});
    if (!persistedUser)
      return failure(res, 'User not found!', 404);

    const persistedUserGroups = await UserGroup.find({users: persistedUser._id});

    const closestUsers = [];
    for (let i = 0; i < persistedUserGroups.length; i++) {
      const ug = persistedUserGroups[i];

      for (let j = 0; j < ug.users.length; j++) {
        const closestUserId = ug.users[j];
        const closestUser = await User.findOne({_id: closestUserId});

        if (req.user && req.user.id && closestUser._id == req.user.id)
          continue; // ingore this user

        closestUsers.push(closestUser);
      }
    }

    res.json(closestUsers);
  });
