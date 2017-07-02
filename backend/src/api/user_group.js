import resource from 'resource-router-middleware';
import UserGroup from '../models/user_groups';
import User from '../models/user';
import {failure} from '../lib/util';

export default ({config, db}) => resource({

  id: 'userGroup',

  // Preloads resource for requests with :id placeholder
  async load(req, userGroupname, callback) {
    const userGroup = await UserGroup.findOne({userGroupname: userGroupname});
    const err = userGroup ? null : '404';

    callback(err, userGroup);
  },

  // GET / - List all entities
  async index({}, res) {
    const userGroups = await UserGroup.find();
    res.json(userGroups);
  },

  // GET /:userGroupname - Return a given entity
  async read({userGroup}, res) {
    res.json(userGroup);
  },

  // POST / - Create a new entity
  async create({body}, res) {
    let {userGroupname, description, usernames} = body;

    const newGroupData = {
      userGroupname: userGroupname,
      description: description
    };

    if (Array.isArray(usernames) && usernames.length > 0) {
      newGroupData['users'] = [];
      for (let i = 0; i < usernames.length; i++) {
        const persistedUser = await User.findOne({username: usernames[i]});
        if (persistedUser)
          newGroupData['users'].push(persistedUser._id);
      }
    }

    try {
      await new UserGroup(newGroupData).save();
    } catch (error) {
      failure(res, 'Failed to persist new user group', 500, error.errors ? error.errors : error.toString());
    }

    res.sendStatus(200);
  },

  // PUT /:userGroupname - Update a given entity
  async update({userGroup, body}, res) {
    let {description} = body;

    userGroup.description = description;
    await UserGroup.update(userGroup);

    res.sendStatus(200);
  },

  // DELETE /:userGroupname - Delete a given entity
  async delete({userGroup}, res) {
    await UserGroup.remove(userGroup);
    res.sendStatus(204);
  }
})

// GET /:userGroupname/members - List of user group members
  .get('/:userGroupname/members', async (req, res) => {
    const userGroupname = req.params.userGroupname;

    const persistedUserGroup = await UserGroup.findOne({userGroupname: userGroupname}).populate('users');
    if (!persistedUserGroup) {
      failure(res, 'No user group found with given name', 404);
      return;
    }

    res.send(persistedUserGroup.users);
  })

  // PUT /:userGroupname/members/:username - Adds user to the user group
  .put('/:userGroupname/members/:username', async (req, res) => {
    let {userGroupname, username} = req.params;

    if (!userGroupname || !username) {
      failure(res, 'No user group or user found with given names', 404);
      return;
    }

    const persistedUserGroup = await UserGroup.findOne({userGroupname: userGroupname});
    if (!persistedUserGroup) {
      failure(res, 'No user group found with given name', 404);
      return;
    }

    const persistedUser = await User.findOne({username: username});
    if (!persistedUser) {
      failure(res, 'No user found with given username', 404);
      return;
    }

    if (persistedUserGroup.users.indexOf(persistedUser._id) >= 0) {
      res.sendStatus(304); // Not Modified
      return;
    }

    persistedUserGroup.users.push(persistedUser._id);
    await UserGroup.update(persistedUserGroup);

    res.sendStatus(200);
  })

  // DELETE /:userGroupname/members/:username - Removes user from the user group
  .delete('/:userGroupname/members/:username', async (req, res) => {
    let {userGroupname, username} = req.params;

    if (!userGroupname || !username) {
      failure(res, 'No user group or user found with given names', 404);
      return;
    }

    const persistedUserGroup = await UserGroup.findOne({userGroupname: userGroupname});
    if (!persistedUserGroup) {
      failure(res, 'No user group found with given userGroupname', 404);
      return;
    }

    const persistedUser = await User.findOne({username: username});
    if (!persistedUser) {
      failure(res, 'No user found with given username', 404);
      return;
    }

    const userIndex = persistedUserGroup.users.indexOf(persistedUser._id);
    if (userIndex === -1) {
      res.sendStatus(304); // Not Modified
      return;
    }

    persistedUserGroup.users.splice(userIndex, 1);
    await UserGroup.update(persistedUserGroup);

    res.sendStatus(200);
  });
