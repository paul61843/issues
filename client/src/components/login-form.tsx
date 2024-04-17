import React, { type FormEvent, useState } from 'react';

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { useForm, type SubmitHandler } from "react-hook-form";
import { loginFormResolver, type loginFormType } from '@/schema/login-schema';


export function LoginForm() {
    const { control, handleSubmit, register, formState: { errors }} = useForm<loginFormType>({
        resolver: loginFormResolver,
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<loginFormType> = (data) => {
        console.log(data);
    }

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email")}
                />
                <p className='text-sm font-medium text-destructive'>{ errors.email?.message }</p>
            </div>
            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                    </a>
                </div>
                <Input 
                    id="password" 
                    type="password" 
                    {...register("password")}  
                />
                <p className='text-sm font-medium text-destructive'>{ errors.password?.message }</p>
            </div>
            <Button type="submit" className="w-full">
                Login
            </Button>
        </form>
        <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <a href="./signup" className="underline">
            Sign up
            </a>
        </div>
    </>
  );
}