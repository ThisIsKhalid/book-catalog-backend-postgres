import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { OrderService } from './order.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const {userId} = user!;
  const data = req.body;


    const result = await OrderService.createOrder(userId,data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order created Successfully',
      data: result,
    });
});

export const OrderController = {
  createOrder,
};
