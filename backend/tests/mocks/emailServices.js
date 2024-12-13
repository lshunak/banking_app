// tests/mocks/emailServices.js
jest.mock('../../services/email', () => ({
  sendVerificationEmail: jest.fn().mockResolvedValue(true),
  generateVerificationCode: jest.fn().mockReturnValue('123456')
}));