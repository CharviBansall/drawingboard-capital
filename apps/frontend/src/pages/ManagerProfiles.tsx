import { useState } from 'react';
import {
  Users,
  Buildings,
  Star,
  MagnifyingGlass,
  GlobeHemisphereWest,
  Funnel,
  ArrowsClockwise,
  PencilSimple,
} from '@phosphor-icons/react';
import { useNavigate } from 'react-router';
import PageTitle from '@/components/PageTitle';
import Button from '@/components/Button';
import Input from '@/components/Input';
import FilterDropdown from '@/components/FilterDropdown';
import DonutChart from '@/components/DonutChart';

export default function ManagerProfiles() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({
    type: [],
    region: [],
    aum: [],
  });

  // Dummy data for manager profiles
  const managers = [
    {
      id: 1,
      name: 'Sequoia Capital',
      type: 'Venture Capital',
      region: 'North America',
      aum: '$85B+',
      aumRange: 'Over $50B',
      founded: 1972,
      rating: 4.8,
      investments: 1500,
      exits: 300,
      focus: ['Technology', 'Healthcare', 'Consumer'],
      description:
        'Sequoia Capital is an American venture capital firm specializing in investments in early-stage and growth-stage companies across technology sectors.',
    },
    {
      id: 2,
      name: 'Blackstone',
      type: 'Private Equity',
      region: 'Global',
      aum: '$975B+',
      aumRange: 'Over $50B',
      founded: 1985,
      rating: 4.7,
      investments: 2500,
      exits: 450,
      focus: ['Real Estate', 'Infrastructure', 'Private Equity', 'Credit'],
      description:
        "Blackstone is one of the world's leading investment firms with a diverse portfolio across private equity, real estate, and credit investments.",
    },
    {
      id: 3,
      name: 'KKR',
      type: 'Private Equity',
      region: 'Global',
      aum: '$510B+',
      aumRange: 'Over $50B',
      founded: 1976,
      rating: 4.6,
      investments: 1800,
      exits: 380,
      focus: ['Private Equity', 'Infrastructure', 'Real Estate', 'Credit'],
      description:
        'KKR is a global investment firm that manages multiple alternative asset classes including private equity, infrastructure, and credit.',
    },
    {
      id: 4,
      name: 'Andreessen Horowitz',
      type: 'Venture Capital',
      region: 'North America',
      aum: '$35B+',
      aumRange: '$10B-$50B',
      founded: 2009,
      rating: 4.9,
      investments: 900,
      exits: 150,
      focus: ['Technology', 'Crypto', 'Fintech', 'Healthcare'],
      description:
        'Andreessen Horowitz (a16z) is a venture capital firm that backs bold entrepreneurs building the future through technology.',
    },
    {
      id: 5,
      name: 'CVC Capital Partners',
      type: 'Private Equity',
      region: 'Europe',
      aum: '$165B+',
      aumRange: 'Over $50B',
      founded: 1981,
      rating: 4.5,
      investments: 1200,
      exits: 250,
      focus: [
        'Business Services',
        'Consumer',
        'Financial Services',
        'Healthcare',
      ],
      description:
        'CVC Capital Partners is a leading private equity and investment advisory firm with a global network of offices across Europe, the Americas, and Asia.',
    },
    {
      id: 6,
      name: 'Tiger Global Management',
      type: 'Hedge Fund',
      region: 'Global',
      aum: '$95B+',
      aumRange: 'Over $50B',
      founded: 2001,
      rating: 4.6,
      investments: 700,
      exits: 120,
      focus: ['Technology', 'Consumer', 'Financial Services'],
      description:
        'Tiger Global Management is an investment firm focused on public and private companies in the global internet, software, consumer, and financial technology industries.',
    },
  ];

  // Data for AUM distribution chart
  const aumDistribution = {
    'Over $50B': 4,
    '$10B-$50B': 1,
    '$1B-$10B': 0,
    'Under $1B': 0,
  };

  // Filter options
  const filterOptions = [
    {
      category: 'type',
      displayName: 'Manager Type',
      options: ['Venture Capital', 'Private Equity', 'Hedge Fund'],
    },
    {
      category: 'region',
      displayName: 'Region',
      options: ['North America', 'Europe', 'Asia', 'Global'],
    },
    {
      category: 'aum',
      displayName: 'AUM',
      options: ['Over $50B', '$10B-$50B', '$1B-$10B', 'Under $1B'],
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

  // Filter managers based on search and filters
  const filteredManagers = managers.filter((manager) => {
    // Apply search filter
    if (
      searchQuery &&
      !manager.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !manager.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Apply type filter
    if (
      selectedFilters.type.length > 0 &&
      !selectedFilters.type.includes(manager.type)
    ) {
      return false;
    }

    // Apply region filter
    if (
      selectedFilters.region.length > 0 &&
      !selectedFilters.region.includes(manager.region)
    ) {
      return false;
    }

    // Apply AUM filter
    if (
      selectedFilters.aum.length > 0 &&
      !selectedFilters.aum.includes(manager.aumRange)
    ) {
      return false;
    }

    return true;
  });

  // Format rating with stars
  const formatRating = (rating: number) => {
    return (
      <div className="flex items-center">
        <span className="mr-1">{rating.toFixed(1)}</span>
        <Star className="w-4 h-4 text-yellow-500" weight="fill" />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle title="Investment Manager Profiles" />
        <Button onClick={() => navigate('/edit-fund-manager')}>
          <PencilSimple className="w-4 h-4 mr-2" />
          Add Fund Manager
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Total Managers
            </h3>
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{managers.length}</p>
          <p className="text-sm text-gray-500 mt-1">
            Across multiple strategies
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Total AUM</h3>
            <Buildings className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">$1.8T+</p>
          <p className="text-sm text-gray-500 mt-1">
            Combined assets under management
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Global Coverage
            </h3>
            <GlobeHemisphereWest className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">20+</p>
          <p className="text-sm text-gray-500 mt-1">
            Countries with active investments
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 md:col-span-1">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            AUM Distribution
          </h3>
          <div className="h-64">
            <DonutChart title="AUM Distribution" data={aumDistribution} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Manager Type Distribution
          </h3>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900">Private Equity</h4>
              <div className="flex justify-between items-center mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: '50%' }}
                  ></div>
                </div>
                <span className="ml-4 text-sm font-medium text-gray-700">
                  50%
                </span>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900">Venture Capital</h4>
              <div className="flex justify-between items-center mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full"
                    style={{ width: '33%' }}
                  ></div>
                </div>
                <span className="ml-4 text-sm font-medium text-gray-700">
                  33%
                </span>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900">Hedge Fund</h4>
              <div className="flex justify-between items-center mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-pink-600 h-2.5 rounded-full"
                    style={{ width: '17%' }}
                  ></div>
                </div>
                <span className="ml-4 text-sm font-medium text-gray-700">
                  17%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Manager Profiles */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search managers..."
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
              onClick={() =>
                setSelectedFilters({ type: [], region: [], aum: [] })
              }
            >
              <ArrowsClockwise className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredManagers.length > 0 ? (
            filteredManagers.map((manager) => (
              <div
                key={manager.id}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="bg-gray-50 p-4 border-b">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900">
                      {manager.name}
                    </h3>
                    {formatRating(manager.rating)}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {manager.type}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {manager.region}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-4">
                    {manager.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Founded</p>
                      <p className="font-medium">{manager.founded}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">AUM</p>
                      <p className="font-medium">{manager.aum}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Investments</p>
                      <p className="font-medium">{manager.investments}+</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Exits</p>
                      <p className="font-medium">{manager.exits}+</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-500 text-sm mb-1">
                      Investment Focus
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {manager.focus.map((focus, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded"
                        >
                          {focus}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button variant="secondary" size="small">
                      View Profile
                    </Button>
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() =>
                        navigate(`/edit-fund-manager?id=${manager.id}`)
                      }
                    >
                      <PencilSimple className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-md">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 mb-2">
                No managers found matching your criteria.
              </p>
              <Button
                variant="ghost"
                size="small"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFilters({ type: [], region: [], aum: [] });
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
