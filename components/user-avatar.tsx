'use client'
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuPortal,
    DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/types/db";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

interface Props {
    picture: string;
    name: string;
}
function UserAvatar({picture, name}: Props) {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter();
    function handleSignOut() {
        toast.promise(async () => await supabase.auth.signOut(), {
            loading: 'Logging out...',
            success: () => {
                router.refresh();
                return 'Logged out'
            },
            error: 'An error occurred. Please try again.',
            duration: 300
        });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={picture} />
                    <AvatarFallback className="bg-primary text-white">
                        {name.split(' ')[0][0]}
                        {name.split(' ')[1][0]}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" alignOffset={8} side={'right'} align={'end'}  >
                <DropdownMenuLabel>{name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Settings
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Email</DropdownMenuItem>
                                <DropdownMenuItem>Message</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>More...</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                        New Team
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className={'text-red-700 focus:bg-red-100 focus:text-red-700 cursor-pointer'} onClick={() => handleSignOut()}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserAvatar;