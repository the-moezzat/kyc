import OverflowCard from "@/app/(dashboard)/home/_components/overview-card";
import DataTable from "@/components/data-table";
import Table from "@/app/(dashboard)/home/_components/table/table";

export default function Page() {
    return <div>
        <h1 className={' font-medium text-3xl'}>Home</h1>
        <div className={'grid grid-cols-4 gap-5 mt-12'}>
            <OverflowCard title={"Total"} value={230} color={" text-[hsla(206,100%,50%,1)] bg-[hsla(206,100%,97%,1)]"}/>
            <OverflowCard title={"Pending"} value={60} color={" text-[hsla(40,100%,50%,1)] bg-[hsla(40,100%,89%,1)]  "}/>
            <OverflowCard title={"Approved"} value={160} color={"text-[hsla(145,81%,50%,1)] bg-[hsla(145,81%,96%,1)] "}/>
            <OverflowCard title={"Rejection"} value={10} color={"text-[hsla(316,73%,50%,1)] bg-[hsla(316,73%,97%,1)] "}/>
        </div>
        <Table/>
    </div>
}