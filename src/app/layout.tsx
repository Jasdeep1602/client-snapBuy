import { Toaster } from 'sonner';
import { Metadata } from 'next';
import './globals.css';
// import ReduxProvider from '@/redux/reduxProvider';
import ReduxTKLayout from './ReduxTKLayout';

export const metadata: Metadata = {
  title: 'snapBuy',
  description: 'snapBuy',
  icons: {
    icon: ['/favicon.ico?v=1'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png'],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <ReduxProvider>
          {children}
        </ReduxProvider> */}
        <Toaster richColors position="top-center" toastOptions={{ duration: 4000 }} />

        <ReduxTKLayout> {children}</ReduxTKLayout>
      </body>
    </html>
  );
}
