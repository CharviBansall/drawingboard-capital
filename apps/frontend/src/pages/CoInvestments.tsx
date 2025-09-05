import { useState } from 'react';
import {
  Buildings,
  Users,
  Briefcase,
  ChartBar,
  Plus,
} from '@phosphor-icons/react';
import PageTitle from '@/components/PageTitle';
import Button from '@/components/Button';
import Tabs from '@/components/Tabs';
import DonutChart from '@/components/DonutChart';

export default function CoInvestments() {
  const [activeTab, setActiveTab] = useState('active');

  // Dummy data for co-investment portfolio
  const sectorData = {
    Technology: 35,
    Healthcare: 25,
    Consumer: 15,
    Financial: 10,
    Industrial: 15,
  };

  // Dummy data for co-investments
  const investments = [
    {
      id: 1,
      name: 'TechVision AI',
      sector: 'Technology',
      sponsor: 'Sequoia Capital',
      invested: 2500000,
      ownership: 8.5,
      status: 'Active',
      date: '2023-05-15',
    },
    {
      id: 2,
      name: 'MedLife Innovations',
      sector: 'Healthcare',
      sponsor: 'KKR',
      invested: 3800000,
      ownership: 12.3,
      status: 'Active',
      date: '2022-11-08',
    },
    {
      id: 3,
      name: 'EcoRetail Solutions',
      sector: 'Consumer',
      sponsor: 'Blackstone',
      invested: 1750000,
      ownership: 5.2,
      status: 'Exit Process',
      date: '2021-03-22',
    },
    {
      id: 4,
      name: 'FinTech Payments',
      sector: 'Financial',
      sponsor: 'Andreessen Horowitz',
      invested: 4200000,
      ownership: 9.7,
      status: 'Active',
      date: '2023-08-30',
    },
    {
      id: 5,
      name: 'Industrial Automation',
      sector: 'Industrial',
      sponsor: 'TPG Capital',
      invested: 3100000,
      ownership: 7.5,
      status: 'Exit Complete',
      date: '2020-06-14',
      exitDate: '2023-09-25',
      exitMultiple: 2.4,
    },
  ];

  // Filter investments based on active tab
  const filteredInvestments = investments.filter((investment) => {
    if (activeTab === 'active') {
      return investment.status === 'Active';
    } else if (activeTab === 'exit') {
      return (
        investment.status === 'Exit Process' ||
        investment.status === 'Exit Complete'
      );
    }
    return true; // 'all' tab
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
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Exit Process':
        return 'bg-yellow-100 text-yellow-800';
      case 'Exit Complete':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <PageTitle title="Co-Investments" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Total Invested
            </h3>
            <Briefcase className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">$15.3M</p>
          <p className="text-sm text-gray-500 mt-1">Across 5 companies</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Sponsor Partners
            </h3>
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">5</p>
          <p className="text-sm text-gray-500 mt-1">
            Leading private equity firms
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Realized Multiple
            </h3>
            <ChartBar className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">2.4x</p>
          <p className="text-sm text-gray-500 mt-1">On exited investments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 md:col-span-1">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Sector Allocation
          </h3>
          <div className="h-64">
            <DonutChart title="Sector Allocation" data={sectorData} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Investment Pipeline
            </h3>
            <Button variant="secondary" size="small">
              <Plus className="w-4 h-4 mr-1" />
              Add Opportunity
            </Button>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between">
                <h4 className="font-medium text-gray-900">
                  Cloud Infrastructure Platform
                </h4>
                <span className="text-sm text-gray-500">Technology</span>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Sponsor: Insight Partners
                  </span>
                  <span className="text-gray-600">Target: $3-5M</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: '75%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-gray-500">Due Diligence</span>
                  <span className="text-gray-500">75%</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between">
                <h4 className="font-medium text-gray-900">
                  Sustainable Packaging
                </h4>
                <span className="text-sm text-gray-500">Industrial</span>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sponsor: TPG Rise</span>
                  <span className="text-gray-600">Target: $2-4M</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full"
                    style={{ width: '40%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-gray-500">Initial Review</span>
                  <span className="text-gray-500">40%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { value: 'all', label: 'All Investments' },
          { value: 'active', label: 'Active' },
          { value: 'exit', label: 'Exit Process' },
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />

      {/* Investments Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sector
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sponsor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Investment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ownership
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
              {filteredInvestments.length > 0 ? (
                filteredInvestments.map((investment) => (
                  <tr key={investment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <Buildings className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {investment.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Invested:{' '}
                            {new Date(investment.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {investment.sector}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {investment.sponsor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(investment.invested)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {investment.ownership}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                          investment.status,
                        )}`}
                      >
                        {investment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="secondary" size="small">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-10 text-center text-sm text-gray-500"
                  >
                    <p className="font-medium text-gray-900 mb-1">
                      No investments found
                    </p>
                    <p className="text-gray-500">
                      No investments match the current filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
