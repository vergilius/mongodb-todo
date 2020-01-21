// @flow strict

import {Schema} from 'mongoose';
import TaskSchema from '../tasks/TaskSchema';

const validateEmail = (email: string) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

const UserSchema = new Schema({
  // email validation in schema via: https://stackoverflow.com/a/24214767
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Email address is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email address is required']
  },
  name: {type: String, unique: true, required: true},
  hash: {type: String, required: true},
  tasks: [TaskSchema],
});

export default UserSchema;
