import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import '../css/main.css'
import { PiniaStore } from '@/store/store'
import MySVG from '../components/svg'

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  user?: string
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  const title = `Trademark Checker`

  const description = 'Trademark filing for IP Australia'

  const imageWidth = '1920'

  const imageHeight = '960'

  const [pinia, setPinia] = useState({});
  useEffect(()=>{
    const _pinia = JSON.parse(localStorage.getItem('pinia') as string);
    setPinia(_pinia);
  },[])
  useEffect(() => {
    localStorage.setItem('pinia', JSON.stringify(pinia));
  }, [pinia])
  return (
    <>
      {
        getLayout(
          (<>
            <Head>
              <meta name="description" content={description} />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />

              {/* <meta property="og:url" content={url} /> */}
              <meta property="og:site_name" content="ChristianSoh" />
              <meta property="og:title" content={title} />
              <meta property="og:description" content={description} />
              {/* <meta property="og:image" content={image} /> */}
              <meta property="og:image:type" content="image/png" />
              <meta property="og:image:width" content={imageWidth} />
              <meta property="og:image:height" content={imageHeight} />

              <meta property="twitter:card" content="summary_large_image" />
              <meta property="twitter:title" content={title} />
              <meta property="twitter:description" content={description} />
              {/* <meta property="twitter:image:src" content={image} /> */}
              <meta property="twitter:image:width" content={imageWidth} />
              <meta property="twitter:image:height" content={imageHeight} />
              <title> Trade Mark Today </title>
              <link rel="icon" href="/trademarktoday.ico" />
            </Head>

            <Script
              src="https://www.googletagmanager.com/gtag/js?id=UA-130795909-1"
              strategy="afterInteractive"
            />

            <Script id="google-analytics" strategy="afterInteractive">
              {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-130795909-1');
            `}
            </Script>
            <Script src="https://apis.google.com/js/platform.js" async defer></Script>
            <MySVG />
            {/* ****************************************************************** */}
            {/* <div id="main-start-section" className='flex flex-col'>
              <div className='pb-5 flex-grow'>
                <Header /> */}
            <PiniaStore.Provider value={{pinia, setPinia}} >
              <Component {...pageProps} />
            </PiniaStore.Provider>
            {/* </div>
              <Footer />
            </div> */}
            {/* ****************************************************************** */}

          </>)
        )
      }
    </>
  )
}
export default MyApp
