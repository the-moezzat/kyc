'use client';
// import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <NextTopLoader color={'#'} showSpinner={false} /> */}
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}

export default Providers;
