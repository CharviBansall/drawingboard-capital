import { useState, useEffect } from 'react';
import PageTitle from '@/components/PageTitle';
import DonutChart from '@/components/DonutChart';
import PieChart from '@/components/PieChart';
import FilterDropdown from '@/components/FilterDropdown';
import { FilterOption } from '@/components/FilterDropdown';

// Dummy data for the portfolio page
const clientInfo = {
  name: 'Jonathan Doe',
  id: 'CL-78945',
  riskProfile: 'Balanced',
  joinDate: '2022-05-15',
  advisor: 'Albin George (You)',
  email: 'jonathan.doe@example.com',
};

const portfolioMetrics = {
  totalValue: 4825000,
  ytdPerformance: 8.7,
  volatility: 'Medium',
  unfundedCommitments: 750000,
};

// Dummy data for asset allocation
const assetAllocationData = {
  'Public Equity': 35,
  'Private Equity': 25,
  'Fixed Income': 15,
  'Real Estate': 12,
  'Hedge Funds': 8,
  Cash: 5,
};

// Dummy data for regional allocation
const regionAllocationData = {
  'North America': 45,
  Europe: 25,
  'Asia Pacific': 20,
  'Emerging Markets': 10,
};

// Dummy data for currency exposure
const currencyExposureData = {
  USD: 60,
  EUR: 20,
  GBP: 10,
  JPY: 5,
  Others: 5,
};

// Dummy data for portfolio holdings
const portfolioHoldings = [
  {
    id: 1,
    name: 'US Tech Growth Fund',
    type: 'Public Equity',
    value: 850000,
    currency: 'USD',
    region: 'North America',
    risk: 'High',
    performance: 12.5,
  },
  {
    id: 2,
    name: 'European Value Fund',
    type: 'Public Equity',
    value: 650000,
    currency: 'EUR',
    region: 'Europe',
    risk: 'Medium',
    performance: 6.8,
  },
  {
    id: 3,
    name: 'Global Bond Fund',
    type: 'Fixed Income',
    value: 725000,
    currency: 'USD',
    region: 'Global',
    risk: 'Low',
    performance: 3.2,
  },
  {
    id: 4,
    name: 'Real Estate Opportunity Fund',
    type: 'Real Estate',
    value: 580000,
    currency: 'USD',
    region: 'North America',
    risk: 'Medium',
    performance: 9.1,
  },
  {
    id: 5,
    name: 'Venture Capital Fund III',
    type: 'Private Equity',
    value: 450000,
    currency: 'USD',
    region: 'North America',
    risk: 'Very High',
    performance: 18.7,
  },
  {
    id: 6,
    name: 'Asian Growth Opportunities',
    type: 'Public Equity',
    value: 325000,
    currency: 'JPY',
    region: 'Asia Pacific',
    risk: 'High',
    performance: 10.3,
  },
  {
    id: 7,
    name: 'Sustainable Infrastructure Fund',
    type: 'Private Equity',
    value: 400000,
    currency: 'EUR',
    region: 'Europe',
    risk: 'Medium',
    performance: 7.5,
  },
  {
    id: 8,
    name: 'Global Macro Hedge Fund',
    type: 'Hedge Funds',
    value: 385000,
    currency: 'USD',
    region: 'Global',
    risk: 'Medium-High',
    performance: 11.2,
  },
  {
    id: 9,
    name: 'Emerging Markets Debt',
    type: 'Fixed Income',
    value: 290000,
    currency: 'USD',
    region: 'Emerging Markets',
    risk: 'Medium-High',
    performance: 5.8,
  },
  {
    id: 10,
    name: 'Cash Reserve',
    type: 'Cash',
    value: 170000,
    currency: 'USD',
    region: 'North America',
    risk: 'Very Low',
    performance: 1.2,
  },
];

// Filter options
const filterOptions: FilterOption[] = [
  {
    category: 'assetType',
    displayName: 'Asset Type',
    options: [
      'Public Equity',
      'Private Equity',
      'Fixed Income',
      'Real Estate',
      'Hedge Funds',
      'Cash',
    ],
  },
  {
    category: 'region',
    displayName: 'Region',
    options: [
      'North America',
      'Europe',
      'Asia Pacific',
      'Emerging Markets',
      'Global',
    ],
  },
  {
    category: 'currency',
    displayName: 'Currency',
    options: ['USD', 'EUR', 'GBP', 'JPY', 'Others'],
  },
  {
    category: 'risk',
    displayName: 'Risk Profile',
    options: ['Very Low', 'Low', 'Medium', 'Medium-High', 'High', 'Very High'],
  },
];

