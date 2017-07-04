import {Router} from 'express';

import users from '../resources/users';
import matrices from '../resources/matrices';
import forms from '../resources/forms';
import feedbacks from '../resources/feedbacks';
import feedbackRequests from '../resources/feedback_requests';
import plans from '../resources/plans';
import reports from '../resources/reports';
import usergroups from '../resources/user_group';
import customers from '../resources/customers';

import passport from 'passport';

export default (app, config, db) => {
  const route = Router();

  // Setup auth middleware
  let authMiddleware;
  if (config.get('auth:enabled') === 'true') {
    authMiddleware = passport.authenticate('jwt', {session: false});
  } else {
    console.warn('Passport authentication disabled!');
    authMiddleware = (req, res, next) => {
      next();
    };
  }

  // Mount Resources API
  route.use('/users', authMiddleware, users({config, db}));
  route.use('/matrices', authMiddleware, matrices({config, db}));
  route.use('/forms', authMiddleware, forms({config, db}));
  route.use('/feedbacks/requests', authMiddleware, feedbackRequests({config, db}));
  route.use('/feedbacks', authMiddleware, feedbacks({config, db}));
  route.use('/plans', authMiddleware, plans({config, db}));
  route.use('/reports', authMiddleware, reports({config, db}));
  route.use('/usergroups', authMiddleware, usergroups({config, db}));
  route.use('/customers', authMiddleware, customers({config, db}));

  app.use('/api/', route);
}
