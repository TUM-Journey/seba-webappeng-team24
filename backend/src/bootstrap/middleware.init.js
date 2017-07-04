import cors from 'cors';
import bodyParser from 'body-parser';

export default (app, config, db) => {
  app.use(cors({
    exposedHeaders: config.get('middleware:corsHeaders')
  }));

  app.use(bodyParser.json({
    limit: config.get('middleware:bodyLimit')
  }));

  app.use(bodyParser.urlencoded({
    extended: true
  }));
}
