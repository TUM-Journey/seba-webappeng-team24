import lodash from 'lodash';
import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import User from '../models/user';
import bcrypt from "bcrypt";

import passport from 'passport'
import passportJWT from 'passport-jwt'

const BCRYPT_SALT_ROUNDS = 10;
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let secret = "super-secret-shit-right-there-my-man-seba-24"

let jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeader(),
	secretOrKey: secret,
}

export let strategy = new JwtStrategy(jwtOptions, function (jwtPayload, next) {
	console.log('payload received', jwtPayload);
	User.findOne({ id: jwtPayload.id }, function (err, user) {
		if (err) {
			return next(err, false);
		}
		if (user) {
			return next(null, user);
		} else {
			return next(null, false);
		}
	});
});
export async function register(req, res) {

	let { type, name, username, email, password, position } = req.body;

	const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
	const passwordHash = await bcrypt.hash(password, salt);

	await new User({
		type: type,
		name: name,
		username: username,
		email: email,
		password: passwordHash,
		position: position
	}).save();

	res.sendStatus(200);

}
export async function login(req, res) {
	if (req.body.name && req.body.password) {
		var name = req.body.name;
		var password = req.body.password;
	}
	// usually this would be a database call:
	const user = await User.findOne({ username: name })
	if (!user) {
		res.status(401).json({ message: "no such user found" });
		return
	}
	// const options = {
	// 	expiresIn: "1d"
	// }
	const passed = await bcrypt.compare(req.body.password, user.password)
	if (passed) {
		var payload = { id: user.id };
		var token = jwt.sign(payload, secret);
		res.json({ message: "jwt created", token: token });
	} else {
		res.status(401).json({ message: "passwords did not match" });
	}
}