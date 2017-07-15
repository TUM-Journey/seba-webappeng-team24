import {Router} from 'express';
import passport from 'passport';

import users from '../resources/users';
import matrices from '../resources/matrices';
import forms from '../resources/forms';
import feedbacks from '../resources/feedbacks';
import feedbackRequests from '../resources/feedback_requests';
import plans from '../resources/plans';
import reports from '../resources/reports';
import usergroups from '../resources/user_group';
import customers from '../resources/customers';

export default (app, config, db) => {
  const route = Router();

  // Mount Resources API
  route.use('/users',
    passport.authenticate('auth:jwt', {session: false}),
    users({config, db}));

  route.use('/matrices',
    passport.authenticate('auth:jwt', {session: false}),
    matrices({config, db}));

  route.use('/forms',
    passport.authenticate('auth:jwt', {session: false}),
    //passport.authenticate('restrict:manager', {session: false}), // unrestrict GET
    forms({config, db}));

  route.use('/feedbacks/requests',
    passport.authenticate('auth:jwt', {session: false}),
    feedbackRequests({config, db}));

  route.use('/feedbacks',
    passport.authenticate('auth:jwt', {session: false}),
    feedbacks({config, db}));

  route.use('/plans',
    passport.authenticate('auth:jwt', {session: false}),
    passport.authenticate('restrict:manager', {session: false}),
    plans({config, db}));

  route.use('/reports',
    passport.authenticate('auth:jwt', {session: false}),
    passport.authenticate('restrict:manager', {session: false}),
    reports({config, db}));

  route.use('/usergroups',
    passport.authenticate('auth:jwt', {session: false}),
    passport.authenticate('restrict:manager', {session: false}),
    usergroups({config, db}));

  route.use('/customers',
    passport.authenticate('auth:jwt', {session: false}),
    customers({config, db}));

  app.use('/api/', route);

}
