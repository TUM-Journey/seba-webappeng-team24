import {Router} from 'express';
import passport from 'passport';
import passportJwt from 'passport-jwt';

import login from '../auth/login';
import register from '../auth/register';

export default (app, config, db) => {

  // Setup Passport and Passport JWT Strategy
  const jwtStrategy = new passportJwt.Strategy({
    secretOrKey: config.get('auth:secret'),
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader()
  }, (payload, done) => done(null, payload));

  passport.use('jwt', jwtStrategy);

  app.use(passport.initialize());


  // Mount Login/Register
  const route = Router();

  route.get('/login', login);
  route.post('/register', register);

  app.use('/api', route);
}
