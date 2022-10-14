import express from 'express';
const app = express();

// product router
import imageRouter from './routes/imageRoutes';

// error handlers
import notFoundMiddleware from './middlewares/not-found.middleware';
import errorHandlerMiddleware from './middlewares/error.middleware';

// logger
import Logger from './middlewares/logger.middleware';

// logger
import cacheMiddleware from './middlewares/cache.middleware';

// middleware
app.use(express.json());
app.use(cacheMiddleware);
app.use(Logger);

app.get('/', (req, res) => {
	res.send(
		'<h1>Image Processing API</h1><a href="/api/images">images route</a>'
	);
});

app.use('/api/images', imageRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () =>
	console.log(`Server is listening at http://localhost:${port}`)
);

export default app;
