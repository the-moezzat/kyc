'use client';
import React from 'react';
import Link from 'next/link';
import SigninWithGoogle from '../_components/signin-with-google';
import SignupForm from './_components/signup-form';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Provider } from '@supabase/supabase-js';
import config from '@/config';
import { toast } from 'sonner';

function Page() {
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleSignup = async (
    options:
      | {
          type: 'magic_link' | 'email';
          provider: null;
        }
      | { type: 'oauth'; provider: Provider }
  ) => {
    setIsLoading(true);

    try {
      const { type, provider } = options;
      const redirectURL = window.location.origin + '/api/auth/callback';

      if (type === 'oauth') {
        await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: redirectURL,
          },
        });
      } else if (type === 'magic_link') {
        await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: redirectURL,
          },
        });

        toast.success('Check your emails!');

        setIsDisabled(true);
      } else if (type === 'email') {
        await supabase.auth.signUp({
          email,
          password: '',
          options: {
            emailRedirectTo: redirectURL,
            data: {
              name: 'John Doe',
              role: 'user',
              nationality: 'us',
            },
          },
        });

        toast.success('Check your emails!');

        setIsDisabled(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center flex-col gap-2">
        <h1 className="text-3xl font-semibold text-gray-900">
          Log in to your account
        </h1>
        <p className="text-base text-gray-600">
          Welcome back! Please enter your details
        </p>
      </div>

      <div className="space-y-4">
        <SignupForm />
        <SigninWithGoogle />
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-gray-600">
          have an account?{' '}
          <Link href="/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Page;
