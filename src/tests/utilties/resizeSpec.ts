import resize from '../../utilties/resize';
import readDir from '../../utilties/readDir';
import path from 'path';

const RAWS = path.join(process.env.PWD as string, 'assets/raws');

describe('Resize the image in raws dir', () => {
	it('should return boolean type', async () => {
		const dir = await readDir(RAWS);
		if (dir) {
			expect(
				typeof (await resize(path.join(RAWS, dir[0]), {}, dir[0]))
			).toBe(typeof true);
		}
	});
});
