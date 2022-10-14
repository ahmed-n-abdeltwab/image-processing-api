import { Request, Response } from 'express';

import BadRequestError from '../errors/bad-request';

const errorHandlerMiddleware = (
	err: TypeError | BadRequestError,
	req: Request,
	res: Response
) => {
	let customError = err;

	if (!(err instanceof BadRequestError)) {
		customError = new BadRequestError(
			'Oh no, this is embarrasing. We are having troubles my friend'
		);
	}

	return res
		.status((customError as BadRequestError).statusCode)
		.json({ msg: customError.message });
};

export default errorHandlerMiddleware;
