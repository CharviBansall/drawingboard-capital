import { useState, useEffect } from 'react';
import PageTitle from '@/components/PageTitle';
import FilterDropdown from '@/components/FilterDropdown';
import { FilterOption } from '@/components/FilterDropdown';
import Sparkline from '@/components/Sparkline';

// Dummy data for Indian stocks
// Exchange rate: 1 USD = 83 INR (approximate)
const indianStocks = [
  {
    id: 1,
    name: 'Reliance Industries',
    ticker: 'RELIANCE.NS',
    sector: 'Energy',
    price: 34.35, // 2850.75 / 83
    currency: 'USD',
    marketCap: 23192771084, // 1925000000000 / 83
    peRatio: 28.5,
    dividendYield: 0.35,
    performance: 12.8,
    historicalData: [
      31.93, 32.29, 32.77, 33.13, 33.61, 33.25, 33.73, 34.1, 34.46, 34.22,
      34.58, 34.35,
    ],
  },
  {
    id: 2,
    name: 'Tata Consultancy Services',
    ticker: 'TCS.NS',
    sector: 'Technology',
    price: 41.57, // 3450.25 / 83
    currency: 'USD',
    marketCap: 15240963855, // 1265000000000 / 83
    peRatio: 32.1,
    dividendYield: 1.2,
    performance: 8.5,
    historicalData: [
      38.55, 39.16, 39.76, 39.52, 40.0, 40.36, 40.72, 40.96, 41.2, 41.57, 41.45,
      41.57,
    ],
  },
  {
    id: 3,
    name: 'HDFC Bank',
    ticker: 'HDFCBANK.NS',
    sector: 'Financial Services',
    price: 20.25, // 1680.5 / 83
    currency: 'USD',
    marketCap: 11265060241, // 935000000000 / 83
    peRatio: 22.3,
    dividendYield: 0.8,
    performance: -2.3,
    historicalData: [
      20.72, 20.6, 20.48, 20.36, 20.3, 20.12, 20.06, 20.0, 20.12, 20.18, 20.24,
      20.24,
    ],
  },
  {
    id: 4,
    name: 'Infosys',
    ticker: 'INFY.NS',
    sector: 'Technology',
    price: 17.12, // 1420.75 / 83
    currency: 'USD',
    marketCap: 7168674699, // 595000000000 / 83
    peRatio: 25.8,
    dividendYield: 2.1,
    performance: -5.2,
    historicalData: [
      18.07, 17.95, 17.83, 17.71, 17.59, 17.47, 17.35, 17.23, 17.17, 17.11,
      17.05, 17.11,
    ],
  },
  {
    id: 5,
    name: 'Bharti Airtel',
    ticker: 'BHARTIARTL.NS',
    sector: 'Telecommunications',
    price: 11.09, // 920.3 / 83
    currency: 'USD',
    marketCap: 6144578313, // 510000000000 / 83
    peRatio: 30.2,
    dividendYield: 0.5,
    performance: 15.7,
    historicalData: [
      9.58, 9.76, 10.0, 10.18, 10.36, 10.6, 10.72, 10.84, 10.96, 11.02, 11.08,
      11.08,
    ],
  },
  {
    id: 6,
    name: 'ITC Limited',
    ticker: 'ITC.NS',
    sector: 'Consumer Goods',
    price: 5.13, // 425.45 / 83
    currency: 'USD',
    marketCap: 6385542169, // 530000000000 / 83
    peRatio: 28.1,
    dividendYield: 3.5,
    performance: 22.3,
    historicalData: [
      4.22, 4.34, 4.46, 4.58, 4.7, 4.76, 4.82, 4.94, 5.0, 5.06, 5.12, 5.12,
    ],
  },
  {
    id: 7,
    name: 'Larsen & Toubro',
    ticker: 'LT.NS',
    sector: 'Industrial',
    price: 33.14, // 2750.8 / 83
    currency: 'USD',
    marketCap: 4638554217, // 385000000000 / 83
    peRatio: 32.5,
    dividendYield: 0.9,
    performance: 18.2,
    historicalData: [
      27.95, 28.31, 28.92, 29.52, 30.12, 30.72, 31.33, 31.93, 32.53, 32.89,
      33.13, 33.13,
    ],
  },
  {
    id: 8,
    name: 'Axis Bank',
    ticker: 'AXISBANK.NS',
    sector: 'Financial Services',
    price: 11.81, // 980.15 / 83
    currency: 'USD',
    marketCap: 3638554217, // 302000000000 / 83
    peRatio: 18.7,
    dividendYield: 0.7,
    performance: 5.8,
    historicalData: [
      11.14, 11.2, 11.33, 11.45, 11.51, 11.57, 11.63, 11.69, 11.75, 11.81,
      11.87, 11.81,
    ],
  },
  {
    id: 9,
    name: 'Mahindra & Mahindra',
    ticker: 'M&M.NS',
    sector: 'Automotive',
    price: 19.04, // 1580.25 / 83
    currency: 'USD',
    marketCap: 2361445783, // 196000000000 / 83
    peRatio: 22.4,
    dividendYield: 1.1,
    performance: 30.5,
    historicalData: [
      14.58, 15.06, 15.54, 16.02, 16.51, 16.99, 17.47, 17.95, 18.43, 18.8,
      19.04, 19.04,
    ],
  },
  {
    id: 10,
    name: 'Asian Paints',
    ticker: 'ASIANPAINT.NS',
    sector: 'Materials',
    price: 37.6, // 3120.6 / 83
    currency: 'USD',
    marketCap: 3602409639, // 299000000000 / 83
    peRatio: 65.3,
    dividendYield: 0.6,
    performance: -3.8,
    historicalData: [
      39.16, 39.04, 38.92, 38.67, 38.43, 38.31, 38.19, 38.07, 37.95, 37.83,
      37.71, 37.59,
    ],
  },
];

