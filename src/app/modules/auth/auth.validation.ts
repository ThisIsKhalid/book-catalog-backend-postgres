import { z } from 'zod';

const signUpZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    role: z.enum(['customer', 'admin']),
    contactNo: z.string({
      required_error: 'Contact NO is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    profileImg: z.string({
      required_error: 'Profile Image is required',
    }),
  }),
});

export const AuthValidation = {
    signUpZodSchema
}
