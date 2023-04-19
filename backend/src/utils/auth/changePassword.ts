import { Request, Response, NextFunction } from 'express';
import { Team } from '../../resources/team/model/team.model';
import bcrypt from 'bcrypt';
import { encrypt } from '../../helpers/encrypt';
import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';
import { containeranalysis_v1alpha1 } from 'googleapis';

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const _id = req.params.id;

    const user = await Team.findById(_id);

    if (!user) {
      res.locals.json = {
        statusCode: 404,
        message: 'User not found',
      };
      return next();
    }

    const isMatched = await bcrypt.compare(oldPassword, user.password);

    if (!isMatched) {
      res.locals.json = {
        statusCode: 401,
        message: 'Incorrect password',
      };
      return next();
    }
    const validPassword = validateInput(newPassword);

    if (validPassword.error) {
      res.locals.json = {
        statusCode: 400,
        message: validPassword.error.details[0].message,
      };
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPassword, salt);

    user.password = password;
    await user.save();

    res.locals.json = {
      statusCode: 200,
      message: 'Password updated successfully',
    };
    return next();
  } catch (err) {
    res.locals.json = {
      statusCode: 400,
      message: 'Could not change password',
    };
    return next();
  }
};

export function validateInput(password: any) {
  const complexityOptions = {
    min: 8,
    max: 30,
    numeric: 1,
    requirementCount: 3,
  };

  const label = 'Password';
  const schema = Joi.object({
    password: passwordComplexity(complexityOptions, label),
  });
  return schema.validate({ password: password });
}
