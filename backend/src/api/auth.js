import lodash from 'lodash';
import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import User from '../models/user';
import bcrypt from 'bcryptjs';
import Company from '../models/company-domain'

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

export let JWTStrategy = new JwtStrategy(jwtOptions, function (jwtPayload, next) {
	console.log('payload received', jwtPayload);
	User.findOne({ _id: jwtPayload.id }, function (err, user) {
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

// Same like login
export async function register(req, res) {

	let { type, name, username, email, password, position } = req.body;

	const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
	const passwordHash = await bcrypt.hash(password, salt);
	const companyDomain = email.split('@')[1]
	const company = await Company.findOne({ domain: companyDomain })
	if (!company) {
		return res.json("Company domain is not registered")

	}
	console.log(company)
	await new User({
		company_id: company.company_id,
		type: type,
		name: name,
		username: username,
		email: email,
		password: passwordHash,
		position: position
	}).save();
	// Find the company he's working for by looking at the company domain
	// then add the company_id to the user
	res.sendStatus(200);

}

// This method is also exposed, but it's supposed to be, we should
// add a rate limiting middleware later
export async function login(req, res) {
	if (req.body.name && req.body.password) {
		var name = req.body.name;
		var password = req.body.password;
	}
	// usually this would be a database call:
	const user = await User.findOne({ username: name })
	if (!user) {
		res.json({ message: "no such user found" });
		return
	}
	const options = {
		expiresIn: "1d"
	}
	const passed = await bcrypt.compare(req.body.password, user.password)
	if (passed) {
		var payload = { id: user.id };
		var token = jwt.sign(payload, secret, options);
		res.json({ message: "jwt created", token: token });
	} else {
		res.json({ message: "passwords did not match" });
	}
}
// this needs to be protected. it's exposed right now
export async function companyRegister(req, res) {
	const comp = req.body.company
	if (!comp) {
		return res.sendStatus(401)
	}
	await new Company({
		domain: comp
	}).save()

	res.sendStatus(200)

}

