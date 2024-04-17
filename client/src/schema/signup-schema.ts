import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const signupFormSchema = z.object({
    firstName: z.string().min(2, { message: 'first name must be at least 2 characters' }),
    lastName: z.string().min(2, { message: 'last name must be at least 2 characters' }),
    email: z.string().email({ message: 'please enter a valid email' }),
    password: z.string().min(8, { message: 'password must be at least 8 characters' }),
})

export type signupFormType = z.infer<typeof signupFormSchema>;

export const signupFormResolver = zodResolver(signupFormSchema);