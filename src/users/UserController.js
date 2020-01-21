// @flow strict

import User from './UserModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config.json';

type TaskData = {|
  +title: string,
  +description: string,
  +dueDate: string,
  +notificationDate: string,
|};

type UserData = {|
  +_id?: string,
  +name: string,
  +hash: string,
  +tasks: TaskData[],
|};

type UserRegistrationData = {|
  +name: string,
  +password: string,
  +email: string,
|};

export const login = (user: UserData): string =>
  jwt.sign({id: user._id}, config.secret, {expiresIn: 86400});

export const register = ({name, password, email}: UserRegistrationData): Promise<UserData | Error> => {
  // this is just for safety from runtime errors :|
  if (!name || !password || !email) {
    return Promise.reject(new Error('Invalid input'));
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  
  const user = new User({
    name,
    email,
    hash: hashedPassword
  });

  return user.save();
};

export const getTask = (userId: number, taskId: number): Promise<TaskData | Error> => Promise.reject('Not implemented');
export const addTask = (userId: number, task: TaskData): Promise<TaskData | Error> => Promise.reject('Not implemented');
export const editTask = (userId: number, taskId: number, task: TaskData): Promise<TaskData | Error> => Promise.reject('Not implemented');
export const deleteTask = (userId: number, taskId: number, task: TaskData): Promise<void> => Promise.reject('Not implemented');

