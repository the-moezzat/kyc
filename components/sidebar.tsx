import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Sidebar() {
    return (
        <div className={'border-r p-2 flex flex-col justify-between'}>
            <nav className={'flex flex-col'}>
                <a href="#" className={''}>Home</a>
                <a href="#" className={''}>About</a>
                <a href="#" className={''}>Contact</a>
                <a href="#" className={''}>Blog</a>
                <a href="#" className={''}>Careers</a>
            </nav>

            <div className={'flex flex-col gap-6'}>
                <a href="#" className={''}>Login</a>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}