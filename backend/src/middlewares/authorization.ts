import { Request, Response, NextFunction } from 'express-serve-static-core';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Token } from '../utils/auth/token/token.model';

dotenv.config();

export const adminAuthorization = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(403).json({
      statusCode: 403,
      message: 'Access Denied',
    });
  }

  try {
    const tokenFound = await Token.findOne({ token: token });
    if (!tokenFound) {
      return res.status(403).json({
        statusCode: 403,
        message: 'User Logged Out',
      });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET || '');
    const data = JSON.parse(JSON.stringify(payload));
    if (data.role == 'Admin') {
      res.locals = data;
      return next();
    } else {
      return res.status(403).json({
        statusCode: 403,
        message: 'Access Denied',
      });
    }
  } catch (error) {
    res.status(401).json({
      statusCode: 401,
      message: 'Invalid Token!',
    });
  }
};
