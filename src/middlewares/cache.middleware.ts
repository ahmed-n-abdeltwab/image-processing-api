import { NextFunction, Request, Response } from 'express';
const cache = (req: Request, res: Response, next: NextFunction):void => {
	const period = 60 * 5; // this is a 5 minutes
	if (req.method == 'GET') {
		res.set('Cache-control', `public, max-age=${period}`);
	} else {
		res.set('Cache-control', `no-store`);
	}
	next();
};
export default cache;