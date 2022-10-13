import express from 'express';
const app = express();

// product router
import imageRouter from './routes/imageRoutes';

// error handler
import notFoundMiddleware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';


app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>');
});

app.use('/api/v1/image', imageRouter);
// middleware
app.use(express.json());
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );