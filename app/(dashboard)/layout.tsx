import Sidebar from "@/components/sidebar";
import React from "react";

export default  function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className={'grid grid-cols-[64px,1fr] h-screen max-w-screen-2xl mx-auto overflow-hidden'}>
            <Sidebar/>
            <div className={' overflow-auto p-8'}>
                {children}
            </div>
        </div>
    );
}