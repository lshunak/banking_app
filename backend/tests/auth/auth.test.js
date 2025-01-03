const request = require('supertest');
const { app } = require('../../app');
require('../mocks/emailServices'); // Ensure correct path
require('../setup'); // Ensure database connection

jest.setTimeout(30000);

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
    }, 10000);
  });

  describe('POST /authentication/signin', () => {
    it('should authenticate user and return token', async () => {
      // Create and verify user first
      const signupResponse = await request(app)
        .post('/authentication/signup')
        .send({
          username: 'liran',
          email: 'liranshunak@gmail.com',
          password: '123'
        });

      expect(signupResponse.status).toBe(200);
      console.log('Signup response:', signupResponse.body); // Add logging

      // Simulate email verification
      const verifyResponse = await request(app)
        .get('/authentication/verify-email')
        .query({ verifyCode: '123456' });

      console.log('Verify response:', verifyResponse.body); // Add logging

      expect(verifyResponse.status).toBe(200);

      // Attempt to sign in
      const signinResponse = await request(app)
        .post('/authentication/signin')
        .send({
          username: 'liran',
          password: '123'
        });

      console.log('Signin response:', signinResponse.body); // Add logging

      expect(signinResponse.status).toBe(200);
      expect(signinResponse.body).toHaveProperty('token');
    }, 10000);
  });
});

