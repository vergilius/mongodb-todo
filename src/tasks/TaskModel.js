// @flow strict

import {model} from 'mongoose';
import TaskSchema from './TaskSchema';

const TaskModel = model('TaskModel', TaskSchema);

export default TaskModel;
