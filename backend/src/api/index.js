import {version} from '../../package.json';
import {Router} from 'express';

import users from './users';
import matrices from './matrices';
import forms from './forms';
import feedbacks from './feedbacks';
import plans from './plans';
import reports from './reports';
import usergroups from './user_group';
import customers from './customers';

export default ({config, db}) => {
  let api = Router();

  // Mount API Resources
  api.use('/users', users({config, db}));
  api.use('/matrices', matrices({config, db}));
  api.use('/forms', forms({config, db}));
  api.use('/feedbacks', feedbacks({config, db}));
  api.use('/plans', plans({config, db}));
  api.use('/reports', reports({config, db}));
  api.use('/usergroups', usergroups({config, db}));
  api.use('/customers', customers({config, db}));

  // API Metadata
  api.get('/version', (req, res) => {
    res.json({version});
  });

  return api;
}
