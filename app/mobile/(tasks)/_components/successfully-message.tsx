'use client'
import React from 'react';
import Image from "next/image";

function SuccessfullyMessage({message}: {message: string}) {
    return (
        <div className={'flex flex-col gap-4 mt-8 items-center'}>
            <Image alt={'check mark'} src={'/successful.svg'} width={120} height={120}/>
            <h2 className={'text-2xl text-center font-semibold text-gray-900 mt-8'}>
                {message}
            </h2>
        </div>
    );
}

export default SuccessfullyMessage;