import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserProfileService } from './profile.service';

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const { userId } = user!;

  const result = await UserProfileService.getUserProfile(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched Successfully',
    data: result,
  });
});

export const UserProfileController = {
  getSingleOrder,
};
