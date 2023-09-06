import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CategoryRoute } from '../modules/category/category.route';
import { UserRoute } from '../modules/user/user.route';
import { BookRoute } from '../modules/book/book.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/users',
    routes: UserRoute,
  },
  {
    path: '/categories',
    routes: CategoryRoute,
  },
  {
    path: '/books',
    routes: BookRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
