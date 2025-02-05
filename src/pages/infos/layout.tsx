import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'rizzui';
import cn from '../../utils/class-names';
import SocialItems from '../../ui/social-shares';
import { siteConfig } from '../../config/site_config';
import { routes } from '../../config/routes';

const ignoreBackButtonRoutes = [routes.accessDenied, routes.notFound];

export default function OtherPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate(); // ✅ `useRouter` yerine `useNavigate` kullanıldı.
  const location = useLocation(); // ✅ `usePathname` yerine `useLocation` kullanıldı.

  let notIn = !ignoreBackButtonRoutes.includes(location.pathname);

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] dark:bg-gray-50">
      {/* sticky top header  */}
      <div className="sticky top-0 z-40 px-6 py-5 backdrop-blur-lg lg:backdrop-blur-none xl:px-10 xl:py-8">
        <div
          className={cn(
            'mx-auto flex max-w-[1520px] items-center',
            notIn ? 'justify-between' : 'justify-center'
          )}
        >
          <Link to={'/'}>
            {/* ✅ `next/image` yerine standart `<img>` etiketi kullanıldı */}
            <img
              src={siteConfig.logo}
              alt={siteConfig.title}
              className="dark:invert h-auto w-32"
              loading="lazy"
            />
          </Link>
          {notIn && (
            <Button
              variant="outline"
              size="sm"
              className="md:h-10 md:px-4 md:text-base"
              onClick={() => navigate(-1)} // ✅ `back()` yerine `navigate(-1)` kullanıldı.
            >
              Go to home
            </Button>
          )}
        </div>
      </div>
      {children}
      <SocialItems />
    </div>
  );
}
