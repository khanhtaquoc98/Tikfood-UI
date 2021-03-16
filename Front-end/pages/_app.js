import Head from "next/head";
import Router from 'next/router';

//Component
import Header from "../components/FixLayout/Header"
import Footer from "../components/FixLayout/Footer"
import MessengerCustomerChat from 'react-messenger-customer-chat';

export default function MyApp({ Component, pageProps }) {
    
    return (
        <div className="root-app">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
                <meta name="robots" content="index, follow"/>
                <link rel="shortcut icon" href="/images/favicon.ico"></link>
                {/*=============== css  ===============*/}
                <link type="text/css" rel="stylesheet" href="/css/reset.css"></link>
                <link type="text/css" rel="stylesheet" href="/css/plugins.css"></link>
                <link type="text/css" rel="stylesheet" href="/css/style.css"></link>
                <link type="text/css" rel="stylesheet" href="/css/color.css"></link>
                <link type="text/css" rel="stylesheet" href="/css/antd.css"></link>
                <meta name="google-site-verification" content="zBxQ2h4XhS_CFvc8KamWf8pdFh70TA1eSL7i8Xxh1As" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"></script>

               
            </Head>


           {/**
            <div className="loader-wrap" style={{}}>
                <div className="loader-inner">
                    <div className="loader-inner-cirle" />
                </div>
            </div> */}

            <div id="main">
                <Header />
                <Component {...pageProps} />
                <Footer/>
                <MessengerCustomerChat
                    pageId="108284747204125"
                    appId="2251745455138451"
                />
                <a className="to-top"><i className="fas fa-caret-up" /></a>

            </div>
    
                   
            <script src="/js/jquery.min.js"></script>
            <script src="/js/plugins.js"></script>
            <script src="/js/scripts.js"></script>
            <script src="/js/map-single.js"></script> 
        </div>
    )
}