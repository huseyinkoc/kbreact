import { LazyLoadImage } from 'react-lazy-load-image-component'; // React için Lazy Load Image eklendi
import SignInForm from './sign-in-form';
import AuthWrapperOne from '../../shared/auth-layout/auth-wrapper-one';
import UnderlineShape from '../../components/shape/underline';
import { metaObject } from '../../config/site_config';

export const metadata = {
  ...metaObject('Sign In 1'),
};

export default function SignIn() {
  return (
    <AuthWrapperOne
      title={
        <>
          AYSTEK React CMS{' '}
          <span className="relative inline-block">
            Üye Girişi yapın
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-24 text-blue md:w-28 xl:-bottom-1.5 xl:w-36" />
          </span>{' '}
        </>
      }
      description="Kaydolarak, özel içeriklere, özel tekliflere erişim kazanacak ve heyecan verici haber ve güncellemelerden ilk siz haberdar olacaksınız."
      bannerTitle="Çalışma alanınızı yönetmenin en basit yolu"
      bannerDescription="Anlaşılır, kolay ve zamandan kazanç"
      isSocialLoginActive={true}
      pageImage={
        <div className="relative mx-auto aspect-[4/3.37] w-[500px] xl:w-[620px] 2xl:w-[820px]">
          <LazyLoadImage
            src="https://isomorphic-furyroad.s3.amazonaws.com/public/auth/sign-up.webp"
            alt="Sign Up Thumbnail"
            //effect="blur" // Lazy Load ile bulanık açılış efekti
            className="object-cover"
          />
        </div>
      }
    >
      <SignInForm />
    </AuthWrapperOne>
  );
}
