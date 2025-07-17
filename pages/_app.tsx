import "@/styles/globals.css";
import "@/styles/base.css";
import "@/styles/navigation.css";
import "@/styles/components.css";
import "@/styles/game-cards.css";
import "@/styles/utilities.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
