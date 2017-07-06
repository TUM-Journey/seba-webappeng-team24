import {Router} from 'express';
import passport from 'passport';
import UserType from '../models/user_type';
import {ExtractJwt as JwtExtractors, Strategy as JwtStrategy} from 'passport-jwt';

import Strategy from 'passport-strategy';

import login from '../auth/login';
import register from '../auth/register';

export default (app, config, db) => {

  // Setup Passport and Passport JWT token validation strategy
  if (config.get('auth_enabled') === 'true') {
    passport.use('auth:jwt', new JwtStrategy({
      secretOrKey: config.get('auth:secret'),
      jwtFromRequest: JwtExtractors.fromAuthHeader()
    }, (payload, done) => done(null, payload)));
  } else {
    console.warn('WARN! Passport JWT authentication disabled!');
    passport.use('auth:jwt', new class extends Strategy { // Stub JWT strategy for test / rets MANAGER user
      authenticate(req, options) {
        this.success({type: UserType.MANAGER});
      }
    });
  }

  // Authorization strategies
  passport.use('restrict:manager', new class extends Strategy { // Restricts access everybody but manager
    authenticate(req, options) {
      if (!req.user) {
        this.fail('User object not found. This is a supportive strategy that requires prev strategy in chain ' +
          'to prepare user object with .type (UserType) field', 500);
      } else if (req.user.type !== UserType.MANAGER) {
        this.fail('Only manager users are allowed', 403); // HTTP 403 Forbidden
      } else {
        this.success(req.user);
      }
    }
  });

  passport.use('restrict:employee', new class extends Strategy { // Restricts access everybody but employee
    authenticate(req, options) {
      if (!req.user) {
        this.fail('User object not found. This is a supportive strategy that requires prev strategy in chain ' +
          'to prepare user object with .type (UserType) field', 500);
      } else if (req.user.type !== UserType.EMPLOYEE) {
        this.fail('Only employees users are allowed', 403); // HTTP 403 Forbidden
      } else {
        this.success(req.user);
      }
    }
  });

  app.use(passport.initialize());

  // Mount Login/Register
  const route = Router();

  route.get('/login', login);
  route.post('/register', register);

  app.use('/api', route);
}
