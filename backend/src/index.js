import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import api from './api';

import config from './config.json'
import * as auth from './api/auth'
import passport from 'passport'

import { isProduction } from './config'


let app = express();
app.server = http.createServer(app);
passport.use(auth.JWTStrategy)
app.use(passport.initialize())

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit: config.bodyLimit
}));


app.use(bodyParser.urlencoded({
	extended: true,
}))

app.post("/login", auth.login)
app.post("/register", auth.register)
app.post("/company", auth.companyRegister)

if (isProduction) {
	app.use(express.static('/dist'))
}


// connect to db
initializeDb(db => {
	// api router
	app.use('/api', passport.authenticate('jwt', { session: false }),
		api({ config, db }));
	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

export default app;