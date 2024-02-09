import React from 'react';
import {FilePdf, Trash} from "@phosphor-icons/react/dist/ssr";
import {Button} from "@/components/ui/button";

interface Props {
    name: string;
    onDelete?: () => void;
}
function File({name, onDelete}: Props) {
    return (
        <div className={'grid grid-cols-[auto,1fr,auto] gap-2 p-2 w-full border rounded-lg'}>
            <FilePdf size={36} />

            <div>
                <p className={'text-gray-900 font-semibold'}>{name}</p>
                <p className={'text-xs text-gray-600'}>Upload complete</p>
            </div>

            <Button variant={'outline'} size={"icon"}  onClick={() => onDelete?.()} className={'self-center text-red-500 text-lg w-8 h-8'}>
                <Trash />
            </Button>
        </div>
    );
}

export default File;