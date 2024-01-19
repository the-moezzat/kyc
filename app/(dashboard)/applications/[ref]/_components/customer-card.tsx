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
            <CardHeader className={' py-3 bg-[hsla(210,100%,95%,1)]'}>
                <CardTitle className={'text-xl text-gray-900 font-semibold'}>

                    {title}

                </CardTitle>
            </CardHeader>
            <CardContent className={" py-6 gap-4 grid " + className}>
                {children}
            </CardContent>
        </Card>

    );
}

export default CustomerCard;