'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import React from 'react';

interface Props {
  text: string;
}

export default function CopiedLink({ text }: Props) {
  const [isCopied, setIsCopied] = React.useState(false);
  const baseUrl = `${window.location.protocol}//${window.location.host}`;

  const link = `${baseUrl}/verify/${text}`;

  React.useEffect(
    function () {
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    },
    [isCopied]
  );

  const handleCopyLink = (text: string) => {
    // copy text to clipboard
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
      })
      .catch((error) => {
        console.error('Failed to copy text:', error);
      });
  };

  return (
    <div
      className={
        ' w-fit gap-4 px-4 py-1 pr-1 flex items-center font-medium text-blue-800 bg-blue-100/80 rounded-full'
      }
    >
      <Link href={link} target={'_blank'}>
        {link.length > 10 ? link.slice(0, 35) + '...' : link}
      </Link>
      <Button
        variant={'outline'}
        size={'sm'}
        className={
          'w-7 h-7 p-0 bg-transparent shrink-0 border-blue-300 rounded-full'
        }
        onClick={() => handleCopyLink(link)}
      >
        {isCopied ? <Check size={14} /> : <Copy size={14} />}
      </Button>
    </div>
  );
}
