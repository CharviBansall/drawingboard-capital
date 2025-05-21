import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import { QueryData } from '@supabase/supabase-js';
import { Accordion } from 'radix-ui';
import '../styles/accordion.css';
import { Paperclip } from 'lucide-react';
import Button from '@/components/Button';

export default function Compliance() {
  const complianceQuery = supabase
    .from('compliance_definitions')
    .select('*, action_item_templates (description)')
    .order('name');
  type ComplianceItemType = QueryData<typeof complianceQuery>;
  const [complianceItems, setComplianceItems] = useState<ComplianceItemType>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComplianceDefinitions() {
      try {
        const { data, error } = await complianceQuery;

        if (error) {
          throw error;
        }
        console.log(data);
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
    } else return period.charAt(0).toUpperCase() + period.slice(1);
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-6">Compliance Calendar</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="rounded-lg shadow overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <div className="grid grid-cols-3 text-xs font-medium text-gray-500 uppercase">
              <div className="text-left">Activity Type</div>
              <div className="text-center">Assigned to</div>
              <div className="text-right">Frequency</div>
            </div>
          </div>

          <Accordion.Root
            type="multiple"
            className="bg-white divide-y divide-gray-200"
          >
            {complianceItems.map((item) => (
              <Accordion.Item
                key={item.id}
                value={`item-${item.id}`}
                className="border-b border-gray-200 last:border-b-0"
              >
                <Accordion.Header className="w-full">
                  <Accordion.Trigger className="w-full text-sm px-6 py-4 grid grid-cols-3 items-center justify-between hover:bg-gray-50 focus:outline-none">
                    <span className="text-left">{item.name}</span>
                    <span className="text-center">Any Supervisor</span>
                    <span className="text-right">
                      {formatRecurrencePeriod(item.period_type)}
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="px-6 py-4 bg-gray-50 accordion-content overflow-hidden">
                  <div className="text-sm text-gray-700 mb-4">
                    {item.detail}
                  </div>
                  <ul className="list-disc w-full text-sm px-6 py-4 items-center justify-between hover:bg-gray-50 focus:outline-none">
                    {item.action_item_templates.map((template) => (
                      <li key={template.description}>{template.description}</li>
                    ))}
                  </ul>
                  <Button className="flex items-center text-sm text-blue-600 hover:text-blue-800 focus:outline-none">
                    <Paperclip />
                    Attach Evidence
                  </Button>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>

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
