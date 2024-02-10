import React from 'react';
import Link from 'next/link';
import SigninWithGoogle from '../_components/signin-with-google';
import SignupForm from './_components/signup-form';

function Page({searchParams}: {searchParams: {id: string}}) {

  return (
    <div className="space-y-8">
      <div className="flex items-center flex-col gap-2">
        <h1 className="text-3xl font-semibold text-gray-900">
          Create an account
        </h1>
        <p className="text-base text-gray-600">
          Start your journey with us
        </p>
      </div>

      <div className="space-y-4">
        <SignupForm id={searchParams.id} />
        <SigninWithGoogle id={searchParams.id} />
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-gray-600">
          have an account?{' '}
          <Link href={searchParams.id ? `/login?id=${searchParams.id}` : '/login'} className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Page;
