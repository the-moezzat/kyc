'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { CopyCheck, LifeBuoy, Users, Link2, Menu } from 'lucide-react';
import Icon from '@/components/icon';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQuery } from 'react-query';
import Loading from './Loading';
// import {UserButton} from "@clerk/nextjs";

const nav = [
  {
    name: 'Home',
    href: '/home',
    icon: Icon.Home,
  },
  {
    name: 'Applications',
    href: '/applications',
    icon: CopyCheck,
  },
  {
    name: 'Links',
    href: '/links',
    icon: Link2,
  },
  {
    name: 'Team',
    href: '/team',
    icon: Users,
  },
];

export default function Sidebar() {
  // Get current pathname and remove / from the beginning
  const pathname = usePathname().split('/')[1];
  const supabase = createClientComponentClient();

  const { data, isLoading } = useQuery('user', async () =>
    supabase.auth.getUser()
  );

  return (
    <div
      className={
        'border-r py-4 flex flex-col gap-6 items-center max-md:flex-row max-md:justify-between max-md:shadow-sm max-md:border-b max-md:border-r-0 max-md:px-4 max-md:py-2'
      }
    >
      <Link href={'/'}>
        <Image src={'/logo.svg'} alt={'Logo'} width={38} height={38} />
      </Link>

      <nav
        className={
          'flex flex-col text-gray-500 items-center gap-2 max-md:hidden'
        }
      >
        {nav.map((item) => (
          <Link
            key={item.name}
            className={`transition-all p-3 rounded-lg ${
              `/${pathname}` === item.href
                ? 'text-gray-600 bg-[hsla(210,100%,95%,1)]'
                : ''
            }`}
            href={item.href}
          >
            {item.icon ? <item.icon /> : item.name}
          </Link>
        ))}
      </nav>
      <div className={'flex flex-col items-center gap-6 mt-auto max-md:hidden'}>
        <Link href="#" className={'text-gray-500'}>
          <LifeBuoy />
        </Link>
        {/* <UserButton afterSignOutUrl={'/'}/> */}
        {isLoading ? (
          <Loading size={'medium'} type="self" />
        ) : (
          <Avatar>
            <AvatarImage src={data?.data.user?.user_metadata.picture} />
            <AvatarFallback className="bg-primary text-white">
              {data?.data.user?.user_metadata.name.split(' ')[0][0]}
              {data?.data.user?.user_metadata.name.split(' ')[1][0]}
            </AvatarFallback>
          </Avatar>
        )}
      </div>

      <div className={'md:hidden'}>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size={'icon'}
              variant={'outline'}
              className={'text-gray-900'}
            >
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent side={'left'} className={'flex flex-col'}>
            <SheetDescription>
              <nav className={'flex flex-col text-gray-500 gap-2'}>
                {nav.map((item, index) => (
                  <Link
                    key={item.name}
                    className={`transition-all p-3 rounded-lg ${
                      `/${pathname}` === item.href
                        ? 'text-gray-600 bg-[hsla(210,100%,95%,1)]'
                        : ''
                    }`}
                    href={item.href}
                  >
                    {item.icon ? (
                      <span className={'flex gap-4 items-center'}>
                        <item.icon />
                        <span>{item.name}</span>
                      </span>
                    ) : (
                      item.name
                    )}
                  </Link>
                ))}
              </nav>
            </SheetDescription>

            <SheetFooter className={'mt-auto self-start'}>
              <div className={'flex flex-col gap-6'}>
                <Link
                  href="#"
                  className={'text-gray-500 ml-2 flex gap-4 items-center'}
                >
                  <LifeBuoy />
                  <span>Help center</span>
                </Link>
                <div className={'flex gap-2 items-center'}>
                  {/* <UserButton afterSignOutUrl={'/'}/> */}
                  <div className={'flex flex-col'}>
                    <span className={'font-medium text-gray-800'}>
                      Firas El-Mohasen
                    </span>
                    <span className={'font-medium text-gray-500 text-sm'}>
                      firas@gmail.com
                    </span>
                  </div>
                </div>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
