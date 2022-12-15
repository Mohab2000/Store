import express, { Application, Request, Response } from 'express';
// import morgan from 'morgan';
// import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import routes from './routes';
import errorMiddleware from './middleware/error.middleware';
import config from './config';

const PORT = config.port || 3000;
const app: Application = express();
//console.log(config);
//HTTP request logger middleware
// app.use(morgan('common'));
//middleware to parse incoming requests
app.use(express.json());
//HTTP security middleware
// app.use(helmet());
//To avoid spam
app.use(
  rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP , please try again after an hour.',
  })
);

app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World',
  });
});
app.use(errorMiddleware);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'URL does not exist',
  });
});

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
});

export default app;
