import { Request, Response, NextFunction } from 'express-serve-static-core';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import { Team } from '../../resources/team/model/team.model';
import { Token } from './token/token.model';

dotenv.config();

export const login = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email) {
    return next();
  }
  try {
    const user = await Team.findOne({
      email: req.body.email,
    });

    if (!user) {
      res.locals.json = {
        statusCode: 401,
        message: 'Incorrect email or password',
      };
      return next();
    }

    const isMatched = await bcrypt.compare(req.body.password, user.password);
    if (!isMatched) {
      res.locals.json = {
        statusCode: 401,
        message: 'Incorrect email or password',
      };
      return next();
    }

    if (!user.role) {
      res.locals.json = {
        statusCode: 403,
        message: 'User is neither Admin nor Blogger',
      };
      return next();
    }

    const token = JWT.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET || '');
    await Token.create({ token });

    res.locals.json = {
      statusCode: 200,
      data: {
        token: token,
        role: user.role,
      },
    };
    return next();
  } catch (error) {
    res.locals.json = {
      statusCode: 500,
      message: 'Sign in failed',
    };
    return next();
  }
};
