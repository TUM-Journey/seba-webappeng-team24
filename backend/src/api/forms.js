import resource from 'resource-router-middleware';
import Form from '../models/form';
import Matrix from '../models/matrix';
import MatrixCharacteristic from '../models/matrix_characteristic';

export default ({config, db}) => resource({

    // GET / - List all entities
    async index({}, res) {
        const forms = await Form.find().populate("matrix").populate("matrix.characteristics");
        res.json(forms);
    },

    // GET /:id - Return a given entity
    async read({id}, res) {
        const form = await Form.findOne({_id: id}).populate("matrix").populate("matrix.characteristics");
        res.json(form);
    },

    // POST / - Create a new entity
    async create({body}, res) {
        let {name, description, matrix} = body;

        const persistedForm = await new Form({
            type: name,
            description: description
        }).save();

        const persistedMatrix = new Matrix({
            _creator: persistedForm._id,
            name: matrix.name
        }).save();

        let {characteristics} = matrix;
        for (let chr in characteristics) {
            if (characteristics.hasOwnProperty(chr)) {
                let {name, description} = chr;
                await new MatrixCharacteristic({
                    _creator: persistedMatrix._id,
                    name: name,
                    description: description
                })
            }
        }

        res.sendStatus(200);
    },

    // DELETE /:id - Delete a given entity
    async delete({id}, res) {
        const form = await Form.findOne({_id: id}).populate("matrix");

        for (let chr in form.matrix.characteristics) {
            if (form.matrix.characteristics.hasOwnProperty(chr)) {
                await MatrixCharacteristic.destroy({_id: chr._id});
            }
        }

        await Matrix.destroy({_id: form.matrix._id});

        await Form.destroy({_id: id});

        res.sendStatus(204);
    }
});
