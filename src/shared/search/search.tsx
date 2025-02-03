import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // ✅ Next.js yerine React Router kullanıldı
import { Modal } from 'rizzui';
import SearchTrigger from './search-trigger';
import SearchList from './search-list';

export default function SearchWidget({
  className,
  placeholderClassName,
  icon,
}: {
  className?: string;
  icon?: React.ReactNode;
  placeholderClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  // ✅ Klavye kısayoluyla modal açma işlemi (Ctrl + K veya Cmd + K)
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // ✅ React Router ile sayfa değiştiğinde modal'ı kapatma
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <SearchTrigger
        icon={icon}
        className={className}
        onClick={() => setOpen(true)}
        placeholderClassName={placeholderClassName}
      />

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        overlayClassName="dark:bg-opacity-20 dark:bg-gray-50 dark:backdrop-blur-sm"
        containerClassName="dark:bg-gray-100/90 overflow-hidden dark:backdrop-blur-xl"
        className="z-[9999]"
      >
        <SearchList onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
}
