import React from 'react';
import {
  House,
  Briefcase,
  HandCoins,
  Cards,
  Swap,
  Polygon,
  CreditCard,
  Scroll,
  Notebook,
  UserList,
  ClipboardText,
  Money,
  Gear,
} from '@phosphor-icons/react';
import Home from '../pages/Home';
import Portfolio from '../pages/Portfolio';
import CapitalCalls from '../pages/CapitalCalls';
import Settings from '../pages/Settings';
import Funds from '../pages/Funds/Funds';
import Secondaries from '../pages/Secondaries';
import CoInvestments from '../pages/CoInvestments';
import PrivateEquity from '../pages/PrivateEquity';
import PrivateCredit from '../pages/PrivateCredit';
import MarketInsights from '../pages/MarketInsights';
import FundReports from '../pages/FundReports';
import ManagerProfiles from '../pages/ManagerProfiles';
import Compliance from '../pages/Compliance';

interface RouteItem {
  label: string;
  path: string;
  icon: React.ComponentType;
  element: React.ComponentType;
}

interface RouteSection {
  section: string;
  items: RouteItem[];
}

export const internalRoutes: RouteSection[] = [
  {
    section: 'Base',
    items: [
      { label: 'Home', path: '/home', icon: House, element: Home },
      {
        label: 'Portfolio',
        path: '/portfolio',
        icon: Briefcase,
        element: Portfolio,
      },
      {
        label: 'Capital Calls',
        path: '/capital-calls',
        icon: HandCoins,
        element: CapitalCalls,
      },
      {
        label: 'Settings',
        path: '/settings',
        icon: Gear,
        element: Settings,
      },
    ],
  },
  {
    section: 'Alternatives',
    items: [
      { label: 'Funds', path: '/funds', icon: Cards, element: Funds },
      {
        label: 'Secondaries',
        path: '/secondaries',
        icon: Swap,
        element: Secondaries,
      },
    ],
  },
  {
    section: 'Deals',
    items: [
      {
        label: 'Co-Investments',
        path: '/co-investments',
        icon: Polygon,
        element: CoInvestments,
      },
      {
        label: 'Private Equity',
        path: '/private-equity',
        icon: Money,
        element: PrivateEquity,
      },
      {
        label: 'Private Credit',
        path: '/private-credit',
        icon: CreditCard,
        element: PrivateCredit,
      },
    ],
  },
  {
    section: 'Research',
    items: [
      {
        label: 'Market Insights',
        path: '/market-insights',
        icon: Scroll,
        element: MarketInsights,
      },
      {
        label: 'Fund Reports',
        path: '/fund-reports',
        icon: Notebook,
        element: FundReports,
      },
      {
        label: 'Manager Profiles',
        path: '/manager-profiles',
        icon: UserList,
        element: ManagerProfiles,
      },
    ],
  },
  {
    section: 'Compliance',
    items: [
      {
        label: 'Compliance Settings',
        path: '/compliance',
        icon: ClipboardText,
        element: Compliance,
      },
    ],
  },
];
