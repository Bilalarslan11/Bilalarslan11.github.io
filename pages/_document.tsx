import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html
            lang="en"
            className="scroll-smooth bg-theme-primary"
        >
            <Head>
                {/* Preconnect to external domains for performance */}
                <link
                    rel="preconnect"
                    href="https://fonts.googleapis.com"
                />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />

                {/* Favicon and Apple Touch Icon */}
                <link
                    rel="icon"
                    href="/favicon.ico"
                />
                <link
                    rel="apple-touch-icon"
                    href="/favicon.ico"
                />
                <link
                    rel="manifest"
                    href="/manifest.json"
                />

                {/* Additional Meta Tags */}
                <meta charSet="utf-8" />
                <meta
                    httpEquiv="X-UA-Compatible"
                    content="IE=edge"
                />

                {/* Performance hints */}
                <link
                    rel="dns-prefetch"
                    href="//fonts.googleapis.com"
                />
            </Head>
            <body className="bg-theme-primary">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
