import nconf from 'nconf';

nconf.argv().env();

// keep structure flat for environment variables.
nconf.defaults({
  'db_url': 'mongodb://localhost/test',
  'auth_enabled': 'true',
  'auth_secret': 'rod[jf[013hjfmnds[pfjsdao0hj31npdsa',
  'auth_expiresIn': '2 days',
  'server_port': '8080',
  'middleware_bodyLimit': '100kb',
  'middleware_corsHeaders': ['Link'],
  'production': 'false'
});

export default nconf;
