import React from 'react';
import {
  House,
  Briefcase,
  HandCoins,
  Cards,
  Swap,
  Polygon,
  Scroll,
  Notebook,
  UserList,
  ClipboardText,
  Money,
  Gear,
  ChartLineUp,
} from '@phosphor-icons/react';
import Home from '@/pages/Home';
import Portfolio from '@/pages/Portfolio';
import CapitalCalls from '@/pages/CapitalCalls';
import Settings from '@/pages/Settings';
import Funds from '@/pages/Funds/Funds';
import Secondaries from '@/pages/Secondaries';
import CoInvestments from '@/pages/CoInvestments';
import PrivateEquity from '@/pages/PrivateEquity';
import MarketInsights from '@/pages/MarketInsights';
import FundReports from '@/pages/FundReports';
import ManagerProfiles from '@/pages/ManagerProfiles';
import ComplianceTasks from '@/pages/ComplianceTasks/ComplianceTasks';
import Stocks from '@/pages/Stocks';

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
        label: 'Settings',
        path: '/settings',
        icon: Gear,
        element: Settings,
      },
    ],
  },
  {
    section: 'Clients',
    items: [
      {
        label: 'Portfolios',
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
    ],
  },
  {
    section: 'Investments',
    items: [
      {
        label: 'Stocks and ETFs',
        path: '/stocks',
        icon: ChartLineUp,
        element: Stocks,
      },
      { label: 'Funds', path: '/funds', icon: Cards, element: Funds },
      {
        label: 'Private Equity',
        path: '/private-equity',
        icon: Money,
        element: PrivateEquity,
      },
      {
        label: 'Secondaries',
        path: '/secondaries',
        icon: Swap,
        element: Secondaries,
      },
      {
        label: 'Co-Investments',
        path: '/co-investments',
        icon: Polygon,
        element: CoInvestments,
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
        label: 'Investment Reports',
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
    section: 'Firm Operations',
    items: [
      {
        label: 'Compliance Tasks',
        path: '/compliance',
        icon: ClipboardText,
        element: ComplianceTasks,
      },
    ],
  },
];
