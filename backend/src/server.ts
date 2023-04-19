import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import bodyParser from 'body-parser';
import { urlencoded } from 'body-parser';
import morgan from 'morgan';
import { connect } from './utils/db/setupDB';
import cors from 'cors';
import config from './config';

export const app = express();

app.disable('x-powered-by');

app.use(cors());

app.use(morgan('dev'));

app.use((req: Request, res: Response) => {
  res.json({ data: 'Hello World!' });
});

export const start = async () => {
  await connect();
  try {
    await connect();
    app.listen(config.port, () => {
      console.log(`REST API on http://${config.host}:${config.port}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};
export default app;
