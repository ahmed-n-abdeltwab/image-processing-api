import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import NotFoundException from '../exceptions/NotFoundException';
import sharp from 'sharp';
import readDir from '../utilties/readDir';
import array from '../utilties/array';
import path from 'path';

const ASSETS = path.join(process.env.PWD as string, 'assets');
const THUMBNAILS = path.join(ASSETS, 'thumbnails');
const RAWS = path.join(ASSETS, 'raws');

type ImageOption = {
	width?: number;
	height?: number;
};
type Query = ImageOption & {
	filename?: string;
};

export default async (res: Request, req: Response, next: NextFunction) => {
	const dir = await readDir(RAWS);
	const query: Query = res.query;
	const filename = array.findString(dir as string[], query.filename);
	if (!query.filename)
		return req.status(StatusCodes.OK).send({
			msg: 'please select from thought images',
			raws: dir,
		});
	if (!filename)
		next(new NotFoundException(`Image : ${query.filename} is Not Found`));
	else {
		const IMAGE = path.join(RAWS, filename as string);
		const { width, height }: ImageOption = query;
		const options: ImageOption = {};
		if (width) options.width = Number(width);
		if (height) options.height = Number(height);
		await sharp(IMAGE)
			.resize(options)
			.toFile(path.join(THUMBNAILS, filename as string));
		req.status(StatusCodes.OK).sendFile(
			path.join(THUMBNAILS, filename as string)
		);
	}
};
