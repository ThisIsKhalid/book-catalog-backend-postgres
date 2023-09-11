/* eslint-disable @typescript-eslint/no-non-null-assertion */
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

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.orderId
  const user = req.user;
  const { userId, role } = user!;

  const result = await OrderService.getSingleOrder(userId, role, orderId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fetched Successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder
};
