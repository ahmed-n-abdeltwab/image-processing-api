import { Request, Response, NextFunction } from 'express';
import { promises as fsPromises } from 'fs';

const getProcessingTimeInMS = (start: [number, number]): number => {
	const NS_PER_SEC = 1e9; //  convert to nanoseconds
	const NS_TO_MS = 1e6; // convert to milliseconds
	const diff = process.hrtime(start);
	return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const Logger = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const current_datetime = new Date();
	const formatted_date =
		current_datetime.getFullYear() +
		'-' +
		(current_datetime.getMonth() + 1) +
		'-' +
		current_datetime.getDate() +
		' ' +
		current_datetime.getHours() +
		':' +
		current_datetime.getMinutes() +
		':' +
		current_datetime.getSeconds();
	const method = req.method;
	const url = req.url;
	const status = res.statusCode;
	const start = process.hrtime();
	const durationInMilliseconds = getProcessingTimeInMS(start);
	const log = `[${formatted_date}] ${method}:${url} ${status} ${durationInMilliseconds.toLocaleString()} ms`;
	console.log(log);
	const myFile = await fsPromises.open('logs.txt', 'a+');
	await myFile.write(log + '\n');
	await myFile.close();
	next();
};
export default Logger;
