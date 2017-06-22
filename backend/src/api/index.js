import { version } from '../../package.json';
import { Router } from 'express';

import users from './users';
import forms from './forms';
import feedbacks from './feedbacks';

export default ({ config, db }) => {
    let api = Router();

    // Mount API Resources
    api.use('/users', users({ config, db }));
    api.use('/forms', forms({ config, db }));
    api.use('/feedbacks', feedbacks({ config, db }));
    // API Metadata
    api.get('/version', (req, res) => {
        res.json({ version });
    });

    return api;
}
