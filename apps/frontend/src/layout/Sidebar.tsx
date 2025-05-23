import React from 'react';
import { NavigationMenu, Separator } from 'radix-ui';
import { Link } from 'react-router';
import UserCard from '@/components/UserCard';
import { internalRoutes } from '@/routes/internalRoutes';

export default function Sidebar() {
  return (
    <header className="flex h-screen fixed w-1/6 p-2 flex-col gap-2 items-center bg-slate-50 shadow-black drop-shadow-sm dark:bg-slate-900">
      <UserCard />
      {internalRoutes.map((routeSection) => (
        <React.Fragment key={routeSection.section}>
          {routeSection.section !== 'Base' && (
            <>
              <Separator.Root
                decorative
                orientation="horizontal"
                className="mx-2 w-full bg-slate-200 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px"
              />
              <span className="text-xs w-full px-2 text-slate-500">
                {routeSection.section}
              </span>
            </>
          )}
          <NavigationMenu.Root
            className="px-2 text-sm w-full"
            orientation="vertical"
          >
            <NavigationMenu.List>
              {routeSection.items.map((item) => (
                <NavigationMenu.Link asChild key={item.label}>
                  <Link
                    to={item.path}
                    className="py-1 transition-all font-medium w-full rounded-sm flex cursor-default flex-row items-center gap-2 px-4 hover:bg-gray-200 focus:outline-none"
                  >
                    {<item.icon />}
                    {item.label}
                  </Link>
                </NavigationMenu.Link>
              ))}
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </React.Fragment>
      ))}
    </header>
  );
}
