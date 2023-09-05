import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoute } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/auth",
    routes: AuthRoutes
  },
  {
    path: "/users",
    routes: UserRoute
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
