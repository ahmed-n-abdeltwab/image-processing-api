import supertest from 'supertest';
import app from '../../index';
import readDir from '../../utilties/readDir';
import path from 'path';

const RAWS = path.join(process.env.PWD as string, 'assets/raws');

const request = supertest(app);

describe('The Image Controller :', () => {
	describe('If the request Query has no image name', () => {
		it('should respond with all available image in raws folder', async () => {
			const response = await request
				.get('/api/images')
				.set('Accept', 'application/json');
			expect(response.headers['content-type']).toMatch(/json/);
			expect(response.status).toEqual(200);
		});
	});

	describe('If the request Query has image name', () => {
		it('should respond with the file if the raws has at least one file', async () => {
			const dir = (await readDir(RAWS)) as string[];
			const response = await request.get(
				'/api/images?filename=' + dir[0]
			);
			if (dir.length) {
				expect(response.headers['content-type']).toMatch(/image/);
				expect(response.status).toEqual(200);
			}
		});
		it('should respond with the json if the raws has no file', async () => {
			const dir = (await readDir(RAWS)) as string[];
			const response = await request.get(
				'/api/images?filename=' + dir[0]
			);
			if (!dir.length) {
				expect(response.headers['content-type']).toMatch(/json/);
				expect(response.status).toEqual(200);
				expect(response.body.msg).toEqual(
					'please select from thought images'
				);
			}
		});
	});

	describe('If the request Query has image name and width = 300', () => {
		it('should respond with the file if the raws has at least one file', async () => {
			const dir = (await readDir(RAWS)) as string[];
			const response = await request.get(
				'/api/images?filename=' + dir[0] + '&width=300'
			);
			if (dir.length) {
				expect(response.headers['content-type']).toMatch(/image/);
				expect(response.status).toEqual(200);
			}
		});
		it('should respond with the json if the raws has no file', async () => {
			const dir = (await readDir(RAWS)) as string[];
			const response = await request.get(
				'/api/images?filename=' + dir[0] + '&width=300'
			);
			if (!dir.length) {
				expect(response.headers['content-type']).toMatch(/json/);
				expect(response.status).toEqual(200);
				expect(response.body.msg).toEqual(
					'please select from thought images'
				);
			}
		});
	});

	describe('If the request Query has image name and width = 300 and height = 300', () => {
		it('should respond with the file if the raws has at least one file', async () => {
			const dir = (await readDir(RAWS)) as string[];
			const response = await request.get(
				'/api/images?filename=' + dir[0] + '&width=300&height=300'
			);
			if (dir.length) {
				expect(response.headers['content-type']).toMatch(/image/);
				expect(response.status).toEqual(200);
			}
		});
		it('should respond with the json if the raws has no file', async () => {
			const dir = (await readDir(RAWS)) as string[];
			const response = await request.get(
				'/api/images?filename=' + dir[0] + '&width=300&height=300'
			);
			if (!dir.length) {
				expect(response.headers['content-type']).toMatch(/json/);
				expect(response.status).toEqual(200);
				expect(response.body.msg).toEqual(
					'please select from thought images'
				);
			}
		});
	});
});
