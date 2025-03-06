import { Noto_Sans } from 'next/font/google';
import '../styles/globals.css';
import '../styles/masters/vertical-layout-light/style.css';
import '../styles/feather/feather.css';
import '../styles/masters/vertical-layout-light/vendor.bundle.base.css';
import '../styles/ti-icons/css/themify-icons.css';
import { AppProps } from 'next/app';
import Script from 'next/script';
import { SidebarProvider } from '@/components/SidebarContext';
const notoSans = Noto_Sans({
    weight: ['400', '700'],
    subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
      <SidebarProvider>
        <main className={notoSans.className}>
            <Script src="/js/vendor.bundle.base.js" strategy="lazyOnload" />
            <Component {...pageProps} />
        </main>
        </SidebarProvider>
    );
}

export default MyApp;