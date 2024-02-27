'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/types/db";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import config from "@/config";

const formSchema = z.object({
    full_name: z.string().min(2, {
        message: 'Full name must be at least 2 characters.',
    }),
  email: z.string().email({
    message: 'Enter a valid email',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

interface Props {
    id: string;
}

export default function SignupForm({id}: Props) {
    const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });


    const supabase = createClientComponentClient<Database>()

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const {email, password, full_name} = values;
      const notification = toast.loading('Signing up...');

        const {data, error} = await supabase.auth.signUp(
            {
                email,
                password,
                options: {
                    data: {
                        full_name,
                        name: full_name,
                        email
                    }
                }
            }
        )

        if (error) {
            toast.error('An error occurred. Please try again.', {
                id: notification,
                description: <p className={'text-red-100'}>{error.message}</p>
            });
            return;
        }

        if (data) {
            if (id)
                router.push('/verify/' + id + '/nationality');
            else
                router.push(config.auth.callbackUrl);
        }

        toast.success('You have successfully Signed up!', {
            id: notification,
            duration: 200,

        });
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-3">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-gray-700 font-semibold text-sm ">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-gray-700 font-semibold text-sm ">
                  Email
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-gray-700 font-semibold text-sm ">
                  Password
                </FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          Sign up
        </Button>
      </form>
    </Form>
  );
}
