import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);
describe('GET /api/images from the router', () => {
	it('should respond with status 200', async () => {
		const response = await request
			.get('/api/images')
			.set('Accept', 'application/json');
		expect(response.headers['content-type']).toMatch(/json/);
		expect(response.status).toEqual(200);
	});
});
