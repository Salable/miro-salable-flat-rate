import "./global.css";
import React, {PropsWithChildren} from 'react';
import Script from 'next/script';
import {MiroSDKInit} from '../components/SDKInit';
import {Footer} from "../components/footer";

export default async function RootLayout({children}: PropsWithChildren) {
  return (
    <html>
    <body className='w-full'>
      <Script
        src="https://miro.com/app/static/sdk/v2/miro.js"
        strategy="beforeInteractive"
      />
      <MiroSDKInit />
      <div className='flex flex-col min-h-screen w-full'>
        <div className="grid">
          <div className="cs1 ce12">{children}</div>
        </div>
        <Footer />
      </div>
    </body>
    </html>
  );
}