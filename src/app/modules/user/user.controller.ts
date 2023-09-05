import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUser();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched Successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
  const result = await UserService.getSingleUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched Successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const data = req.body
  const result = await UserService.updateUser(id,data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated Successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
  const result = await UserService.deleteUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted Successfully',
    data: result,
  });
});

export const UserController = {
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser
};
