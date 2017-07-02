import resource from 'resource-router-middleware';
import Form from '../models/form';
import Matrix from '../models/matrix';
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

  // GET / - List all entities
  async list({}, res) {
    const forms = await Form.find();
    res.json(forms);
  },

  // GET /:id - Return a given entity
  async read({form}, res) {
    res.json(form);
  },

  // POST / - Create a new entity
  async create({body}, res) {
    let {name, description, matrixId} = body;

    const persistedMatrix = await Matrix.findById(matrixId);
    if (!persistedMatrix) {
      failure(res, "Matrix not found with given id", 404);
      return;
    }
    console.log(persistedMatrix);

    await new Form({
      name: name,
      description: description,
      matrix: persistedMatrix._id
    }).save();

    res.sendStatus(200);
  },

  // DELETE /:id - Delete a given entity
  async delete({form}, res) {
    await Form.remove(form);
    res.sendStatus(204);
  }
});
