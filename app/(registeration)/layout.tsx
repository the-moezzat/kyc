import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-screen-md flex items-center justify-center mx-auto h-dvh">
      {children}
    </main>
  );
}

export default Layout;
