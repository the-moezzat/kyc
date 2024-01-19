import Sidebar from "@/components/sidebar";
import React from "react";

export default  function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className={'grid grid-cols-[64px,1fr] h-screen max-w-screen-2xl mx-auto overflow-hidden  max-md:grid-cols-1 max-md:grid-rows-[64px,1fr] '}>
            <Sidebar/>
            <div className={' overflow-auto p-8 max-md:p-4 max-sm:p-2'}>
                {children}
            </div>
        </div>
    );
}