export default function Portfolio() {
  // State for selected filters
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({
    assetType: [],
    region: [],
    currency: [],
    risk: [],
  });

  // State for filtered holdings
  const [filteredHoldings, setFilteredHoldings] = useState(portfolioHoldings);

  // Calculate total filter count
  const filterCount = Object.values(selectedFilters).reduce(
    (count, filters) => count + filters.length,
    0,
  );

  // Handle filter toggle
  const handleFilterToggle = (category: string, option: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[category].includes(option)) {
        newFilters[category] = newFilters[category].filter(
          (item) => item !== option,
        );
      } else {
        newFilters[category] = [...newFilters[category], option];
      }
      return newFilters;
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedFilters({
      assetType: [],
      region: [],
      currency: [],
      risk: [],
    });
  };

  // Apply filters to holdings
  useEffect(() => {
    let result = [...portfolioHoldings];

    // TODO: Implement actual filtering logic based on selectedFilters
    // This is a simplified example
    if (selectedFilters.assetType.length > 0) {
      result = result.filter((holding) =>
        selectedFilters.assetType.includes(holding.type),
      );
    }

    if (selectedFilters.region.length > 0) {
      result = result.filter((holding) =>
        selectedFilters.region.includes(holding.region),
      );
    }

    if (selectedFilters.currency.length > 0) {
      result = result.filter((holding) =>
        selectedFilters.currency.includes(holding.currency),
      );
    }

    if (selectedFilters.risk.length > 0) {
      result = result.filter((holding) =>
        selectedFilters.risk.includes(holding.risk),
      );
    }

    setFilteredHoldings(result);
  }, [selectedFilters]);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <PageTitle title="Client Portfolio" />
        <div className="flex flex-col items-end">
          <h2 className="text-2xl font-semibold">{clientInfo.name}</h2>
          <p className="text-gray-600">Client ID: {clientInfo.id}</p>
        </div>
      </div>

      {/* Client Profile Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Client Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600">Risk Profile</p>
            <p className="font-semibold">{clientInfo.riskProfile}</p>
          </div>
          <div>
            <p className="text-gray-600">Client Since</p>
            <p className="font-semibold">
              {new Date(clientInfo.joinDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Advisor</p>
            <p className="font-semibold">{clientInfo.advisor}</p>
          </div>
        </div>
      </div>

      {/* Top-Level Summary - Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-gray-600 text-sm mb-1">Total Portfolio Value</h3>
          <p className="text-3xl font-semibold">
            {formatCurrency(portfolioMetrics.totalValue)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-gray-600 text-sm mb-1">YTD Performance</h3>
          <p className="text-3xl font-semibold text-green-600">
            +{portfolioMetrics.ytdPerformance}%
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-gray-600 text-sm mb-1">Risk Level</h3>
          <p className="text-3xl font-semibold">
            {portfolioMetrics.volatility}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-gray-600 text-sm mb-1">Unfunded Commitments</h3>
          <p className="text-3xl font-semibold">
            {formatCurrency(portfolioMetrics.unfundedCommitments)}
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <FilterDropdown
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          onFilterToggle={handleFilterToggle}
          filterCount={filterCount}
          triggerText="Filter Portfolio"
        />
        {filterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-sm text-blue-9 hover:text-blue-12 transition-colors"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Asset Allocation Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Asset Allocation</h3>
          <div className="h-80">
            <DonutChart title="Asset Allocation" data={assetAllocationData} />
          </div>
        </div>
        {/* Region Allocation Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Regional Allocation</h3>
          <div className="h-80">
            <PieChart title="Regional Allocation" data={regionAllocationData} />
          </div>
        </div>
      </div>

      {/* Currency Exposure Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Currency Exposure</h3>
        <div className="h-80">
          {/* TODO: Replace with a proper Bar Chart component when available */}
          <div className="flex items-end h-64 space-x-4 pt-4">
            {Object.entries(currencyExposureData).map(
              ([currency, percentage]) => (
                <div key={currency} className="flex flex-col items-center">
                  <div
                    className="bg-blue-6 w-16 rounded-t-md"
                    style={{ height: `${percentage * 2}px` }}
                  ></div>
                  <div className="text-sm mt-2">{currency}</div>
                  <div className="text-xs text-gray-600">{percentage}%</div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Portfolio Performance Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Portfolio Performance</h3>
        <div className="h-80 flex items-center justify-center">
          {/* TODO: Replace with a proper Line Chart component when available */}
          <div className="text-center text-gray-500">
            <p>Portfolio Performance Line Chart would go here.</p>
            <p className="text-sm">
              This requires a LineChart component to be implemented.
            </p>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Portfolio Holdings</h3>

        {filteredHoldings.length > 0 ? (
          <div className="overflow-x-auto">
            {/* TODO: Replace with a proper Table component when available */}
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Asset Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Asset Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Market Value
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Currency
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Region
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Risk Score
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHoldings.map((holding) => (
                  <tr key={holding.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {holding.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {holding.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(holding.value)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {holding.currency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {holding.region}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {holding.risk}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`${holding.performance > 0 ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {holding.performance > 0 ? '+' : ''}
                        {holding.performance}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-md">
            <p className="text-gray-500">
              No holdings match the current filters.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-blue-6 text-white rounded-md hover:bg-blue-7 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
