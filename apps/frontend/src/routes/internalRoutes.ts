// routes/navigation.ts
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
} from '@phosphor-icons/react';

export const internalRoutes = [
  {
    section: 'Base',
    items: [
      { label: 'Home', path: '/home', icon: House, element: 'Home' },
      {
        label: 'Portfolio',
        path: '/portfolio',
        icon: Briefcase,
        element: 'Portfolio',
      },
      {
        label: 'Capital Calls',
        path: '/capital-calls',
        icon: HandCoins,
        element: 'CapitalCalls',
      },
    ],
  },
  {
    section: 'Opportunities',
    items: [
      { label: 'Funds', path: '/funds', icon: Cards, element: 'Funds' },
      {
        label: 'Secondaries',
        path: '/secondaries',
        icon: Swap,
        element: 'Secondaries',
      },
      {
        label: 'Co-Investments',
        path: '/co-investments',
        icon: Polygon,
        element: 'CoInvestments',
      },
      {
        label: 'Private Credit',
        path: '/private-credit',
        icon: CreditCard,
        element: 'PrivateCredit',
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
        element: 'MarketInsights',
      },
      {
        label: 'Fund Reports',
        path: '/fund-reports',
        icon: Notebook,
        element: 'FundReports',
      },
      {
        label: 'Manager Profiles',
        path: '/manager-profiles',
        icon: UserList,
        element: 'ManagerProfiles',
      },
    ],
  },
];
