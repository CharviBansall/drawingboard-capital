import { useState } from 'react';
import {
  Briefcase,
  TrendUp,
  TrendDown,
  Calendar,
  DotsThree,
} from '@phosphor-icons/react';
import PageTitle from '@/components/PageTitle';
import Tabs from '@/components/Tabs';
import Button from '@/components/Button';
import DonutChart from '@/components/DonutChart';

export default function PrivateEquity() {
  const [activeTab, setActiveTab] = useState('portfolio');

  // Dummy data for private equity investments
  const portfolioData = [
    { name: 'Technology', value: 35 },
    { name: 'Healthcare', value: 25 },
    { name: 'Consumer', value: 15 },
    { name: 'Financial', value: 10 },
    { name: 'Industrial', value: 15 },
  ];

  // Dummy data for recent investments
  const recentInvestments = [
    {
      id: 1,
      name: 'TechVentures Fund III',
      manager: 'Sequoia Capital',
      commitment: 5000000,
      vintage: 2023,
      performance: 12.5,
    },
    {
      id: 2,
      name: 'Healthcare Innovation Partners',
      manager: 'KKR',
      commitment: 3500000,
      vintage: 2022,
      performance: -2.3,
    },
    {
      id: 3,
      name: 'Consumer Growth Equity',
      manager: 'Blackstone',
      commitment: 4200000,
      vintage: 2023,
      performance: 8.7,
    },
    {
      id: 4,
      name: 'Industrial Tech Fund II',
      manager: 'Carlyle Group',
      commitment: 2800000,
      vintage: 2021,
      performance: 15.2,
    },
  ];

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <PageTitle title="Private Equity" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Total Committed
            </h3>
            <Briefcase className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">$15.5M</p>
          <p className="text-sm text-gray-500 mt-1">Across 8 funds</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Total Called</h3>
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">$8.2M</p>
          <p className="text-sm text-gray-500 mt-1">53% of commitments</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Overall Performance
            </h3>
            <TrendUp className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">+12.3%</p>
          <p className="text-sm text-gray-500 mt-1">Since inception</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { value: 'portfolio', label: 'Portfolio Overview' },
          { value: 'investments', label: 'Investments' },
          { value: 'reports', label: 'Reports' },
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow">
        {activeTab === 'portfolio' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Sector Allocation
                </h3>
                <div className="h-64">
                  <DonutChart
                    title="Sector Allocation"
                    data={Object.fromEntries(
                      portfolioData.map((item) => [item.name, item.value]),
                    )}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Investment Strategy
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900">Growth Equity</h4>
                    <div className="flex justify-between items-center mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: '65%' }}
                        ></div>
                      </div>
                      <span className="ml-4 text-sm font-medium text-gray-700">
                        65%
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900">Buyout</h4>
                    <div className="flex justify-between items-center mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-purple-600 h-2.5 rounded-full"
                          style={{ width: '25%' }}
                        ></div>
                      </div>
                      <span className="ml-4 text-sm font-medium text-gray-700">
                        25%
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900">
                      Venture Capital
                    </h4>
                    <div className="flex justify-between items-center mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-pink-600 h-2.5 rounded-full"
                          style={{ width: '10%' }}
                        ></div>
                      </div>
                      <span className="ml-4 text-sm font-medium text-gray-700">
                        10%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'investments' && (
          <div className="p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Recent Investments
              </h3>
              <Button variant="secondary" size="small">
                Add Investment
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fund
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Manager
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commitment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vintage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentInvestments.map((investment) => (
                    <tr key={investment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {investment.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {investment.manager}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(investment.commitment)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {investment.vintage}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex items-center ${
                            investment.performance >= 0
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {investment.performance >= 0 ? (
                            <TrendUp className="w-4 h-4 mr-1" />
                          ) : (
                            <TrendDown className="w-4 h-4 mr-1" />
                          )}
                          {investment.performance >= 0 ? '+' : ''}
                          {investment.performance}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-gray-400 hover:text-gray-500">
                          <DotsThree weight="bold" className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="p-6">
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Reports Available
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Reports for your private equity investments will appear here
                once they are generated.
              </p>
              <Button variant="primary">Request Report</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
