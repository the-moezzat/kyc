"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
})
export default function InviteForm({onSubmit}: { onSubmit: (values: z.infer<typeof formSchema>)=>void }) {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="gap-2 justify-center flex items-end">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className={'sm:w-96'}>
                            <FormLabel className={'text-base'}>Invite Teammate</FormLabel>
                            <FormControl>
                                <Input placeholder="Email address" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isValid} >Invite</Button>
            </form>
        </Form>
    )
}