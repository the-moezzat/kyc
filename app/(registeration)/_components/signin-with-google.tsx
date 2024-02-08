'use client';
import Icon from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Database } from '@/types/db';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useState } from 'react';

function SigninWithGoogle() {
  const supabase = createClientComponentClient<Database>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignup = async () => {
    setIsLoading(true);

    try {
      const redirectURL = window.location.origin + '/api/auth/callback';
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectURL,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={'outline'}
      className="text-gray-700 font-semibold text-sm flex gap-4 items-center w-full"
      onClick={async () => await handleSignup()}
      disabled={isLoading}
    >
      <Icon.Google />
      <span>Sign in with Google</span>
    </Button>
  );
}

export default SigninWithGoogle;
