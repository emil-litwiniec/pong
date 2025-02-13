import express from 'express';
import { router } from './routes';
import session from 'express-session';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(
  session({
    secret: 'someSecret',
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: false,
    },
  })
);

app.use('/api', router);

export { app };
