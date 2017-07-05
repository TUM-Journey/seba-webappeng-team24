import nconf from 'nconf';

nconf.argv().env();

// keep structure flat for environment variables.
nconf.defaults({
  'db_url': 'mongodb://localhost/test',
  'auth': {
    'enabled': 'true',
    'secret': 'rod[jf[013hjfmnds[pfjsdao0hj31npdsa',
    'expiresIn': '2 days'
  },
  'server_port': '8080',
  'middleware': {
    'bodyLimit': '100kb',
    'corsHeaders': ['Link']
  },
  'production': 'false'
});

export default nconf;
