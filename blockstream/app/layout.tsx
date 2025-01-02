'use client'

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>TON Connect Demo</title>
      </head>
      <body>
        <TonConnectUIProvider manifestUrl="https://eldertree17.github.io/blockstream/images/logo.png">
        {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
