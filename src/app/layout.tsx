import React, {PropsWithChildren} from 'react';
import Image from 'next/image';
import Script from 'next/script';

import congratulations from '../assets/congratulations.png';
import {SDKUsageDemo} from '../components/SDKUsageDemo';
import {MiroSDKInit} from '../components/SDKInit';

export default function RootLayout({children}: PropsWithChildren) {
  return (
    <html>
      <body>
        <Script
          src="https://miro.com/app/static/sdk/v2/miro.js"
          strategy="beforeInteractive"
        />
        <MiroSDKInit />
        <div id="root">
          <div className="grid">
            <div className="cs1 ce12">
              <Image src={congratulations} alt="" />
              <h1>Congratulations!</h1>
              <p>You've just created your first Miro app!</p>
            </div>
            <div className="cs1 ce12">
              <SDKUsageDemo />
            </div>
            <hr className="cs1 ce12" />
            <div className="cs1 ce12">{children}</div>
            <hr className="cs1 ce12" />
            <div className="cs1 ce12">
              <p>
                To explore more and build your own app, see the Miro Developer
                Platform documentation.
              </p>
              <a
                className="button button-secondary"
                target="_blank"
                href="https://developers.miro.com"
              >
                Read the documentation
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
