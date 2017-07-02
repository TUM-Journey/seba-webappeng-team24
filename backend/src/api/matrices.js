import resource from 'resource-router-middleware';
import Form from '../models/form';
import Matrix from '../models/matrix';
import MatrixCharacteristic from '../models/matrix_characteristic';
import {failure} from '../lib/util';

export default ({config, db}) => resource({

  id: 'matrix',

  // Preloads resource for requests with :username placeholder
  async load(req, id, callback) {
    const matrix = await Matrix.findById(id).populate('characteristics');
    const errorCode = matrix ? null : '404';

    callback(errorCode, matrix);
  },

  // GET / - List all entities
  async list({}, res) {
    const matrices = await Matrix.find().populate('characteristics');
    res.json(matrices);
  },

  // GET /:id - Return a given entity
  async read({matrix}, res) {
    res.json(matrix);
  },

  // POST / - Create a new entity
  async create({body}, res) {
    let {name, characteristics} = body;

    if (characteristics.length === 0) {
      failure(res, 'At least one characteristic is required');
      return;
    }

    const persistedMatrix = await new Matrix({
      name: name,
      characteristics: []
    }).save();

    for (let i = 0; i < characteristics.length; i++) {
      let {name, description} = characteristics[i];

      const persistedCharacteristic = await new MatrixCharacteristic({
        _creator: persistedMatrix._id,
        name: name,
        description: description
      }).save();

      persistedMatrix.characteristics.push(persistedCharacteristic._id);
    }

    await Matrix.update(persistedMatrix);

    res.sendStatus(200);
  },

  // DELETE /:id - Delete a given entity
  async delete({matrix}, res) {

    for (let chr in matrix.characteristics) {
      if (matrix.characteristics.hasOwnProperty(chr)) {
        await MatrixCharacteristic.remove(chr);
      }
    }

    await Matrix.remove(matrix);

    res.sendStatus(204);
  }
});
