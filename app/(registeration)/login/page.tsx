import React from 'react';
import LoginForm from './_components/login-form';
import Link from 'next/link';
import SigninWithGoogle from '../_components/signin-with-google';

function Page({searchParams}: {searchParams: {id: string}}) {
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
        <LoginForm id={searchParams.id} />
        <SigninWithGoogle id={searchParams.id} />
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-gray-600">
          Don&lsquo;t have an account?{' '}
          <Link href={searchParams.id ? `/signup?id=${searchParams.id}` : "/signup"} className="text-primary font-semibold">
            Sign up
          </Link>
        </p>
        <Link
          href="/forgot-password"
          className="text-primary text-sm font-semibold"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
}

export default Page;
