import React from 'react';
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

function Layout({children}: {children: React.ReactNode}) {
    return (
        <main className={"h-dvh grid grid-rows-[64px,1fr]"}>
            <header className={"flex w-full p-4 items-center justify-between"}>
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