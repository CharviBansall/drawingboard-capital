import { useState } from 'react';
import { format, addDays } from 'date-fns';
import { Calendar, ArrowRight, Check, Warning } from '@phosphor-icons/react';
import PageTitle from '@/components/PageTitle';
import Button from '@/components/Button';
import Tabs from '@/components/Tabs';
import FilterDropdown from '@/components/FilterDropdown';

// Types for our capital calls data
interface CapitalCall {
  id: string;
  fundName: string;
  clientName: string;
  amount: number;
  dueDate: Date;
  status: 'Pending' | 'Funded' | 'Overdue';
  createdAt: Date;
}

// Status tab type
type StatusTab = 'all' | 'pending' | 'funded' | 'overdue';

// Filter type for selected filters
type SelectedFilters = Record<string, string[]>;

export default function CapitalCalls() {
  // State for tab selection
  const [selectedTab, setSelectedTab] = useState<StatusTab>('all');

  // State for selected filters
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    fund: [],
    client: [],
  });

  // Get today's date for dummy data
  const today = new Date();

  // Dummy data for capital calls
  const capitalCalls: CapitalCall[] = [
    {
      id: '1',
      fundName: 'Sequoia Growth Fund III',
      clientName: 'Acme Corporation',
      amount: 250000,
      dueDate: addDays(today, 5),
      status: 'Pending',
      createdAt: addDays(today, -10),
    },
    {
      id: '2',
      fundName: 'Blackstone Real Estate Fund',
      clientName: 'Johnson Family Office',
      amount: 500000,
      dueDate: addDays(today, 15),
      status: 'Pending',
      createdAt: addDays(today, -5),
    },
    {
      id: '3',
      fundName: 'KKR Infrastructure Fund',
      clientName: 'Smith Investments',
      amount: 750000,
      dueDate: addDays(today, -3),
      status: 'Overdue',
      createdAt: addDays(today, -20),
    },
    {
      id: '4',
      fundName: 'Sequoia Growth Fund III',
      clientName: 'Globex Industries',
      amount: 300000,
      dueDate: addDays(today, -10),
      status: 'Funded',
      createdAt: addDays(today, -30),
    },
    {
      id: '5',
      fundName: 'Andreessen Horowitz Tech Fund',
      clientName: 'Tech Innovators LLC',
      amount: 450000,
      dueDate: addDays(today, 2),
      status: 'Pending',
      createdAt: addDays(today, -15),
    },
    {
      id: '6',
      fundName: 'Blackstone Real Estate Fund',
      clientName: 'Acme Corporation',
      amount: 200000,
      dueDate: addDays(today, -5),
      status: 'Overdue',
      createdAt: addDays(today, -25),
    },
    {
      id: '7',
      fundName: 'KKR Infrastructure Fund',
      clientName: 'Johnson Family Office',
      amount: 600000,
      dueDate: addDays(today, -15),
      status: 'Funded',
      createdAt: addDays(today, -45),
    },
  ];

  // Filter options for dropdown
  const filterOptions = [
    {
      category: 'fund',
      displayName: 'Fund',
      options: [
        'Sequoia Growth Fund III',
        'Blackstone Real Estate Fund',
        'KKR Infrastructure Fund',
        'Andreessen Horowitz Tech Fund',
      ],
    },
    {
      category: 'client',
      displayName: 'Client',
      options: [
        'Acme Corporation',
        'Johnson Family Office',
        'Smith Investments',
        'Globex Industries',
        'Tech Innovators LLC',
      ],
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

  // Get total count of active filters
  const getFilterCount = () => {
    return Object.values(selectedFilters).reduce(
      (count, filters) => count + filters.length,
      0,
    );
  };

  // Filter capital calls based on selected tab and filters
  const filteredCalls = capitalCalls.filter((call) => {
    // Filter by status tab
    if (selectedTab !== 'all' && call.status.toLowerCase() !== selectedTab) {
      return false;
    }

    // Filter by selected filters
    for (const [category, options] of Object.entries(selectedFilters)) {
      if (options.length > 0) {
        if (category === 'fund' && !options.includes(call.fundName)) {
          return false;
        }
        if (category === 'client' && !options.includes(call.clientName)) {
          return false;
        }
      }
    }

    return true;
  });

  // Calculate summary metrics
  const totalCalled = capitalCalls.reduce((sum, call) => sum + call.amount, 0);
  const outstandingAmount = capitalCalls
    .filter((call) => call.status !== 'Funded')
    .reduce((sum, call) => sum + call.amount, 0);
  const callsDueThisWeek = capitalCalls.filter(
    (call) =>
      call.status !== 'Funded' &&
      call.dueDate >= today &&
      call.dueDate <= addDays(today, 7),
  ).length;
  const overdueCalls = capitalCalls.filter(
    (call) => call.status === 'Overdue',
  ).length;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (date: Date) => {
    return format(date, 'MMM d, yyyy');
  };

  // Get status badge color
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Funded':
        return 'bg-green-100 text-green-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="Capital Calls" />

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500 mb-1">Total Capital Called</div>
          <div className="text-2xl font-semibold">
            {formatCurrency(totalCalled)}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500 mb-1">Outstanding Amount</div>
          <div className="text-2xl font-semibold">
            {formatCurrency(outstandingAmount)}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500 mb-1">Calls Due This Week</div>
          <div className="text-2xl font-semibold">{callsDueThisWeek}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500 mb-1">Overdue Calls</div>
          <div className="text-2xl font-semibold text-red-600">
            {overdueCalls}
          </div>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <Tabs
          tabs={[
            { value: 'all', label: 'All Calls' },
            { value: 'pending', label: 'Pending' },
            { value: 'funded', label: 'Funded' },
            { value: 'overdue', label: 'Overdue' },
          ]}
          value={selectedTab}
          onChange={(value) => setSelectedTab(value as StatusTab)}
        />
        <div className="flex items-center gap-3">
          <FilterDropdown
            filterOptions={filterOptions}
            selectedFilters={selectedFilters}
            onFilterToggle={handleFilterToggle}
            filterCount={getFilterCount()}
            triggerText="Filter"
          />
          <Button variant="secondary" size="small">
            <Calendar className="w-4 h-4 mr-1" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Capital Calls Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fund Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Client Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Call Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Due Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCalls.length > 0 ? (
                filteredCalls.map((call) => (
                  <tr key={call.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {call.fundName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {call.clientName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(call.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(call.dueDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                          call.status,
                        )}`}
                      >
                        {call.status}
                      </span>
                    </td>
                    <td className="px-6 w-full py-4 flex whitespace-nowrap justify-end text-right">
                      {call.status === 'Pending' && (
                        <Button variant="secondary" size="small">
                          Mark as Funded
                          <Check className="w-4 h-4 ml-1" />
                        </Button>
                      )}
                      {call.status === 'Overdue' && (
                        <div className="flex justify-end gap-2">
                          <Button variant="destructive" size="small">
                            Escalate
                            <Warning className="w-4 h-4 ml-1" />
                          </Button>
                          <Button variant="secondary" size="small">
                            Mark as Funded
                            <Check className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      )}
                      {call.status === 'Funded' && (
                        <Button variant="ghost" size="small">
                          View Details
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-sm text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Calendar className="w-10 h-10 text-gray-400 mb-2" />
                      <p className="font-medium text-gray-900 mb-1">
                        No capital calls found
                      </p>
                      <p className="text-gray-500">
                        No capital calls match your current filters.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="secondary">
          <Calendar className="w-4 h-4 mr-2" />
          Calendar View
        </Button>
        {/* TODO: Add functionality to create new capital calls */}
        {/* <Button variant="primary">
          Create Capital Call
        </Button> */}
      </div>
    </div>
  );
}
