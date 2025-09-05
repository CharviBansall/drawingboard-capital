import { useState } from 'react';
import {
  ChartLineUp,
  Newspaper,
  Globe,
  BookOpen,
  MagnifyingGlass,
  Calendar,
} from '@phosphor-icons/react';
import PageTitle from '@/components/PageTitle';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Tabs from '@/components/Tabs';

export default function MarketInsights() {
  const [activeTab, setActiveTab] = useState('reports');
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data for market reports
  const reports = [
    {
      id: 1,
      title: 'Global Private Equity Market Outlook 2025',
      source: 'McKinsey & Company',
      date: '2025-04-15',
      category: 'Market Analysis',
      summary:
        'Comprehensive analysis of private equity market trends, challenges, and opportunities for the coming year.',
      tags: ['Private Equity', 'Market Trends', 'Forecast'],
    },
    {
      id: 2,
      title: 'Venture Capital Ecosystem: Emerging Technologies',
      source: 'Sequoia Capital',
      date: '2025-03-22',
      category: 'Industry Report',
      summary:
        'Deep dive into emerging technologies attracting venture capital investment and their potential impact.',
      tags: ['Venture Capital', 'Technology', 'Innovation'],
    },
    {
      id: 3,
      title: 'ESG Investment Strategies in Private Markets',
      source: 'BlackRock',
      date: '2025-02-10',
      category: 'ESG',
      summary:
        'Analysis of environmental, social, and governance factors in private market investments.',
      tags: ['ESG', 'Sustainable Investing', 'Impact'],
    },
    {
      id: 4,
      title: 'Healthcare Private Equity Report',
      source: 'Bain & Company',
      date: '2025-01-05',
      category: 'Sector Analysis',
      summary:
        'Comprehensive review of private equity investments in the healthcare sector, highlighting key trends and opportunities.',
      tags: ['Healthcare', 'Private Equity', 'Sector Analysis'],
    },
    {
      id: 5,
      title: 'Digital Transformation in Financial Services',
      source: 'Deloitte',
      date: '2024-12-18',
      category: 'Technology',
      summary:
        'How digital transformation is reshaping the financial services industry and creating new investment opportunities.',
      tags: ['Fintech', 'Digital Transformation', 'Financial Services'],
    },
  ];

  // Dummy data for upcoming events
  const events = [
    {
      id: 1,
      title: 'Global Private Equity Summit',
      organizer: 'Financial Times',
      date: '2025-06-15',
      location: 'New York, NY',
      virtual: false,
    },
    {
      id: 2,
      title: 'Venture Capital and Innovation Conference',
      organizer: 'TechCrunch',
      date: '2025-07-22',
      location: 'San Francisco, CA',
      virtual: false,
    },
    {
      id: 3,
      title: 'ESG in Private Markets Webinar',
      organizer: 'PRI',
      date: '2025-05-10',
      location: 'Online',
      virtual: true,
    },
  ];

  // Filter reports based on search query
  const filteredReports = reports.filter((report) => {
    if (!searchQuery) return true;

    const searchLower = searchQuery.toLowerCase();
    return (
      report.title.toLowerCase().includes(searchLower) ||
      report.source.toLowerCase().includes(searchLower) ||
      report.summary.toLowerCase().includes(searchLower) ||
      report.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
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
      <PageTitle title="Market Insights" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Latest Reports
            </h3>
            <Newspaper className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">25</p>
          <p className="text-sm text-gray-500 mt-1">New reports this month</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Market Coverage
            </h3>
            <Globe className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">15</p>
          <p className="text-sm text-gray-500 mt-1">Global markets tracked</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Upcoming Events
            </h3>
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">8</p>
          <p className="text-sm text-gray-500 mt-1">
            Industry events this quarter
          </p>
        </div>
      </div>

      {/* Market Trends Chart Placeholder */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Market Performance Trends
          </h3>
          <div className="flex gap-2">
            <Button variant="secondary" size="small">
              <ChartLineUp className="w-4 h-4 mr-1" />
              Compare Markets
            </Button>
            <Button variant="ghost" size="small">
              Last 12 Months ▼
            </Button>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <ChartLineUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">
              Interactive market performance chart will appear here
            </p>
            <Button variant="primary" size="small" className="mt-4">
              Enable Market Data
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { value: 'reports', label: 'Research Reports' },
          { value: 'events', label: 'Upcoming Events' },
          { value: 'news', label: 'Industry News' },
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow">
        {activeTab === 'reports' && (
          <div className="p-6">
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
              <Button variant="secondary" size="small">
                <BookOpen className="w-4 h-4 mr-1" />
                Browse All Reports
              </Button>
            </div>

            <div className="space-y-4">
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between">
                      <h4 className="text-lg font-medium text-gray-900">
                        {report.title}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {formatDate(report.date)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {report.source}
                    </p>
                    <p className="mt-2 text-gray-700">{report.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {report.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {report.category}
                      </span>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button variant="secondary" size="small">
                        Read Report
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-md">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 mb-2">
                    No reports found matching your search.
                  </p>
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Upcoming Industry Events
              </h3>
              <Button variant="secondary" size="small">
                <Calendar className="w-4 h-4 mr-1" />
                Add to Calendar
              </Button>
            </div>

            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between">
                    <h4 className="text-lg font-medium text-gray-900">
                      {event.title}
                    </h4>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${event.virtual ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}
                    >
                      {event.virtual ? 'Virtual' : 'In Person'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Organized by {event.organizer}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        <Calendar className="inline-block w-4 h-4 mr-1" />
                        {formatDate(event.date)}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        <Globe className="inline-block w-4 h-4 mr-1" />
                        {event.location}
                      </p>
                    </div>
                    <Button variant="secondary" size="small">
                      Register
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="p-6">
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Newspaper className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Industry News Coming Soon
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                We're working on integrating real-time industry news from
                trusted sources. Check back soon for the latest updates and
                analysis.
              </p>
              <Button variant="primary">Subscribe to Updates</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
