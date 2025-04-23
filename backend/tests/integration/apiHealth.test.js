import request from 'supertest';
import app from '../../src/app.js';

describe('API Health Endpoint', () => {
  it('should return a welcome message at root', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/API is running|welcome/i);
  });
});
