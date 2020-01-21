// Semi integration tests for endpoints (looked least troublesome comparing to live DB or in-memory alternative)

import supertest from 'supertest';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import app from './server';

jest.mock('mongoose', () => ({
  Schema: jest.fn(),
  model: jest.fn(() => function() {
    return {
      save: jest.fn(() => Promise.resolve({}))
    }
  }),
  connect: jest.fn()
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

describe('server app', () => {
  beforeEach(() => {
    mongoose.Schema.mockReset();
    mongoose.model.mockReset();
    jwt.sign.mockReset();
    jwt.verify.mockReset();
  });

  it ('returns error on invalid registration request', async () => {
    const result = await supertest(app)
      .get('/register')
      .send('invalid=params');

    expect(result.res.statusCode).toEqual(404);        
  });

  it ('returns auth token on successful registration request', async () => {
    jwt.sign.mockReturnValue('my-valid-test-token');

    const result = await supertest(app)
      .post('/register')
      .send({name: 'hi', password: 'my password', email: 'mongo@yay.com'});

    // it would be nice to get into details in here
    expect(jwt.sign).toHaveBeenCalledTimes(1);
    expect(result.res.statusCode).toEqual(200);
    expect(result.res.text).toEqual(JSON.stringify({"message":"ok","token":"my-valid-test-token"}));
  });

  it ('returns error on request to task while not logged', async () => {
    const result = await supertest(app)
      .post('/task')
      .send();

    expect(jwt.verify).toHaveBeenCalledTimes(0); // no token passed, returning without check
    expect(result.res.statusCode).toEqual(403);
  });

  // I did not managed to pass trough authMiddleware, not sure what's the issue
  // it ('returns task data after successfull add', async () => {
  //   jwt.verify.mockImplementationOnce((token, secret, cb) => cb(null, {id: 'user-id'}));

  //   const result = await supertest(app)
  //     .post('/task')
  //     .set('x-auth-token', 'my-token')
  //     .send({name: 'hi', password: 'my password', email: 'mongo@yay.com'});

  //   expect(jwt.verify).toHaveBeenCalledTimes(1);
  //   expect(result.res.statusCode).toEqual(200);
  // });

  // etc, there ideally would be tests for validation and network errors
});
