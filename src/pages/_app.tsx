import type { AppProps } from 'next/app';

import '../styles/global.css';

const TestTaskApp = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
};

export default TestTaskApp;