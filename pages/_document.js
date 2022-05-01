import { createGetInitialProps } from '@mantine/next';
import Document, { Html, Head, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();
class MyDocument extends Document {
    static getInitialProps = getInitialProps;

    render() {
        return (
            <Html>
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                    <link
                        rel="apple-touch-icon"
                        href="/icon-192x192.png"
                    ></link>
                    <meta name="theme-color" content="#18181b" />
                </Head>
                <body className='dark'>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
