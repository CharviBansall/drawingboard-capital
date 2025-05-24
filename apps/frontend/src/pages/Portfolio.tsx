import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import * as echarts from 'echarts';
import DonutChart from '../components/DonutChart';
import { CaretDown, User } from '@phosphor-icons/react';
import PageTitle from '@/components/PageTitle';
import RadioGroup from '@/components/RadioGroup';

interface AssetAllocation {
  name: string;
  value: number;
  percentage: string;
  change: string;
}

interface Client {
  id: string;
  name: string;
  company?: string;
}

export default function Portfolio() {
  const lineChartRef = useRef<HTMLDivElement>(null);
  const [selectedClient, setSelectedClient] = useState<string>('client1');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<
    'overview' | 'usa' | 'india'
  >('overview');

  // Sample client data
  const clients: Client[] = [
    { id: 'client1', name: 'John Smith', company: 'Smith Ventures LLC' },
    { id: 'client2', name: 'Emily Johnson', company: 'Johnson Family Office' },
    { id: 'client3', name: 'Michael Chen', company: 'Chen Capital' },
    { id: 'client4', name: 'Sarah Williams', company: 'Williams Investments' },
    { id: 'client5', name: 'David Rodriguez', company: 'Rodriguez Partners' },
  ];

  // Get the current client
  const currentClient =
    clients.find((client) => client.id === selectedClient) || clients[0];

  // Generate random asset allocation data for different regions
  const generateAssetAllocations = useCallback(
    (region: 'overview' | 'usa' | 'india' = 'overview') => {
      // Asset class names based on region
      let assetNames: string[];

      if (region === 'usa') {
        assetNames = [
          'US Equities',
          'US Treasury',
          'US Real Estate',
          'US Credit',
          'US Funds',
          'US Others',
        ];
      } else if (region === 'india') {
        assetNames = [
          'India Equities',
          'India Bonds',
          'India Real Estate',
          'India Credit',
          'India Funds',
          'India Others',
        ];
      } else {
        assetNames = [
          'PE Buyouts',
          'PE Growth',
          'Credit Assets',
          'Funds',
          'Real Estate',
          'Others',
        ];
      }

      // Generate random values that sum to 100
      let values: number[] = [];
      let sum = 0;

      // Generate initial random values
      for (let i = 0; i < assetNames.length; i++) {
        const randomValue = Math.floor(Math.random() * 30) + 5; // Between 5 and 35
        values.push(randomValue);
        sum += randomValue;
      }

      // Normalize to sum to 100
      values = values.map((value) => Math.round((value / sum) * 100));

      // Adjust to ensure sum is exactly 100
      const currentSum = values.reduce((a, b) => a + b, 0);
      if (currentSum !== 100) {
        values[0] += 100 - currentSum; // Add or subtract the difference from the first value
      }

      // Generate random changes
      const changes = assetNames.map(() => {
        const isPositive = Math.random() > 0.4; // 60% chance of positive change
        const changeValue = (Math.random() * 3).toFixed(1); // Change between 0.0 and 3.0
        return `${isPositive ? '+' : '-'}${changeValue}%`;
      });

      // Create the asset allocations
      return assetNames.map((name, index) => ({
        name,
        value: values[index],
        percentage: `${values[index].toFixed(2)}%`,
        change: changes[index],
      }));
    },
    [],
  );

  const [overviewAllocations, setOverviewAllocations] = useState<
    AssetAllocation[]
  >(generateAssetAllocations('overview'));
  const [usaAllocations, setUsaAllocations] = useState<AssetAllocation[]>(
    generateAssetAllocations('usa'),
  );
  const [indiaAllocations, setIndiaAllocations] = useState<AssetAllocation[]>(
    generateAssetAllocations('india'),
  );

  // Get current allocations based on selected region
  const assetAllocations = useMemo(() => {
    switch (selectedRegion) {
      case 'usa':
        return usaAllocations;
      case 'india':
        return indiaAllocations;
      default:
        return overviewAllocations;
    }
  }, [selectedRegion, overviewAllocations, usaAllocations, indiaAllocations]);

  // Prepare data for donut chart
  const donutChartData = useMemo(() => {
    return assetAllocations.reduce<Record<string, number>>((acc, item) => {
      acc[item.name] = item.value;
      return acc;
    }, {});
  }, [assetAllocations]);

  // Generate random portfolio value data
  const generatePortfolioData = useCallback(
    (region: 'overview' | 'usa' | 'india' = 'overview') => {
      // Adjust base values based on region
      let baseValue: number;

      if (region === 'usa') {
        baseValue = 12 + Math.random() * 8; // 12M to 20M
      } else if (region === 'india') {
        baseValue = 8 + Math.random() * 7; // 8M to 15M
      } else {
        baseValue = 15 + Math.random() * 10; // 15M to 25M
      }
      // Use the base value as starting value
      const startValue = baseValue;

      // Generate monthly data with small random changes
      const data: number[] = [];
      let currentValue = startValue;

      for (let i = 0; i < 12; i++) {
        // Add some randomness to the value (-5% to +5%)
        const change = currentValue * (Math.random() * 0.1 - 0.05);
        currentValue += change;
        data.push(parseFloat(currentValue.toFixed(1)));
      }

      return data;
    },
    [],
  );

  // Handle client change
  const handleClientChange = (clientId: string) => {
    setSelectedClient(clientId);
    setOverviewAllocations(generateAssetAllocations('overview'));
    setUsaAllocations(generateAssetAllocations('usa'));
    setIndiaAllocations(generateAssetAllocations('india'));

    // Force chart to update with new data
    if (lineChartRef.current) {
      const chart = echarts.getInstanceByDom(lineChartRef.current);
      if (chart) {
        chart.dispose();
      }
    }

    setIsDropdownOpen(false);
  };

  // Handle region change
  const handleRegionChange = (region: 'overview' | 'usa' | 'india') => {
    setSelectedRegion(region);

    // Force chart to update with new data
    if (lineChartRef.current) {
      const chart = echarts.getInstanceByDom(lineChartRef.current);
      if (chart) {
        chart.dispose();
      }
    }
  };

  // Line chart data - historical portfolio value
  useEffect(() => {
    let chart: echarts.ECharts | undefined;

    if (lineChartRef.current) {
      chart = echarts.init(lineChartRef.current);

      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      const data = generatePortfolioData(selectedRegion);

      // Find lowest, highest, and current values
      const lowestValue = Math.min(...data);
      const highestValue = Math.max(...data);
      const currentValue = data[data.length - 1];

      // Find indices
      const lowestIndex = data.indexOf(lowestValue);
      const highestIndex = data.indexOf(highestValue);

      // Highlight points
      const markPoints = [
        {
          name: 'Lowest',
          value: lowestValue,
          xAxis: lowestIndex,
          yAxis: lowestValue,
        },
        {
          name: 'Highest',
          value: highestValue,
          xAxis: highestIndex,
          yAxis: highestValue,
        },
        {
          name: 'Current',
          value: currentValue,
          xAxis: 11,
          yAxis: currentValue,
        },
      ];

      chart.setOption({
        title: {
          text: 'Portfolio Value ($M)',
          left: 'left',
          textStyle: { fontSize: 16 },
        },
        tooltip: {
          trigger: 'axis',
          formatter: '${c0}M',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: months,
        },
        yAxis: {
          type: 'value',
          min: 18,
          axisLabel: {
            formatter: '${value}M',
          },
        },
        series: [
          {
            name: 'Portfolio Value',
            type: 'line',
            smooth: true,
            lineStyle: {
              width: 3,
              color: '#011a2b',
            },
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              color: '#011a2b',
            },
            emphasis: {
              scale: true,
            },
            data: data,
            markPoint: {
              data: markPoints,
              symbolSize: 12,
              itemStyle: {
                color: '#25a55f',
              },
              label: {
                formatter: '${c}M',
                position: 'top',
              },
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(1, 26, 43, 0.3)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(1, 26, 43, 0.05)',
                  },
                ],
              },
            },
          },
        ],
      });
    }

    // Handle resize
    const handleResize = () => {
      chart?.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      chart?.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedClient, selectedRegion, generatePortfolioData]);

  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-start mb-6">
        <PageTitle title="Portfolio Dashboard" />
        {/* Client Selection Dropdown */}
        <div className="relative">
          <div
            className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <User size={20} className="text-gray-500 mr-2" />
            <div className="mr-2">
              <div className="font-medium">{currentClient.name}</div>
              <div className="text-xs text-gray-500">
                {currentClient.company}
              </div>
            </div>
            <CaretDown size={16} className="text-gray-500" />
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className={`px-4 py-3 hover:bg-gray-100 cursor-pointer ${client.id === selectedClient ? 'bg-gray-50' : ''}`}
                  onClick={() => handleClientChange(client.id)}
                >
                  <div className="font-medium">{client.name}</div>
                  <div className="text-xs text-gray-500">{client.company}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <RadioGroup<'overview' | 'usa' | 'india'>
          options={[
            { value: 'overview', label: 'Overview' },
            { value: 'usa', label: 'USA' },
            { value: 'india', label: 'India' },
          ]}
          value={selectedRegion}
          onChange={handleRegionChange}
          name="lineChartRegion"
          className="col-span-3 mb-4"
        />
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-medium mb-2">Total Portfolio Value</h2>
          <div className="flex items-end">
            <span className="text-3xl font-bold">
              $
              {assetAllocations.length > 0
                ? (Math.random() * 10 + 15).toFixed(1)
                : '21.2'}
              M
            </span>
            <span className="ml-2 text-green-600 text-sm">+0.8% MTD</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-medium mb-2">YTD Performance</h2>
          <div className="flex items-end">
            <span className="text-3xl font-bold">+10.4%</span>
            <span className="ml-2 text-gray-500 text-sm">
              vs +8.2% benchmark
            </span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-medium mb-2">Committed Capital</h2>
          <div className="flex items-end">
            <span className="text-3xl font-bold">$25.0M</span>
            <span className="ml-2 text-gray-500 text-sm">85% deployed</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div
            style={{ height: '380px', width: '100%' }}
            ref={lineChartRef}
          ></div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div style={{ height: '380px' }}>
            <DonutChart
              title="Asset Allocation"
              data={donutChartData}
              region={selectedRegion}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">Asset Allocation</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Allocation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assetAllocations.map((asset, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {asset.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.percentage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={
                        asset.change.startsWith('+')
                          ? 'text-green-600'
                          : 'text-red-600'
                      }
                    >
                      {asset.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
