import { Link } from 'react-router-dom'; // React Router'a uygun Link kullanımı
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Button, Typography } from '@mui/material'; // Material UI kullanımı
import { PiAppleLogoFill, PiArrowLeftBold } from 'react-icons/pi';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';

// Logo dosyalarınızı import edin
import logoImg from '../../../public/logo-primary.svg';
import logoImgText from '../../../public/logo-primary-text.svg';

export default function AuthWrapperOne({
  children,
  title,
  bannerTitle,
  bannerDescription,
  description,
  pageImage,
  isSocialLoginActive = false,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  description?: string;
  bannerTitle?: string;
  bannerDescription?: string;
  pageImage?: React.ReactNode;
  isSocialLoginActive?: boolean;
}) {
  function handleSignIn() {
    toast.error(
      <Typography>
        Bu sadece demo içindir.{' '}
        <strong style={{ fontWeight: 'bold', color: '#333' }}>Giriş Yap</strong>{' '}
        butonuna basarak giriş yapabilirsiniz.
      </Typography>
    );
  }

  return (
    <>
      {/* Ana sayfaya dönüş butonu */}
      <Link
        to="/"
        className="sticky start-0 top-0 z-20 flex items-center justify-center bg-blue p-3.5 text-sm font-medium text-white md:p-4 lg:hidden"
      >
        <PiArrowLeftBold />
        <Typography className="ms-1 font-lexend">Ana Sayfaya Dön</Typography>
      </Link>

      <div className="min-h-screen flex justify-between gap-x-8 px-4 py-8 lg:p-6 xl:gap-x-10 2xl:p-10">
        <div className="relative flex w-full items-center justify-center lg:w-5/12 2xl:pe-24">
          <div className="w-full max-w-sm md:max-w-md lg:py-7 lg:ps-3 2xl:w-[630px]">

            {/* Ana sayfaya dönüş linki */}
            <Link
              to="/"
              className="absolute -top-4 start-0 hidden p-3 text-gray-500 hover:text-gray-700 lg:flex lg:items-center"
            >
              <PiArrowLeftBold />
              <b className="ms-1 font-medium">Ana Sayfaya Dön</b>
            </Link>

            <div className="mb-7 px-6 text-center lg:px-0 lg:text-start">
              {/* Logo */}
              <Link to="/" className="mb-6 inline-flex max-w-[168px] xl:mb-8">
                <LazyLoadImage src={logoImg} alt="Isomorphic" effect="blur" />
                <LazyLoadImage
                  src={logoImgText}
                  alt="Isomorphic"
                  effect="blur"
                  className="ps-2.5 dark:invert"
                />
              </Link>

              {/* Başlık */}
              <Typography variant="h4" className="mb-5 text-[26px] leading-snug">
                {title}
              </Typography>

              {/* Açıklama */}
              <Typography className="text-gray-700">
                {description}
              </Typography>
            </div>

            {/* Sosyal Giriş */}
            {isSocialLoginActive && (
              <>
                <div className="grid grid-cols-1 gap-4 pb-5 md:grid-cols-2">
                  <Button
                    onClick={handleSignIn}
                    variant="outlined"
                    startIcon={<PiAppleLogoFill />}
                    className="h-11 w-full"
                  >
                    Apple ile Giriş Yap
                  </Button>
                  <Button
                    onClick={handleSignIn}
                    variant="outlined"
                    startIcon={<FcGoogle />}
                    className="h-11 w-full"
                  >
                    Google ile Giriş Yap
                  </Button>
                </div>
              </>
            )}

            {children}
          </div>
        </div>

        {/* Sağ Taraf - Görsel ve Açıklama */}
        <div className="hidden w-7/12 items-center justify-center bg-gray-50 px-6 lg:flex">
          <div className="pb-8 pt-10 text-center xl:pt-16">
            <div className="mx-auto mb-10 max-w-sm pt-2">
              <Typography variant="h4" className="mb-5 font-semibold">
                {bannerTitle}
              </Typography>
              <Typography className="text-gray-700">
                {bannerDescription}
              </Typography>
            </div>
            {pageImage}
          </div>
        </div>
      </div>
    </>
  );
}
