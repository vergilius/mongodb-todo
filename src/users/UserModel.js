// @flow strict

import {model} from 'mongoose';
import UserSchema from './UserSchema';

const UserModel = model('UserModel', UserSchema);

export default UserModel;
