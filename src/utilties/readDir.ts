import { readdir } from 'node:fs/promises';

export default async (path: string): Promise<string[] | null> => {
	try {
		const files = await readdir(path);
		return files;
	} catch (err) {
		console.error(err);
		return null;
	}
};
