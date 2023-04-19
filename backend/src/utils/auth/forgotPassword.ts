import { NextFunction, Request, Response } from 'express';
import { sendEmail } from '../util';
import { generateOTP, generatePassord } from '../util';
import { OTP } from '../../resources/OTP/otp.model';
import { Team } from '../../resources/team/model/team.model';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (!req.body.email) {
    res.locals.json = {
      statusCode: 404,
      message: 'User Not found',
    };
    return next();
  }
  try {
    const initialPassword = generatePassord(6);
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(initialPassword, salt);
    const user = await Team.findOneAndUpdate({ email: email }, { password: password });
    if (!user) {
      res.locals.json = {
        statusCode: 404,
        message: 'User Not found',
      };
      return next();
    }
    console.log(initialPassword);

    const OTPGenerated = generateOTP(6);
    const otp = await OTP.findOne({ email });
    if (otp) {
      otp.otpCode = OTPGenerated;
      await otp.save();
    } else {
      await OTP.create({
        email,
        OTPGenerated,
      });
    }

    const forgotPasswordMessage: any = {
      from: process.env.APP_FORWARD_EMAIL_ADDRESS,
      to: email,
      subject: `Successfull password reset`,
      text: `Dear A2SVian,\n\n
                Your password is reset to ${initialPassword}\n\n
                `,
    };
    await sendEmail(forgotPasswordMessage);

    res.locals.json = {
      statusCode: 200,
      message: 'the new password is sent to the email',
    };
    return next();
  } catch (error) {
    res.locals.json = {
      statusCode: 500,
      message: 'Something went wrong',
    };
    return next();
  }
};
