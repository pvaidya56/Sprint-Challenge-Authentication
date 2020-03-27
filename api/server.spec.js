const request = require("supertest");
const server = require("./server.js");

describe('server.js', () => {
  describe('get /', () => {
    it('should return a message', () => {
      return request(server).get('/')
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it('should return a JSON object', () => {
      return request(server).get('/')
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it('should respond with { statusReport: "its working!" }', () => {
      return request(server).get('/')
        .then(res => {
          expect(res.body.statusReport).toMatch("its working!");
        });
    });
  });
});