import {
  berylliumMenuItemAtom,
  berylliumMenuItems,
  MenuItemsType,
} from './beryllium-fixed-menu-items';
import {
  getActiveMainMenuIndex,
  useBerylliumSidebars,
} from './beryllium-utils';
import { useWindowSize } from '../../hooks/use-window-size';
import cn from '../../utils/class-names';
import { useAtom, useSetAtom } from 'jotai';
import { useLocation } from 'react-router-dom'; // ✅ Next.js yerine React Router kullanıldı
import { useEffect } from 'react';
import { PiTextIndent } from 'react-icons/pi';
import { ActionIcon } from 'rizzui';

function MenuItem({ menu }: { menu: MenuItemsType }) {
  const { expandedLeft, setExpandedLeft } = useBerylliumSidebars();
  const [menuItems, setMenuItems] = useAtom(berylliumMenuItemAtom);
  const Icon = menu.icon;

  const isActive = menuItems === menu;

  function handleClick() {
    setMenuItems(menu);
    if (!expandedLeft) {
      setExpandedLeft(true);
    }
  }

  return (
    <li
      onClick={handleClick}
      className="group flex cursor-pointer flex-col items-center gap-1.5 pb-1.5"
    >
      <span
        className={cn(
          'rounded-3xl bg-gray-0/0 px-4 py-2 text-white transition-colors duration-200 group-hover:bg-gray-0 group-hover:text-gray-900 dark:group-hover:bg-gray-100',
          isActive && 'bg-gray-0 text-gray-900 dark:bg-gray-100'
        )}
      >
        <Icon className="h-auto w-6" />
      </span>
      <span className="text-white">{menu.name}</span>
    </li>
  );
}

function MenuItems() {
  return (
    <menu className="flex w-full justify-center">
      <div className="custom-scrollbar overflow-y-auto scroll-smooth h-[calc(100vh_-_105px)] w-full pb-5">
        <ul className="flex flex-col gap-6">
          {berylliumMenuItems.map((menu) => (
            <MenuItem key={menu.id} menu={menu} />
          ))}
        </ul>
      </div>
    </menu>
  );
}

export default function BerylliumLeftSidebarFixed() {
  const location = useLocation();
  const { width } = useWindowSize();
  const setMenuItems = useSetAtom(berylliumMenuItemAtom);
  const { expandedLeft, setExpandedLeft } = useBerylliumSidebars();

  useEffect(() => {
    const activeMenuIndex = getActiveMainMenuIndex(
      location.pathname,
      berylliumMenuItems
    );
    setMenuItems(berylliumMenuItems[activeMenuIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (width < 1536) {
      setExpandedLeft(false);
    } else {
      setExpandedLeft(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, location.pathname]);

  return (
    <aside className="fixed start-0 top-0 z-50 hidden h-screen w-[88px] flex-col items-center gap-10 bg-gray-900 py-3.5 dark:bg-gray-0 xl:flex">
      <ActionIcon
        aria-label="open sidebar"
        variant="text"
        className="rounded-full bg-transparent text-white transition-colors hover:bg-gray-300 hover:enabled:text-gray-900"
        size="xl"
        onClick={() => setExpandedLeft(!expandedLeft)}
      >
        <PiTextIndent className="h-auto w-9" />
      </ActionIcon>
      <MenuItems />
    </aside>
  );
}
