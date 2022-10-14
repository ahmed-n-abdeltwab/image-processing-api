import express from 'express';
const app = express();

// product router
import imageRouter from './routes/imageRoutes';

// error handler
import notFoundMiddleware from './middlewares/not-found.middleware';
import errorHandlerMiddleware from './middlewares/error-handler.middleware';

// logger
import Logger from './middlewares/logger.middleware';

// middleware
app.use(express.json());

app.use(Logger);
app.use('/api/images', imageRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () =>
	console.log(`Server is listening at http://localhost:${port}`)
);

export default app;
