import { Request, Response, NextFunction } from 'express-serve-static-core';
import { Token } from './token/token.model';

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(403).json({
      statusCode: 401,
      message: 'user not logged in',
    });
  }

  try {
    const storedToken = await Token.findOneAndDelete({ token: token });
    if (!storedToken) {
      res.locals.json = {
        statusCode: 404,
        data: 'token not found',
      };
      return;
    }

    res.locals.json = {
      statusCode: 200,
      data: 'Successfully logged out',
    };
  } catch (error) {
    res.locals.json = {
      statusCode: 500,
      data: 'error occured',
    };
  }
  return next();
};
