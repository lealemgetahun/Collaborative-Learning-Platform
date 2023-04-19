import { Request } from 'express';
import { Aggregate } from 'mongoose';

export const paginate = async (req: Request, query: Aggregate<unknown[]>) => {
  const limit: number = parseInt(req.query.limit as string) || 10;
  const page: number = parseInt(req.query.page as string) || 0;

  const result = await query.skip(page * limit).limit(limit);
  return { meta: { page: page, limit: limit }, data: result };
};
