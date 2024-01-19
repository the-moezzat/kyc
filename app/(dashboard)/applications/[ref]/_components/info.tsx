import React from 'react';

interface Props {
 title: string;
    children: React.ReactNode;
}
function Info({title, children}: Props) {
    return (
        <div className={'flex flex-col gap-1'}>
            <h3 className={'text-gray-600 text-lg font-semibold'}>{title}</h3>
            <span className={'text-gray-900 font-semibold text-xl'}>
            {children}
            </span>
        </div>
    );
}

export default Info;