// Filter options
const filterOptions: FilterOption[] = [
  {
    category: 'sector',
    displayName: 'Sector',
    options: [
      'Energy',
      'Technology',
      'Financial Services',
      'Telecommunications',
      'Consumer Goods',
      'Industrial',
      'Automotive',
      'Materials',
    ],
  },
  {
    category: 'performance',
    displayName: 'Performance',
    options: ['Positive', 'Negative'],
  },
  {
    category: 'dividendYield',
    displayName: 'Dividend Yield',
    options: ['High (>1%)', 'Low (<1%)'],
  },
];

export default function Stocks() {
  // State for selected filters
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({
    sector: [],
    performance: [],
    dividendYield: [],
  });

  // State for filtered stocks
  const [filteredStocks, setFilteredStocks] = useState(indianStocks);

  // State for sorting
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);

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
      sector: [],
      performance: [],
      dividendYield: [],
    });
  };

  // Handle sorting
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }

    setSortConfig({ key, direction });
  };

  // Apply filters to stocks
  useEffect(() => {
    let result = [...indianStocks];

    if (selectedFilters.sector.length > 0) {
      result = result.filter((stock) =>
        selectedFilters.sector.includes(stock.sector),
      );
    }

    if (selectedFilters.performance.length > 0) {
      result = result.filter((stock) => {
        if (
          selectedFilters.performance.includes('Positive') &&
          stock.performance > 0
        ) {
          return true;
        }
        if (
          selectedFilters.performance.includes('Negative') &&
          stock.performance <= 0
        ) {
          return true;
        }
        return false;
      });
    }

    if (selectedFilters.dividendYield.length > 0) {
      result = result.filter((stock) => {
        if (
          selectedFilters.dividendYield.includes('High (>1%)') &&
          stock.dividendYield > 1
        ) {
          return true;
        }
        if (
          selectedFilters.dividendYield.includes('Low (<1%)') &&
          stock.dividendYield <= 1
        ) {
          return true;
        }
        return false;
      });
    }

    // Apply sorting if configured
    if (sortConfig !== null) {
      result.sort((a, b) => {
        if (
          a[sortConfig.key as keyof typeof a] <
          b[sortConfig.key as keyof typeof b]
        ) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (
          a[sortConfig.key as keyof typeof a] >
          b[sortConfig.key as keyof typeof b]
        ) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredStocks(result);
  }, [selectedFilters, sortConfig]);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Format market cap in billions/crores
  const formatMarketCap = (value: number) => {
    if (value >= 1000000000000) {
      return `₹${(value / 1000000000000).toFixed(2)} Trillion`;
    } else if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Crore`;
    } else {
      return `₹${(value / 100000).toFixed(2)} Lakh`;
    }
  };

  // Handle buy button click
  const handleBuyClick = (stock: (typeof indianStocks)[0]) => {
    alert(
      `You clicked to buy ${stock.name} (${stock.ticker}) at ${formatCurrency(stock.price)}. This is a placeholder action.`,
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <PageTitle title="Stock Market" />
      </div>

      {/* Market Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Market Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600">SENSEX</p>
            <p className="font-semibold text-green-600">72,350.25 (+1.2%)</p>
          </div>
          <div>
            <p className="text-gray-600">NIFTY 50</p>
            <p className="font-semibold text-green-600">21,840.35 (+0.9%)</p>
          </div>
          <div>
            <p className="text-gray-600">Market Status</p>
            <p className="font-semibold">Open</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <FilterDropdown
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          onFilterToggle={handleFilterToggle}
          filterCount={filterCount}
          triggerText="Filter Stocks"
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

      {/* Stocks Table */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Available Stocks</h3>

        {filteredStocks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('name')}
                  >
                    Company Name
                    {sortConfig?.key === 'name' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Ticker
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('sector')}
                  >
                    Sector
                    {sortConfig?.key === 'sector' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('price')}
                  >
                    Price
                    {sortConfig?.key === 'price' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('marketCap')}
                  >
                    Market Cap
                    {sortConfig?.key === 'marketCap' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Trend
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStocks.map((stock) => (
                  <tr key={stock.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {stock.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stock.ticker}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stock.sector}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(stock.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatMarketCap(stock.marketCap)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Sparkline
                        data={stock.historicalData}
                        width={100}
                        height={30}
                        strokeColor={
                          stock.performance > 0 ? '#10b981' : '#ef4444'
                        }
                        strokeWidth={1.5}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleBuyClick(stock)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        Buy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-md">
            <p className="text-gray-500">
              No stocks match the current filters.
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
