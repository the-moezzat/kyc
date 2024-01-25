import React from 'react';
import StartVerification from "@/app/mobile/(tasks)/_components/start-verification";
import Image from "next/image";
import { Button } from '@/components/ui/button';

function Page() {
    return (
        <div className={'flex flex-col h-full py-8'}>
            <StartVerification title={'Verify Your Employment'} icon={<Image src={'/office.png'} alt={'bank icon'} width={62} height={62}/>}/>

            <div className={'mt-auto space-y-2 text-center'}>
                <Button size={'lg'} className={'w-full'} >Verify instantly</Button>
                <p className={"text-xs text-gray-400"}>By continuing, you agree to the terms & privacy policy</p>
            </div>
        </div>
    );
}

export default Page;