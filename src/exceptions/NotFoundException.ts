import { StatusCodes } from 'http-status-codes';

import HttpException from './HttpException';

class NotFoundError extends HttpException {
	constructor(message: string) {
		super(StatusCodes.NOT_FOUND, message);
	}
}

export default NotFoundError;
