import type { AppProps } from 'next/app'
import { ReactElement } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TMCheckLayout = (page: ReactElement,pageProps:AppProps) => {
    return (
        <div id="main-start-section" className='flex flex-col'>
            <div className='pb-5 flex-grow'>
                <Header />
                {page}
            </div>
            <Footer />
        </div>
    )
}
export default TMCheckLayout;