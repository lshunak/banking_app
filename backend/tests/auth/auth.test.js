const request = require('supertest');
const { app } = require('../../app');
require('../mocks/emailServices');

jest.setTimeout(30000); // Increase timeout

describe('Authentication Endpoints', () => {
  describe('POST /authentication/signup', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/authentication/signup')
        .send({
          username: 'liran',
          email: 'liranshunak@gmail.com',
          password: '123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Signup successful! Please verify your email.');
    }, 10000); // Add timeout per test
  });

  describe('POST /authentication/signin', () => {
    it('should authenticate user and return token', async () => {
      // First create a user
      await request(app)
        .post('/authentication/signup')
        .send({
          username: 'liran',
          email: 'liranshunak@gmail.com',
          password: '123'
        });

      // Verify the user (mock verification)
      const User = require('../../models/user');
      const user = await User.findOne({ email: 'liranshunak@gmail.com' });
      user.isVerified = true;
      await user.save();

      // Then try to sign in
      const response = await request(app)
        .post('/authentication/signin')
        .send({
          username: 'liran',
          password: '123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    }, 10000);
  });
});

