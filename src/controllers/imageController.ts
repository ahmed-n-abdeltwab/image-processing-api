import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import sharp from 'sharp';
import readDir from '../utilties/readDir';
import array from '../utilties/array';
import path from 'path';

const ASSETS = path.join(process.env.PWD as string, 'assets');
const THUMBNAIL = path.join(ASSETS, 'thumbnail');
const RAWS = path.join(ASSETS, 'raws');

type ImageOption = {
	width?: number;
	height?: number;
};
type Query = ImageOption & {
	image?: string;
};

export default async (res: Request, req: Response) => {
	const dir = await readDir(RAWS);
	const query: Query = res.query;
	const image = array.findString(dir as string[], query.image);
	if (!query.image || !image)
		return req.status(StatusCodes.NOT_FOUND).send({
			msg: 'please select from thought images',
			files: dir,
		});
	const IMAGE = path.join(RAWS, image);
	const { width, height }: ImageOption = query;
	const options: ImageOption = {};
	if (width) options.width = Number(width);
	if (height) options.height = Number(height);
	await sharp(IMAGE).resize(options).toFile(path.join(THUMBNAIL, image));
	req.status(StatusCodes.OK).sendFile(path.join(THUMBNAIL, image));
};
