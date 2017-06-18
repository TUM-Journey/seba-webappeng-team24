import resource from 'resource-router-middleware';
import User from '../models/user';
import bcrypt from "bcrypt";


export default ({ config, db }) => resource({

    // GET / - List all entities
    async index({ }, res) {
        const users = await User.find();
        res.json(users);
    },

    // GET /:username - Return a given entity
    async read({ username }, res) {
        const user = await User.findOne({ username: username });
        res.json(user);
    },

    // // POST / - Create a new entity
    // async create({ body }, res) {
    //     let { type, name, username, email, password, position } = body;

    //     const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
    //     const passwordHash = await bcrypt.hash(password, salt);

    //     await new User({
    //         type: type,
    //         name: name,
    //         username: username,
    //         email: email,
    //         password: passwordHash,
    //         position: position
    //     }).save();

    //     res.sendStatus(200);
    // },

    // PUT /:id - Update a given entity
    async update({ username, body }, res) {
        const user = await User.findOne({ username: username });

        if (!user) {
            res.sendStatus(404);
            return;
        }

        for (let key in body) {
            if (key !== 'id' && user.hasOwnProperty(key)) {
                user[key] = body[key];
            }
        }

        await User.update(user);

        res.sendStatus(204).send(user);
    },


    // DELETE /:username - Delete a given entity
    async delete({ username }, res) {
        await User.destroy({ username: username });
        res.sendStatus(204);
    }
});
