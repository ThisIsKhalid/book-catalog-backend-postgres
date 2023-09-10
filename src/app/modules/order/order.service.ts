import { Order } from '@prisma/client';
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
    const isOrderExist = await transactionClient.order.findFirst({
      where: {
        userId: id,
      },
    });

    if (!isOrderExist) {
      const orderData = {
        userId: id,
      };
      const newOrderData = await transactionClient.order.create({
        data: orderData,
      });

      const creatingOrderedBook = await transactionClient.orderedBook.create({
        data: {
          orderId: newOrderData.id,
          bookId: data.bookId,
          quantity: data.quantity,
        },
      });

      if (!newOrderData && !creatingOrderedBook) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'Unable to create Order and OrderedData'
        );
      }
      return newOrderData;
    } else {
      const creatingOrderedBook = await transactionClient.orderedBook.create({
        data: {
          orderId: isOrderExist.id,
          bookId: data.bookId,
          quantity: data.quantity,
        },
      });

      return isOrderExist;
    }
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

    return result;
  }

  throw new ApiError(
    httpStatus.BAD_REQUEST,
    'Unable to create Order and OrderedData'
  );
};

const getAllOrders = async (userId: string, role: string): Promise<Order[]> => {
  console.log(userId, role);

  if (role === 'customer') {
    const result = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        orderedBooks: true,
      },
    });

    return result;
  } else {
    const result = await prisma.order.findMany({
      include: {
        orderedBooks: true,
      },
    });
    return result;
  }
};

const getSingleOrder = async (
  userId: string,
  role: string,
  orderId: string
) => {
  if (role === 'customer') {
    const result = await prisma.order.findUnique({
      where: {
        id: orderId,
        userId,
      },
      include: {
        orderedBooks: true,
      },
    });

    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, "You haven't placed any order");
    }

    return result;
  } else {
    const result = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderedBooks: true,
      },
    });

     if (!result) {
       throw new ApiError(httpStatus.NOT_FOUND, "Order does not exist");
     }
    return result;
  }
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
