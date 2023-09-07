import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookService } from './book.service';
import pick from '../../../shared/pick';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await BookService.createBook(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created Successfully',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {

  const filters = pick(req.query, ['searchTerm', 'title', 'author', 'genre', 'category', 'minPrice', 'maxPrice'])
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);


  const result = await BookService.getAllBooks(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books fetched Successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getBooksByCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  // console.log(categoryId);
 
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await BookService.getBooksByCategory(categoryId,options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books with associated category data fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});



const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await BookService.updateBook(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated Successfully',
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.deleteBook(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted Successfully',
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
  getBooksByCategory
};
