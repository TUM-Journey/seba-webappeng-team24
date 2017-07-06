import cors from 'cors';
import bodyParser from 'body-parser';

export default (app, config, db) => {
  app.use(cors({
    exposedHeaders: config.get('middleware_corsHeaders')
  }));

  app.use(bodyParser.json({
    limit: config.get('middleware_bodyLimit')
  }));

  app.use(bodyParser.urlencoded({
    extended: true
  }));
}
