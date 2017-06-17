import {version} from '../../package.json';
import {Router} from 'express';
import users from './users';

export default ({config, db}) => {
    let api = Router();

    // Mount API Resources
    api.use('/users', users({config, db}));

    // API Metadata
    api.get('/', (req, res) => {
        res.json({version});
    });

    return api;
}
