import User from '../models/user';
import Customer from '../models/customer';
import bcrypt from 'bcryptjs';
import { failure } from '../lib/util';
import UserGroup from '../models/user_groups'

const BCRYPT_SALT_ROUNDS = 10;

export default async (req, res) => {
  let { type, name, username, email, password, position } = req.body;

  const emailParts = email.split('@');
  if (emailParts.length < 2) {
    failure(res, 'Invalid email (missed @ sign?)');
    return;
  }

  const emailDomain = emailParts[1];
  const persistedCustomer = await Customer.findOne({ domain: emailDomain });
  if (!persistedCustomer) {
    failure(res, 'Failed to find a customer by domain = ' + emailDomain, 404);
    return;
  }

  const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    await new User({
      customer: persistedCustomer._id,
      type: type,
      name: name,
      username: username,
      email: email,
      password: passwordHash,
      position: position
    }).save();
    const user = await User.findOne({ username: username })
    let ug = await getUserGroup()
    // console.log(user)
    ug.users.push(user._id);
    // console.log(ug)
    UserGroup.update({ '_id': ug._id }, { $push: { 'users': user._id } }, (err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res)
      }
    })
    // TODO: update user group
    res.sendStatus(200);
  } catch (error) {
    failure(res, 'Failed to persist new user', 500, error.errors ? error.errors : error.toString());
  }
}
async function getUserGroup() {
  const userGroups = await UserGroup.find();
  for (let userGroup of userGroups) {
    if (userGroup.userGroupname === 'tum-global')
      return userGroup
  }
}
