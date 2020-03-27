const request = require("supertest");
const server = require("../api/server.js");

function numGenerator() {
  let num = Math.random() * 1000;
  return num;
}

const testUser = {
  username: `testUser.${numGenerator()}`,
  password: 'pass'
};

const registeredUser = {
  username: 'priya',
  password: 'vaidya'
};

const invalidUser = {
  username: 'priya1234',
  password: 'invalid'
};

describe('auth-router.js', () => {
// tests for register endpoint
  describe('register endpoint', () => {
    it('should return a 500 status when username and/or password is not given', async () => {
      const res = await request(server)
            .post('/api/auth/register');
        expect(res.status).toBe(500);
    });
    it('should return a 201 status when registering new user', async () => {
      const res = await request(server)
            .post('/api/auth/register')
            .send(testUser);
        expect(res.status).toBe(201);
    });
  });
// Tests for login endpoint
  describe('login endpoint', () => {
    it('should return 401 when invalid credentials given', async () => {
      const res = await request(server)
            .post('/api/auth/login')
            .send(invalidUser);
        expect(res.status).toBe(401);
    });
    it('should return 201 when user logs in', async () => {
      const res = await request(server)
            .post('/api/auth/login')
            .send(testUser);
        expect(res.status).toBe(201);
    });
  });
// Tests for Jokes
  describe('jokes endpoint', () => {
    it('should return content-type as JSON', () => {
      return request(server)
        .get('/api/jokes')
        .expect('CONTENT-TYPE', /json/i);
    });
    it('should return a status 200 when a logged in user gets jokes', async () => {
      const res = await request(server)
            .post('/api/auth/login')
            .send(testUser);
        const res1 = await request(server)
            .get('/api/jokes')
            .set('authorization', res.body.token);
        expect(res1.status).toBe(200);
    });
  });
});