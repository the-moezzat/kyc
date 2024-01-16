'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";
import {CopyCheck, LifeBuoy, Users, Link2 } from "lucide-react";
import Icon from "@/components/icon";
import {usePathname} from "next/navigation";
import Image from "next/image";

const nav = [{
    name: 'Home',
    href: 'home',
    icon: Icon.Home
}, {
    name: 'Applications',
    href: 'applications',
    icon: CopyCheck
}, {
    name: 'Links',
    href: 'links',
    icon: Link2
}, {
    name: 'Team',
    href: 'team',
    icon: Users
}]

export default function Sidebar() {
    // Get current pathname and remove / from the beginning
    const pathname = usePathname().split("/")[1]

    console.log(pathname)

    return (
        <div className={'border-r py-4 flex flex-col gap-6 items-center'}>
            <Link href={"/"}>
                <Image src={"/logo.svg"} alt={"Logo"} width={38} height={38} />
            </Link>
            <nav className={'flex flex-col text-gray-500 items-center gap-2'}>
                {nav.map((item, index) => (
                    <Link
                        key={item.name}
                        className={`transition-all p-3 rounded-lg ${pathname === item.href ? 'text-gray-600 bg-[hsla(210,100%,95%,1)]' : ""}`}
                        href={item.href}
                    >
                    {item.icon ? <item.icon /> : item.name}
                </Link>))}

            </nav>

            <div className={'flex flex-col items-center gap-6 mt-auto'}>
                <Link href="#" className={'text-gray-500'}>
                    <LifeBuoy />
                </Link>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}