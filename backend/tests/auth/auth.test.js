const request = require('supertest');
const { app } = require('../../app');
require('../mocks/emailService');

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
      // Create and verify user first
      const user = await request(app)
        .post('/authentication/signup')
        .send({
          username: 'liran',
          email: 'liranshunak@gmail.com',
          password: '123'
        });

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

