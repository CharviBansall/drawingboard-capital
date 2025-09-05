import { useState } from 'react';
import {
  ArrowDown,
  MagnifyingGlass,
  Funnel,
  ArrowsClockwise,
} from '@phosphor-icons/react';
import PageTitle from '@/components/PageTitle';
import Button from '@/components/Button';
import Input from '@/components/Input';
import FilterDropdown from '@/components/FilterDropdown';

export default function Secondaries() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({
    status: [],
    type: [],
    vintage: [],
  });

  // Dummy data for secondary market opportunities
  const opportunities = [
    {
      id: 1,
      fundName: 'Blackstone Capital Partners VIII',
      seller: 'Pension Fund A',
      type: 'LP Interest',
      vintage: 2019,
      nav: 15000000,
      askPrice: 13500000,
      discount: 10,
      status: 'Available',
    },
    {
      id: 2,
      fundName: 'KKR North America Fund XII',
      seller: 'Endowment B',
      type: 'LP Interest',
      vintage: 2020,
      nav: 8000000,
      askPrice: 7600000,
      discount: 5,
      status: 'Available',
    },
    {
      id: 3,
      fundName: 'Apollo Investment Fund IX',
      seller: 'Family Office C',
      type: 'Direct Secondary',
      vintage: 2018,
      nav: 12000000,
      askPrice: 10200000,
      discount: 15,
      status: 'Under LOI',
    },
    {
      id: 4,
      fundName: 'Carlyle Partners VII',
      seller: 'Insurance Company D',
      type: 'LP Interest',
      vintage: 2017,
      nav: 20000000,
      askPrice: 19000000,
      discount: 5,
      status: 'Closed',
    },
    {
      id: 5,
      fundName: 'Warburg Pincus Private Equity XII',
      seller: 'Sovereign Wealth Fund E',
      type: 'GP-led',
      vintage: 2015,
      nav: 25000000,
      askPrice: 23750000,
      discount: 5,
      status: 'Available',
    },
  ];

  // Filter options
  const filterOptions = [
    {
      category: 'status',
      displayName: 'Status',
      options: ['Available', 'Under LOI', 'Closed'],
    },
    {
      category: 'type',
      displayName: 'Type',
      options: ['LP Interest', 'Direct Secondary', 'GP-led'],
    },
    {
      category: 'vintage',
      displayName: 'Vintage',
      options: ['2015-2017', '2018-2020', '2021+'],
    },
  ];

  // Handle filter toggle
  const handleFilterToggle = (category: string, option: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[category]?.includes(option)) {
        newFilters[category] = newFilters[category].filter(
          (item) => item !== option,
        );
      } else {
        newFilters[category] = [...(newFilters[category] || []), option];
      }
      return newFilters;
    });
  };

  // Filter opportunities based on search and filters
  const filteredOpportunities = opportunities.filter((opportunity) => {
    // Apply search filter
    if (
      searchQuery &&
      !opportunity.fundName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !opportunity.seller.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Apply status filter
    if (
      selectedFilters.status.length > 0 &&
      !selectedFilters.status.includes(opportunity.status)
    ) {
      return false;
    }

    // Apply type filter
    if (
      selectedFilters.type.length > 0 &&
      !selectedFilters.type.includes(opportunity.type)
    ) {
      return false;
    }

    // Apply vintage filter
    if (selectedFilters.vintage.length > 0) {
      const vintage = opportunity.vintage;
      if (
        selectedFilters.vintage.includes('2015-2017') &&
        (vintage < 2015 || vintage > 2017) &&
        selectedFilters.vintage.includes('2018-2020') &&
        (vintage < 2018 || vintage > 2020) &&
        selectedFilters.vintage.includes('2021+') &&
        vintage < 2021
      ) {
        return false;
      }
    }

    return true;
  });

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Under LOI':
        return 'bg-yellow-100 text-yellow-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <PageTitle title="Secondaries Market" />

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search by fund or seller..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<MagnifyingGlass className="text-gray-400" />}
            />
          </div>
          <div className="flex items-center gap-2">
            <FilterDropdown
              filterOptions={filterOptions}
              selectedFilters={selectedFilters}
              onFilterToggle={handleFilterToggle}
              filterCount={Object.values(selectedFilters).flat().length}
              triggerIcon={<Funnel className="w-4 h-4 mr-1" />}
              triggerText="Filter"
            />
            <Button
              variant="ghost"
              size="small"
              onClick={() =>
                setSelectedFilters({ status: [], type: [], vintage: [] })
              }
            >
              <ArrowsClockwise className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fund Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vintage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NAV
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ask Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOpportunities.length > 0 ? (
                filteredOpportunities.map((opportunity) => (
                  <tr key={opportunity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {opportunity.fundName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {opportunity.seller}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {opportunity.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {opportunity.vintage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(opportunity.nav)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(opportunity.askPrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center">
                        <ArrowDown className="w-4 h-4 mr-1 text-green-600" />
                        {opportunity.discount}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                          opportunity.status,
                        )}`}
                      >
                        {opportunity.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="secondary"
                        size="small"
                        disabled={opportunity.status === 'Closed'}
                      >
                        {opportunity.status === 'Available'
                          ? 'Express Interest'
                          : 'View Details'}
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-10 text-center text-sm text-gray-500"
                  >
                    <p className="font-medium text-gray-900 mb-1">
                      No opportunities found
                    </p>
                    <p className="text-gray-500">
                      Try adjusting your search or filters to find secondary
                      opportunities.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="primary">Create New Listing</Button>
      </div>
    </div>
  );
}
