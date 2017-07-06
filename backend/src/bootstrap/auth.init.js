import { Router } from 'express';
import passport from 'passport';
import passportJwt from 'passport-jwt';

import login from '../auth/login';
import register from '../auth/register';
import customer_register from '../auth/customer-register'
import passportHttp from 'passport-http'

export default (app, config, db) => {

  // Setup Passport and Passport JWT Strategy
  const jwtStrategy = new passportJwt.Strategy({
    secretOrKey: config.get('auth:secret'),
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader()
  }, (payload, done) => done(null, payload));
  // NEEDS FIX
  // You're not checking for what's inside the payload. that means if I give it any valid JWT
  // it will pass for any user, also I need to fix the api endpoints on postman because the port is wrong
  // will add exposed endpoints as well


  // basic strat is used to add a new customer to the database, this was part of the protected api,
  // we need to control when to add customers with a different set of admin username and password
  // this works for now, check config file for the right set of identification
  const basicStrategy = new passportHttp.BasicStrategy(
    (admin_id, password, done) => {
      if ((admin_id === config.get('admin_id')) && (password === config.get('admin_password'))) {
        return done(null, true)
      }
      return done(null, false)
    }
  )
  const basicMiddleware = passport.authenticate('basic', { session: false })

  passport.use('jwt', jwtStrategy);
  passport.use('basic', basicStrategy)
  app.use(passport.initialize());

  // Mount Login/Register
  const route = Router();

  route.get('/login', login);
  route.post('/register', register);
  route.post('/customer-register', basicMiddleware, customer_register)

  app.use('/api', route);
}
