import Icon from "@/components/icon";

interface OverflowCardProps {
    title: string;
    value: number;
    color: string;
}
export default function OverflowCard({title, value, color}: OverflowCardProps) {
    return <div className={'border rounded-xl px-4 py-6 flex gap-4 max-md:px-3 max-md:py-4'}>
        <div className={`w-16 h-16 flex items-center justify-center rounded-full max-md:w-14 max-md:h-14 ${color}`}>
            <Icon.User/>
        </div>
        <div className={'space-y-1 max-md:space-y-0'}>
            <h2 className={'text-xl text-gray-600 max-md:text-lg max-sm:text-base font-medium'}>{title}</h2>
            <p className={'text-3xl text-gray-800 max-md:text-2xl font-medium'}>{value}</p>
        </div>
    </div>
}