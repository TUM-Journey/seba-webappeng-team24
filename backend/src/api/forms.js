import resource from 'resource-router-middleware';
import Form from '../models/form';
import Matrix from '../models/matrix';
import UserGroup from '../models/user_groups';
import MatrixCharacteristic from '../models/matrix_characteristic';
import {failure} from '../lib/util';

export default ({config, db}) => resource({

  id: 'form',

  // Preloads resource for requests with :username placeholder
  async load(req, id, callback) {
    const form = await Form.findById(id)
      .populate('matrix')
      .populate({
        path: 'matrix',
        populate: {
          path: 'characteristics',
          model: 'MatrixCharacteristic'
        }
      });

    const errorCode = form ? null : '404';

    callback(errorCode, form);
  },

  // GET / - List all entities (+ optional filter by ?userGroupname)
  async list(req, res) {

    let searchParams = {};
    if (req.query.userGroupname) {
      const persistedUserGroup = await UserGroup.findOne({userGroupname: req.query.userGroupname});

      if (persistedUserGroup) {
        searchParams = {userGroup: persistedUserGroup._id};
      }
    }

    const forms = await Form.find(searchParams);
    res.json(forms);
  },

  // GET /:id - Return a given entity
  async read({form}, res) {
    res.json(form);
  },

  // POST / - Create a new entity
  async create({body}, res) {
    let {name, userGroupname, description, matrixId} = body;

    const persistedUserGroup = await UserGroup.findOne({userGroupname: userGroupname});
    if (!persistedUserGroup) {
      failure(res, 'UserGroup not found with given userGroupname', 404);
      return;
    }

    const persistedMatrix = await Matrix.findById(matrixId);
    if (!persistedMatrix) {
      failure(res, 'Matrix not found with given id', 404);
      return;
    }

    const persistedForm = await new Form({
      name: name,
      userGroup: persistedUserGroup._id,
      description: description,
      matrix: persistedMatrix._id
    }).save();

    res.status(200).send(persistedForm);
  },

  // DELETE /:id - Delete a given entity
  async delete({form}, res) {
    await Form.remove(form);
    res.sendStatus(202);
  }
});
