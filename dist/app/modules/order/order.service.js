"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createOrder = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Customer does not exist');
    }
    const newOrder = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const isOrderExist = yield transactionClient.order.findFirst({
            where: {
                userId: id,
            },
        });
        if (!isOrderExist) {
            const orderData = {
                userId: id,
            };
            const newOrderData = yield transactionClient.order.create({
                data: orderData,
            });
            const creatingOrderedBook = yield transactionClient.orderedBook.create({
                data: {
                    orderId: newOrderData.id,
                    bookId: data.bookId,
                    quantity: data.quantity,
                },
            });
            if (!newOrderData && !creatingOrderedBook) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to create Order and OrderedData');
            }
            return newOrderData;
        }
        else {
            // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
            const creatingOrderedBook = yield transactionClient.orderedBook.create({
                data: {
                    orderId: isOrderExist.id,
                    bookId: data.bookId,
                    quantity: data.quantity,
                },
            });
            return isOrderExist;
        }
    }));
    if (newOrder) {
        const result = prisma_1.default.order.findUnique({
            where: {
                id: newOrder.id,
            },
            include: {
                orderedBooks: true,
            },
        });
        return result;
    }
    throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to create Order and OrderedData');
});
const getAllOrders = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userId, role);
    if (role === 'customer') {
        const result = yield prisma_1.default.order.findMany({
            where: {
                userId,
            },
            include: {
                orderedBooks: true,
            },
        });
        return result;
    }
    else {
        const result = yield prisma_1.default.order.findMany({
            include: {
                orderedBooks: true,
            },
        });
        return result;
    }
});
const getSingleOrder = (userId, role, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    if (role === 'customer') {
        const result = yield prisma_1.default.order.findUnique({
            where: {
                id: orderId,
                userId,
            },
            include: {
                orderedBooks: true,
            },
        });
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "You haven't placed any order");
        }
        return result;
    }
    else {
        const result = yield prisma_1.default.order.findUnique({
            where: {
                id: orderId,
            },
            include: {
                orderedBooks: true,
            },
        });
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Order does not exist");
        }
        return result;
    }
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getSingleOrder,
};
