'use client';
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
  SheetTrigger,
} from '@/components/ui/sheet';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQuery } from 'react-query';
import Loading from './Loading';
import {Database} from "@/types/db";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserAvatar from "@/components/user-avatar";


export default function Sidebar({teamId}: {teamId: string}) {
  const nav = [
    {
      name: 'Home',
      href: `/dashboard/${teamId}`,
      icon: Icon.Home,
    },
    {
      name: 'Applications',
      href: `/dashboard/${teamId}/applications`,
      icon: CopyCheck,
    },
    {
      name: 'Links',
      href: `/dashboard/${teamId}/links`,
      icon: Link2,
    },
    {
      name: 'Team',
      href: `/dashboard/${teamId}/team`,
      icon: Users,
    },
  ];

  const pathname = usePathname();

  const supabase = createClientComponentClient<Database>();

  const { data, isLoading } = useQuery('user', async () => {
      const {data} = await supabase.from('profiles').select('*').single();

      return data
    }
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
              `${pathname}` === item.href
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
        {isLoading ? (
          <Loading size={'medium'} type="self" />
        ) : (
            <UserAvatar name={data?.full_name || ''} picture={data?.avatar_url || ''}/>
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
                      `${pathname}` === item.href
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
                {isLoading ? (
                    <Loading size={'medium'} type="self" />
                ) : (
                    <div className={'flex gap-2 items-center'}>
                      <UserAvatar name={data?.full_name || ''} picture={data?.avatar_url || ''}/>
                    <div className={'flex flex-col'}>
                    <span className={'font-medium text-gray-800'}>
                      {data?.full_name}
                    </span>
                        <span className={'font-medium text-gray-500 text-sm'}>
                      {data?.email}
                    </span>
                      </div>
                    </div>
                )}

              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
