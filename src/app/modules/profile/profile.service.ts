import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { User } from "@prisma/client";

const getUserProfile = async (id: string): Promise<User> => {
  const result = await prisma.user.findUnique({
    where: {
      id
    }
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist.');
  }

  return result;
}; 

export const UserProfileService = {
    getUserProfile
}