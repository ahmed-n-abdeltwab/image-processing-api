import sharp from 'sharp';
import path from 'path';
import ImageOption from '../types/ImageOption';
const ASSETS = path.join(process.env.PWD as string, 'assets');
const THUMBNAILS = path.join(ASSETS, 'thumbnails');

const resize = async (
	PATH: string,
	options: ImageOption,
	filename: string
): Promise<boolean> => {
	try {
		await sharp(PATH)
			.resize(options)
			.toFile(path.join(THUMBNAILS, filename as string));
	} catch (error) {
		console.log(error);
		return false;
	}
	return true;
};

export default resize;
