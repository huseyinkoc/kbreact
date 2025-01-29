import logoImg from '../../public/logo.svg';
import logoIconImg from '../../public/logo-short.svg';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Isomorphic - React TypeScript Admin Dashboard Template',
  description: `Isomorphic is the ultimate React TypeScript Admin Template. Streamline your admin dashboard development with our feature-rich, responsive, and highly customizable solution. Boost productivity and create stunning admin interfaces effortlessly.`,
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: 'HYDROGEN', // React'te doğrudan ENUM kullanmak yerine string olarak tanımladık.
  // TODO: favicon
};

export const metaObject = (title?: string, description: string = siteConfig.description) => ({
  title: title ? `${title} - Isomorphic Furyroad` : siteConfig.title,
  description,
  openGraph: {
    title: title ? `${title} - Isomorphic Furyroad` : siteConfig.title,
    description,
    url: 'https://isomorphic-furyroad.vercel.app',
    siteName: 'Isomorphic Furyroad',
    images: [
      {
        url: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
});
