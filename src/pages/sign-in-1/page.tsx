import { LazyLoadImage } from 'react-lazy-load-image-component'; // React için Lazy Load Image eklendi
import SignInForm from './sign-in-form';
import AuthWrapperOne from '../../shared/auth-layout/auth-wrapper-one';
import UnderlineShape from '../../components/shape/underline';
import { metaObject } from '../../config/site_config';
import { FaHeart } from "react-icons/fa";

export const metadata = {
  ...metaObject('Sign In 1'),
};

export default function SignIn() {
  return (
    <AuthWrapperOne
      title={
        <>
          GÜNAYDIN SONSUZ... SEVDİĞİM{' '}
          <span className="relative inline-block">
            LALEM HANIMIM KOÇUMM
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-24 text-blue md:w-28 xl:-bottom-1.5 xl:w-36" />
          </span>{' '}
          sonunda entegrede bir çok sorunu aştımmmmm, AŞKIMMM <FaHeart color='red' /> <FaHeart color='red' /> <FaHeart color='red' /> ...
        </>
      }
      description="Siyah saçların, kısa ve küt,
Her telinde bir hatıra, bir ömür büt.
Çocukluğumun masalı, gözlerindeki ışık,
Sensiz geçen her an, bir yürek sızısı.

Lale'm, sen benim ilk baharımsın,
Gülüşünle açan, sevginle büyüyen bahçemsin.
Sonsuz bir sevda bu, ömrümce sürecek,
Adın kalbimde, her nefeste çiçek açacak."
      bannerTitle="Bazen çok çok çok çabalarsın ufacık şeyler için...."
      bannerDescription="Sonuçta birileri yaptı bunu, deneme devammm..."
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
