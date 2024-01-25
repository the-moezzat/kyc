import React from 'react';
import {LockIcon, Shield, Zap} from "lucide-react";
import {Separator} from "@/components/ui/separator";

interface Props {
    title: string;
    icon: React.ReactNode;
}

function StartVerification({title, icon}: Props) {
    return (
        <div>
            <div className={'flex gap-4 items-center flex-col justify-center'}>
                    {icon}
                <h2 className={'text-2xl text-gray-900 font-bold'}>
                    {title}
                </h2>
            </div>

            <div className={'flex flex-col gap-4 mt-8'}>
                <StartVerificationItem title={"Secure"} icon={<Shield size={18}/>} description={`You're protected with industry-standard security and encryption.`}/>

                <Separator orientation={'horizontal'} className={'w-10/12 self-center'}/>

                <StartVerificationItem title={"Private"} icon={<LockIcon size={18}/>} description={`Company won't have access to your login credentials`}/>

                <Separator orientation={'horizontal'} className={'w-10/12 self-center'}/>

                <StartVerificationItem title={"instant"} icon={<Zap size={18}/>} description={`This process should take a few minutes`}/>
            </div>

        </div>
    );
}

const StartVerificationItem = ({title,description, icon}: {title: string, description:string, icon: React.ReactNode}) => {
    return (
            <div className={'flex gap-3 items-start'}>
                <div className={'text-gray-900'}>
                    {icon}
                </div>
                <div className={'flex flex-col gap-1.5'}>
                    <h2 className={'text-base text-gray-900 font-medium leading-none '}>
                        {title}
                    </h2>
                    <p className={'text-sm text-gray-500'}>
                        {description}
                    </p>
                </div>
            </div>)
}

export default StartVerification;