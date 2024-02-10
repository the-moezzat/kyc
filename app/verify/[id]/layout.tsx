import React from 'react';

function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className={"max-w-screen-sm mx-auto h-screen"}>
            {children}
        </div>
    );
}

export default Layout;