"use client"
import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import TermsItem from "@/app/verify/[id]/signature/_components/terms-item";
import {ScrollArea} from "@/components/ui/scroll-area";

const terms = ["You have a salary of at least $500", "You will not violate your visa terms and stay beyond 3 months from day of arrival", "You will be liable to charges and penalty fees in your home country if you violate the visa terms", "This is a legally binding document in your home country."];

function Page({ params }: { params: { id: string } }) {
  const [checkedBoxes, setCheckedBoxes] = React.useState<boolean[]>([]);

  return (
    <div
      className={
        'items-center h-dvh grid grid-rows-[auto,1fr,auto] gap-6 p-4 w-full'
      }
    >
      <h1 className={'text-2xl font-bold text-center text-gray-900'}>
        Signature
      </h1>

      <ScrollArea
        className={
          'w-full flex gap-2 flex-col items-center justify-center overflow-auto h-full'
        }
      >
        <p className={'text-sm text-gray-500 text-center mb-4'}>
          You will sign a document acknowledging and confirming the followings
          sets of information.
        </p>

        {terms.map((term) => (
          <TermsItem
            key={term}
            text={term}
            onCheck={(checkedState) => {
              console.log(checkedState);
              if (checkedState) setCheckedBoxes((state) => [...state, true]);
              else
                setCheckedBoxes((state) =>
                  state.filter((_, index) => index !== checkedBoxes.length - 1)
                );
            }}
          />
        ))}
      </ScrollArea>

      <div className={'flex items-center justify-between w-full'}>
        <Link href={`/verify/${params.id}/nationality`}>
          <Button variant={'ghost'} size={'lg'}>
            {' '}
            Back{' '}
          </Button>
        </Link>
        <Link href={`/verify/${params.id}/tasks`}>
          <Button size={'lg'} disabled={!(checkedBoxes.length >= terms.length)}>
            I Confirm
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Page;