import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { useForm, type SubmitHandler } from "react-hook-form";
import { signupFormResolver, type signupFormType } from '@/schema/signup-schema';

import axios from '@/lib/axios';

export function SignupForm() {

    const { handleSubmit, register, formState: { errors }} = useForm<signupFormType>({
        resolver: signupFormResolver,
    });

    const onSubmit: SubmitHandler<signupFormType> = (data) => {
        axios.post('/user/signup', data)
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input 
                            id="first-name" 
                            placeholder="Max" 
                            {...register("firstName")}
                        />
                        <p className='text-sm font-medium text-destructive'>{ errors.firstName?.message }</p>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input 
                            id="last-name" 
                            placeholder="Robinson" 
                            {...register("lastName")}
                        />
                        <p className='text-sm font-medium text-destructive'>{ errors.lastName?.message }</p>
                    </div>
                </div>
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
                    <Label htmlFor="password">Password</Label>
                    <Input 
                        id="password" 
                        type="password" 
                        {...register("password")}
                    />
                    <p className='text-sm font-medium text-destructive'>{ errors.password?.message }</p>
                </div>
                <Button type="submit" className="w-full">
                    Create an account
                </Button>
            </div>
            <div className="mt-4 text-center text-sm">
                Already have an account?
                <a href="#" className="underline">
                    Sign in
                </a>
            </div>
        </form>
        </>
    )
}