import React from 'react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface Props {
    title: string;
    className?: string;
    children: React.ReactNode;
}
function CustomerCard({title, children, className}: Props) {

    return (
        <Card>
            <CardHeader className={' py-3 bg-[hsla(210,100%,95%,1)]  max-md:px-3'}>
                <CardTitle className={'text-xl text-gray-900 font-semibold max-sm:text-lg'}>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className={" py-6 gap-4 gap-y-10 max-md:gap-y-4 grid max-md:grid-cols-2 max-sm:grid-cols-1  max-md:px-3 max-md:py-3 " + className}>
                {children}
            </CardContent>
        </Card>

    );
}

export default CustomerCard;