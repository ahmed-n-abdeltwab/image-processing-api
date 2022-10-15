import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import path from 'path';

// import exceptions
import NotFoundException from '../exceptions/NotFoundException';

// import utilties
import readDir from '../utilties/readDir';
import array from '../utilties/array';
import resize from '../utilties/resize';

// import types
import Query from '../types/Query';
import ImageOption from '../types/ImageOption';

// const values
const ASSETS = path.join(process.cwd() as string, 'assets');
const THUMBNAILS = path.join(ASSETS, 'thumbnails');
const RAWS = path.join(ASSETS, 'raws');

export default async (req: Request, res: Response, next: NextFunction) => {
	const dir = await readDir(RAWS);
	const query: Query = req.query;
	const filename = array.findString(dir as string[], query.filename);
	if (!query.filename)
		return res.status(StatusCodes.OK).send({
			msg: 'please select from the available images',
			raws: dir,
		});
	if (!filename)
		return next(
			new NotFoundException(
				`sorry the image '${query.filename}' is Not Found in the raws dir`
			)
		);

	const IMAGE = path.join(RAWS, filename);
	const { width, height }: ImageOption = query;
	const options: ImageOption = {};
	if (width) options.width = Number(width);
	if (height) options.height = Number(height);
	const isResized = await resize(IMAGE, options, filename);
	if (!isResized)
		return next(
			new NotFoundException(
				`sorry the image '${query.filename}' contains unsupported image format`
			)
		);
	res.status(StatusCodes.OK).sendFile(path.join(THUMBNAILS, filename));
};
