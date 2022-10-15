import { NextFunction, Request, Response } from 'express';
const cache = (req: Request, res: Response, next: NextFunction): void => {
	const period = 31536000; // 365.25 days
	if (req.method === 'GET') {
		res.setHeader('Cache-Control', `public, max-age=${period}`);
	} else {
		res.setHeader('Cache-Control', `no-store`);
	}
	next();
};
export default cache;
