import Icon from "@/components/icon";

interface OverflowCardProps {
    title: string;
    value: number;
    color: string;
}
export default function OverflowCard({title, value, color}: OverflowCardProps) {
    return <div className={'border rounded-xl px-4 py-6 flex gap-4'}>
        <div className={`w-16 h-16 flex items-center justify-center rounded-full ${color}`}>
            <Icon.User/>
        </div>
        <div className={'space-y-1'}>
            <h2 className={'text-xl text-gray-600 font-medium'}>{title}</h2>
            <p className={'text-3xl text-gray-800 font-medium'}>{value}</p>
        </div>
    </div>
}