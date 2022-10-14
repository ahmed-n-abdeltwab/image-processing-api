import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('GET /api/images', () => {
	it('should respond with json and status 404', (done: DoneFn) => {
		request
			.get('/api/images')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(404)
			.end(function (err) {
				if (err) {
					done.fail(err);
				} else {
					done();
				}
			});
	});
});
