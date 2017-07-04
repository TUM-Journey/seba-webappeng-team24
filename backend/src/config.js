import nconf from 'nconf';

nconf.argv().env();

nconf.defaults({
  'db': {
    'url': 'mongodb://localhost/test'
  },
  'auth': {
    'enabled': 'true',
    'secret': 'rod[jf[013hjfmnds[pfjsdao0hj31npdsa',
    'expiresIn': '3600'
  },
  'server': {
    'host': 'localhost',
    'port': '8080'
  },
  'middleware': {
    'bodyLimit': '100kb',
    'corsHeaders': ['Link']
  }
});

export default nconf;
