import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import { Tables } from '@/types/types-supabase';

export default function Compliance() {
  const [complianceItems, setComplianceItems] = useState<
    Tables<'compliance_definitions'>[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComplianceDefinitions() {
      try {
        const { data, error } = await supabase
          .from('compliance_definitions')
          .select('*')
          .order('name');

        if (error) {
          throw error;
        }

        setComplianceItems(data || []);
      } catch (error) {
        console.error('Error fetching compliance definitions:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchComplianceDefinitions();
  }, []);

  // Function to format recurrence period for display
  const formatRecurrencePeriod = (period: string | null) => {
    if (!period) {
      return '';
    }
    switch (period) {
      case 'annually':
        return 'Annually';
      case 'quarterly':
        return 'Quarterly';
      case 'monthly':
        return 'Monthly';
      case 'weekly':
        return 'Weekly';
      case 'daily':
        return 'Daily';
      default:
        return period.charAt(0).toUpperCase() + period.slice(1);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Compliance Calendar</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Activity Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Assigned to
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Frequency
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Timing
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {complianceItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-6 w-6">
                        <div className="h-5 w-5 rounded-full bg-red-600"></div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-blue-600">
                          {item.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Any Supervisor
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatRecurrencePeriod(item.recurrence_period)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.recurrence_period === 'quarterly' &&
                      'Third Wednesday of Second Month of the Quarter'}
                    {item.recurrence_period === 'annually' &&
                      item.name === 'ADV Part 2 Review' &&
                      'First Wednesday of December'}
                    {item.recurrence_period === 'quarterly' &&
                      item.name === 'Advertising Review' &&
                      'Second Tuesday of First Month of the Quarter'}
                    {item.recurrence_period === 'annually' &&
                      item.name === 'AML Review' &&
                      'Third Tuesday of April'}
                    {item.recurrence_period === 'annually' &&
                      item.name === 'AML Training' &&
                      'First Wednesday of April'}
                    {item.recurrence_period === 'annually' &&
                      item.name === 'Annual Attestations Collection' &&
                      'Second Monday of January'}
                    {item.recurrence_period === 'annually' &&
                      item.name === 'Bad Actor Questionnaire Collection' &&
                      'First Tuesday of June'}
                    {item.recurrence_period === 'annually' &&
                      item.name === 'Best Execution Review' &&
                      'First Wednesday of August'}
                    {/* Default timing for other items */}
                    {![
                      'ADV Part 2 Review',
                      'Advertising Review',
                      'AML Review',
                      'AML Training',
                      'Annual Attestations Collection',
                      'Bad Actor Questionnaire Collection',
                      'Best Execution Review',
                    ].includes(item.name) &&
                      (item.recurrence_period === 'annually'
                        ? 'Annually'
                        : item.recurrence_period === 'quarterly'
                          ? 'Quarterly'
                          : item.recurrence_period === 'monthly'
                            ? 'Monthly'
                            : 'As scheduled')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <span className="mr-2">Custom Activities</span>
              <span className="bg-gray-200 px-2 py-1 rounded text-sm">0</span>
              <button className="ml-2 text-xl">+</button>
            </div>
            <button className="text-gray-600 hover:text-gray-900">
              Revert to default settings
            </button>
          </div>

          <div className="px-6 py-4 bg-gray-100 border-t border-gray-200">
            <button className="bg-white border border-gray-300 px-4 py-2 rounded shadow-sm hover:bg-gray-50">
              Go to Calendar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
