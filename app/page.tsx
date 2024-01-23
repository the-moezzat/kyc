import Sidebar from "@/components/sidebar";
import Link from "next/link";
import {DeviceMobile, House} from "@phosphor-icons/react/dist/ssr";

 export default  function Page() {
  return (
    <div className={'grid grid-cols-[64px,1fr] h-dvh overflow-hidden  max-md:grid-cols-1 max-md:grid-rows-[64px,1fr] '}>
        <Sidebar/>
        <div className={'overflow-auto max-w-screen-2xl mx-auto p-8 flex items-center justify-center'}>
            <div className={"flex gap-4 max-md:flex-col"}>
            <Link href={"/mobile"} className={"border p-4 rounded-lg flex flex-col gap-2 items-center justify-center"}>
                <DeviceMobile size={42} className={'text-blue-500'} />
                <span className={'text-base text-gray-600 font-medium'}>
                    Mobile app
                </span>

            </Link>
            <Link href={"/home"} className={"border p-4 rounded-lg flex flex-col gap-2 items-center justify-center"}>
                <House size={42} className={'text-green-500'} />
                <span className={'text-base text-gray-600 font-medium'}>
                  Dashboard
                </span>

            </Link>
            </div>
        </div>
    </div>
  );
}