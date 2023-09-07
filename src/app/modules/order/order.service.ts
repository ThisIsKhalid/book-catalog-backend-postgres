import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IOrder } from './order.interface';

const createOrder = async (id: string, data: IOrder) => {

  const isUserExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Customer does not exist');
  }

  const newOrder = await prisma.$transaction(async transactionClient => {
    const orderData = {
      userId: id,
    };

    const order = await transactionClient.order.create({
      data: orderData,
    });

    if (!order) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create order.');
    }

    const orderedBookData = {
      orderId: order.id,
      ...data,
    };

    const orderedBooks = await transactionClient.orderedBook.create({
      data: orderedBookData,
    });

    return order;
  });

  if (newOrder) {
    const result = prisma.order.findUnique({
      where: {
        id: newOrder.id,
      },
      include: {
        orderedBooks: true,
      },
    });

    return result
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create Order and OrderedData');
};

export const OrderService = {
  createOrder,
};
