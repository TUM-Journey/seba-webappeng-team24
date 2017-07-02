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
    let {name, description, matrix} = body;

    const persistedForm = await new Form({
      name: name,
      description: description
    }).save();

    const persistedMatrix = await new Matrix({
      _creator: persistedForm._id,
      name: matrix.name,
      characteristics: []
    }).save();

    persistedForm.matrix = persistedMatrix._id;
    await Form.update(persistedForm);

    let {characteristics} = matrix;
    if (characteristics.length === 0) {
      failure(res, 'At least one characteristic is required');
      return;
    }

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
  async delete({form}, res) {

    for (let chr in form.matrix.characteristics) {
      if (form.matrix.characteristics.hasOwnProperty(chr)) {
        await MatrixCharacteristic.remove({_id: chr._id});
      }
    }

    await Matrix.remove({_id: form.matrix._id});

    await Form.remove(form);

    res.sendStatus(204);
  }
});
