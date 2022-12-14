import supertest from 'supertest';
import app from '../index';
const request = supertest(app);

describe('Test basic endpoint servever', () => {
  it('Get the end point', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
