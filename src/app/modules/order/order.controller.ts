import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { userId } = user!;
  const data = req.body;

  const result = await OrderService.createOrder(userId, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created Successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { userId, role } = user!;

  const result = await OrderService.getAllOrders(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched Successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
};
