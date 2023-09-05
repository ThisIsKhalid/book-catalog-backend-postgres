import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const userSignUp = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AuthService.userSignUp(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfully',
    data: result,
  });
});

const userLogin = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AuthService.userLogin(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Logged in Successfully',
    data: result,
  });
});

export const AuthController = {
  userSignUp,
  userLogin,
};
