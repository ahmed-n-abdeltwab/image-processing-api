import readDir from '../../utilties/readDir';
import path from 'path';

const RAWS = path.join(process.cwd() as string, 'assets/raws');

describe('Read the files in raws dir', () => {
	it('should return array', async () => {
		expect(typeof (await readDir(RAWS))).toBe(typeof []);
	});
});
