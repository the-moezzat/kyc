"use client"

import * as z from "zod"
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

interface Props {
    onSuccessfulSubmit: () => void
}

// TODO add email
const formSchema = z.object({
    username: z.string({required_error: "Enter your username"}).min(2, "Username must be at least 2 characters"),
    password: z.string().min(6)
})

function Credentials({onSuccessfulSubmit}: Props) {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        onSuccessfulSubmit();
    }
    return (
        <div className={'flex flex-col h-full py-4 items-center gap-8 w-full'}>
            <Form {...form} >
                <h2 className={'text-xl text-gray-900 font-semibold'}>Enter your credentials</h2>

                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full px-4 h-full flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} className={'w-full h-12'} />
                                </FormControl>

                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" type={'password'} {...field} className={'w-full h-12'} />
                                </FormControl>

                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className={'mt-auto'}>Next</Button>
                </form>
            </Form>
        </div>
    );
}

export default Credentials;