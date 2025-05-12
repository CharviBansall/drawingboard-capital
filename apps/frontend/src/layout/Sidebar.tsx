import { NavigationMenu, Separator } from 'radix-ui';
import { Link } from 'react-router';
import UserCard from '../components/UserCard';
import {
  Briefcase,
  Cards,
  CreditCard,
  HandCoins,
  House,
  Money,
  Notebook,
  Polygon,
  Scroll,
  Swap,
  UserList,
} from '@phosphor-icons/react';

export default function Sidebar() {
  const baseItems = [
    { label: 'Home', icon: <House />, link: '/home' },
    { label: 'Portfolio', icon: <Briefcase />, link: '/portfolio' },
    { label: 'Capital Calls', icon: <HandCoins />, link: '/capital-calls' },
  ];
  const investmentItems = [
    { label: 'Funds', icon: <Cards />, link: '/funds' },
    { label: 'Secondaries', icon: <Swap />, link: '/secondaries' },
  ];
  const dealItems = [
    { label: 'Co-Investments', icon: <Polygon />, link: '/co-investments' },
    { label: 'Private Equity', icon: <Money />, link: '/private-credit' },
    { label: 'Private Credit', icon: <CreditCard />, link: '/private-credit' },
  ];
  const researchItems = [
    { label: 'Market Insights', icon: <Scroll />, link: '/market-insights' },
    { label: 'Fund Reports', icon: <Notebook />, link: '/fund-reports' },
    {
      label: 'Manager Profiles',
      icon: <UserList />,
      link: '/manager-profiles',
    },
  ];

  return (
    <header className="flex h-screen fixed w-1/6 p-2 flex-col gap-2 items-center bg-slate-50 shadow-black drop-shadow-sm dark:bg-slate-900">
      <UserCard />
      <NavigationMenu.Root
        className="px-2 text-sm w-full"
        orientation="vertical"
      >
        <NavigationMenu.List className="">
          {baseItems.map((item) => (
            <NavigationMenu.Link asChild key={item.label}>
              <Link
                to={item.link}
                className="py-1 transition-all font-medium w-full rounded-sm flex cursor-default flex-row items-center gap-2 px-4 hover:bg-gray-200 focus:outline-none"
              >
                {item.icon}
                {item.label}
              </Link>
            </NavigationMenu.Link>
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
      <Separator.Root
        decorative
        orientation="horizontal"
        className="mx-2 w-full bg-slate-200 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px"
      />
      <span className="text-xs w-full px-2 text-slate-500">Alternatives</span>
      <NavigationMenu.Root
        className="px-2 text-sm w-full"
        orientation="vertical"
      >
        <NavigationMenu.List className="">
          {investmentItems.map((item) => (
            <NavigationMenu.Link asChild key={item.label}>
              <Link
                to={item.link}
                className="py-1 transition-all font-medium w-full rounded-sm flex cursor-default flex-row items-center gap-2 px-4 hover:bg-gray-200 focus:outline-none"
              >
                {item.icon}
                {item.label}
              </Link>
            </NavigationMenu.Link>
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
      <Separator.Root
        decorative
        orientation="horizontal"
        className="mx-2 w-full bg-slate-200 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px"
      />
      <span className="text-xs w-full px-2 text-slate-500">Deals</span>
      <NavigationMenu.Root
        className="px-2 text-sm w-full"
        orientation="vertical"
      >
        <NavigationMenu.List className="">
          {dealItems.map((item) => (
            <NavigationMenu.Link asChild key={item.label}>
              <Link
                to={item.link}
                className="py-1 transition-all font-medium w-full rounded-sm flex cursor-default flex-row items-center gap-2 px-4 hover:bg-gray-200 focus:outline-none"
              >
                {item.icon}
                {item.label}
              </Link>
            </NavigationMenu.Link>
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
      <Separator.Root
        decorative
        orientation="horizontal"
        className="mx-2 w-full bg-slate-200 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px"
      />
      <span className="text-xs w-full px-2 text-slate-500">Research</span>
      <NavigationMenu.Root
        className="px-2 text-sm w-full"
        orientation="vertical"
      >
        <NavigationMenu.List className="">
          {researchItems.map((item) => (
            <NavigationMenu.Link asChild key={item.label}>
              <Link
                to={item.link}
                className="py-1 transition-all font-medium w-full rounded-sm flex cursor-default flex-row items-center gap-2 px-4 hover:bg-gray-200 focus:outline-none"
              >
                {item.icon}
                {item.label}
              </Link>
            </NavigationMenu.Link>
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </header>
  );
}
