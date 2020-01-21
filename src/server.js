// @flow strict

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import {
  login,
  register,
  getTask,
  addTask,
  editTask,
  deleteTask,
} from './users/UserController';
import authMiddleware from './authMiddleware';

const app = express();

app.use(express.json());
app.use(cors());

// no separate login endpoint
// registration immediately creates token and returns it to client (access is lost on logout)
// logout is also done only on client side (token removal)
app.post('/register', (req, res) => {
  const {name, password, email} = req.body;

  register({name, password, email})
    .then((user) => {
      // $FlowFixMe
      const token = login(user);

      res.status(200).send({message: 'ok', token});
    })
    .catch(err => res.status(500).send({message: err.message}));
});

// I'm not super 100% confident if the naming follows good practises
// I would expect /tasks to return paginated tasks for current user
// app.get('/tasks', (req, res) => {...});

// I think this might be more clear with async/await syntax and some utility to avoid duplicated code
app.post('/task', authMiddleware, (req, res) => {
  const {title, description, dueDate, notificationDate} = req.body;

  addTask(req.userId, {title, description, dueDate, notificationDate})
    .then((task) => res.status(200).send({message: 'ok', task}))
    .catch(err => res.status(500).send({message: err.message}));
});

app.get('/task/:id', authMiddleware, (req, res) => {
  const {id} = req.params;

  getTask(req.userId, id)
    .then((task) => res.status(200).send({message: 'ok', task}))
    .catch(err => res.status(500).send({message: err.message}));
});

// from the api perspective this maybe makes sense,
// but imho there could be another endpoint for completing the task only
app.put('/task/:id', authMiddleware, (req, res) => {
  const {id} = req.params;
  const {title, description, dueDate, notificationDate} = req.body;

  editTask(req.userId, id, {title, description, dueDate, notificationDate})
    .then((task) => res.status(200).send({message: 'ok', task}))
    .catch(err => res.status(500).send({message: err.message}));
});

app.delete('/task/:id', authMiddleware, (req, res) => {
  const {id} = req.params;
  const {title, description, dueDate, notificationDate} = req.body;

  deleteTask(req.userId, id, {title, description, dueDate, notificationDate})
    .then(() => res.status(200).send({message: 'ok'}))
    .catch(err => res.status(500).send({message: err.message}));
});

app.listen(3000, () => {
  const mongoDB = 'mongodb://127.0.0.1/tasks';

  mongoose.connect(mongoDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
});

export default app;
