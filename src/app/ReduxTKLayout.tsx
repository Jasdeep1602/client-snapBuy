'use client';

import './globals.css';
import ReduxProvider from '@/redux/reduxProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
