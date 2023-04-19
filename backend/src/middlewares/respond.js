import { Request, Response } from 'express';

export const respond = async (req: Request, res: Response) => {
  return res.status(res.locals.json.statusCode).send(res.locals.json);
};
