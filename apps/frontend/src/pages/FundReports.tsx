import { useState } from 'react';
import { FileText, Download, MagnifyingGlass, CalendarBlank, Funnel, ArrowsClockwise } from '@phosphor-icons/react';
import PageTitle from '@/components/PageTitle';
import Button from '@/components/Button';
import Input from '@/components/Input';
import FilterDropdown from '@/components/FilterDropdown';

export default function FundReports() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    type: [],
    fund: [],
    year: [],
  });

  // Dummy data for fund reports
  const reports = [
    {
      id: 1,
      name: 'Sequoia Growth Fund III - Q1 2025 Report',
      fund: 'Sequoia Growth Fund III',
      type: 'Quarterly',
      date: '2025-04-15',
      size: '2.4 MB',
      year: '2025',
    },
    {
      id: 2,
      name: 'Blackstone Real Estate Fund - Annual Report 2024',
      fund: 'Blackstone Real Estate Fund',
      type: 'Annual',
      date: '2025-03-10',
      size: '5.7 MB',
      year: '2024',
    },
    {
      id: 3,
      name: 'KKR Infrastructure Fund - Q4 2024 Report',
      fund: 'KKR Infrastructure Fund',
      type: 'Quarterly',
      date: '2025-01-20',
      size: '3.1 MB',
      year: '2024',
    },
    {
      id: 4,
      name: 'Andreessen Horowitz Tech Fund - Semi-Annual Report H2 2024',
      fund: 'Andreessen Horowitz Tech Fund',
      type: 'Semi-Annual',
      date: '2025-02-05',
      size: '4.2 MB',
      year: '2024',
    },
    {
      id: 5,
      name: 'Sequoia Growth Fund III - Q4 2024 Report',
      fund: 'Sequoia Growth Fund III',
      type: 'Quarterly',
      date: '2025-01-15',
      size: '2.8 MB',
      year: '2024',
    },
    {
      id: 6,
      name: 'KKR Infrastructure Fund - Annual Report 2024',
      fund: 'KKR Infrastructure Fund',
      type: 'Annual',
      date: '2025-03-25',
      size: '6.3 MB',
      year: '2024',
    },
  ];

  // Filter options
  const filterOptions = [
    {
      category: 'type',
      displayName: 'Report Type',
      options: ['Quarterly', 'Semi-Annual', 'Annual'],
    },
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
      category: 'year',
      displayName: 'Year',
      options: ['2025', '2024', '2023'],
    },
  ];

  // Handle filter toggle
  const handleFilterToggle = (category: string, option: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[category]?.includes(option)) {
        newFilters[category] = newFilters[category].filter(
          (item) => item !== option
        );
      } else {
        newFilters[category] = [...(newFilters[category] || []), option];
      }
      return newFilters;
    });
  };

  // Filter reports based on search and filters
  const filteredReports = reports.filter((report) => {
    // Apply search filter
    if (
      searchQuery &&
      !report.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !report.fund.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Apply type filter
    if (
      selectedFilters.type.length > 0 &&
      !selectedFilters.type.includes(report.type)
    ) {
      return false;
    }

    // Apply fund filter
    if (
      selectedFilters.fund.length > 0 &&
      !selectedFilters.fund.includes(report.fund)
    ) {
      return false;
    }

    // Apply year filter
    if (
      selectedFilters.year.length > 0 &&
      !selectedFilters.year.includes(report.year)
    ) {
      return false;
    }

    return true;
  });

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <PageTitle title="Fund Reports" />

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<MagnifyingGlass className="text-gray-400" />}
              showClearButton
              onClear={() => setSearchQuery('')}
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
              onClick={() => setSelectedFilters({ type: [], fund: [], year: [] })}
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
                  Report Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fund
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{report.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.fund}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          report.type === 'Quarterly'
                            ? 'bg-blue-100 text-blue-800'
                            : report.type === 'Annual'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <CalendarBlank className="w-4 h-4 mr-1 text-gray-400" />
                        {formatDate(report.date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="secondary" size="small">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="w-10 h-10 text-gray-400 mb-2" />
                      <p className="font-medium text-gray-900 mb-1">
                        No reports found
                      </p>
                      <p className="text-gray-500">
                        Try adjusting your search or filters to find reports.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="primary">
          <FileText className="w-4 h-4 mr-2" />
          Request Custom Report
        </Button>
      </div>
    </div>
  );
}
