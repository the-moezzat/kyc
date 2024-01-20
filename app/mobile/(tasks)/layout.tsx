import React from 'react';
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

function Layout({children}: {children: React.ReactNode}) {
    return (
        <main className={"p-4 h-dvh"}>
            <header className={"flex w-full items-center justify-between"}>
                <Link href={"#"} className={"text-blue-500 text-sm font-medium"}>Support</Link>
                <Avatar className={"w-8 h-8"}>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </header>

            {children}
        </main>
    );
}

export default Layout;