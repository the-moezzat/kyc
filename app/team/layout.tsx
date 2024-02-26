import React from 'react';

function Layout({children}: {children: React.ReactNode}) {
    return (
        <main className={'max-w-screen-2xl mx-auto px-4 h-dvh grid grid-rows-[auto,1fr]'}>
            <header className={'py-4'}>
                <p className={'text-2xl font-bold text-[#1c4133]'}>
                    Sinbad
                </p>
            </header>
            <div className={'self-center justify-self-center'}>
                {children}
            </div>
        </main>
    );
}

export default Layout;