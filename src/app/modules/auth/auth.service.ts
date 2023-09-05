import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginUserData } from './auth.interface';

const userSignUp = async (payload: User): Promise<Partial<User>> => {
  const result = await prisma.user.create({
    data: payload,
  });

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...dataWithoutPassword } = result;

  return dataWithoutPassword;
};

const userLogin = async (payload: ILoginUserData) => {
  const { email, password } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (isUserExist.password && isUserExist.password !== password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not match.');
  }

  const { id: userId, role } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return accessToken;
};

export const AuthService = {
  userSignUp,
  userLogin,
};
