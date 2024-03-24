import React from 'react';
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {CheckCircle} from "lucide-react";
import Link from "next/link";

async function Page({params}: {params: {id: string}}) {

    return (
      <div className={'h-dvh grid grid-rows-2 gap-8'}>
        <Image
          src={'/Header.png'}
          alt={'Header'}
          width={375}
          height={200}
          className={' h-full w-full object-cover'}
        />

        <div className={'flex flex-col justify-between p-4'}>
          <div className={'space-y-4'}>
            <h1 className={'text-2xl text-center font-semibold text-gray-900'}>
              Complete Your Umrah KYC
            </h1>
            <p className={'text-sm text-center text-gray-600'}>
              Expected verification time: 2 hours
            </p>
          </div>
          <Link href={`/verify/${params.id}/welcome`} className={'w-full'}>
            <Button size={'lg'} className={'flex gap-2 items-center w-full'}>
              <CheckCircle />
              <span>Start Your Verification</span>
            </Button>
          </Link>
        </div>
      </div>
    );
}

export default Page;