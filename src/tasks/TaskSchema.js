// @flow strict

import {Schema} from 'mongoose';

const TaskSchema = new Schema({
  title: String,
  description: Date,
  dueDate: Date,
  notificationDate: Date,
  done: Boolean,
});


export default TaskSchema;
