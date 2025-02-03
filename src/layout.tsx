import { Toaster } from 'react-hot-toast';
import GlobalDrawer from './shared/drawer-views/container';
import GlobalModal from './shared/modal-views/container';
import { JotaiProvider, ThemeProvider } from './shared/theme-provider';
import { siteConfig } from './config/site_config';
import { inter, lexendDeca } from './fonts';
import cn from './utils/class-names';
import NextProgress from './components/next-progress';

// styles
import 'swiper/css';
import 'swiper/css/navigation';
import './index.css';
import { AuthProvider } from './context/AuthProvider';

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      // required this one for next-themes, remove it if you are not using next-theme
      suppressHydrationWarning
    >
      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, 'font-inter')}
      >
        <AuthProvider>
          <ThemeProvider>
            <NextProgress />
            <JotaiProvider>
              {children}
              <Toaster />
              <GlobalDrawer />
              <GlobalModal />
            </JotaiProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
