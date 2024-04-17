import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const loginFormSchema = z.object({
    email: z.string().email({ message: '請輸入字串' }),
    password: z.string().min(8, { message: '密碼最短需要8個字' }),
});

export type loginFormType = z.infer<typeof loginFormSchema>

export const loginFormResolver = zodResolver(loginFormSchema);
