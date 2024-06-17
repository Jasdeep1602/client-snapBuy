'use client';

import { Toaster } from 'sonner';

import './globals.css';
import ReduxProvider from '@/redux/reduxProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
          <Toaster richColors position="top-center" />
        </ReduxProvider>
      </body>
    </html>
  );
}
