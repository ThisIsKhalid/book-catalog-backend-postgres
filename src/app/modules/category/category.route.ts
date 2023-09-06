import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = express.Router();

router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.createCategoryZodSchema),
  CategoryController.createCategory
);

router.get('/', CategoryController.getAllCategory);

router.patch(
  '/:id',
  validateRequest(CategoryValidation.updateCategoryZodSchema),
  CategoryController.updateCategory
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteCategory
);

export const CategoryRoute = router;
