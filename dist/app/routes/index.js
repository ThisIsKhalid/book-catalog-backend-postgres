"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const category_route_1 = require("../modules/category/category.route");
const user_route_1 = require("../modules/user/user.route");
const book_route_1 = require("../modules/book/book.route");
const order_route_1 = require("../modules/order/order.route");
const profile_route_1 = require("../modules/profile/profile.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        routes: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        routes: user_route_1.UserRoute,
    },
    {
        path: '/categories',
        routes: category_route_1.CategoryRoute,
    },
    {
        path: '/books',
        routes: book_route_1.BookRoute,
    },
    {
        path: '/orders',
        routes: order_route_1.OrderRoute,
    },
    {
        path: '/profile',
        routes: profile_route_1.UserProfileRoute,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
