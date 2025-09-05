import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

export default function EChartPie({
  title,
  data,
}: {
  title: string;
  data: Record<string, number>;
}) {
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let chart: echarts.ECharts | undefined;
    if (chartRef.current) {
      chart = echarts.init(chartRef.current);
      chart.setOption({
        title: { text: title, left: 'center', textStyle: { fontSize: 18 } },
        tooltip: { trigger: 'item' },
        color: [
          '#e4f3fe', // --color-blue-3
          '#c1def5', // --color-blue-6
          '#afd4f0', // --color-blue-7
          '#f1fbff', // --color-blue-2
          '#011a2b', // --color-blue-9
          '#072233', // --color-blue-12
        ],
        series: [
          {
            name: title,
            type: 'pie',
            radius: '70%',
            data: Object.entries(data).map(([key, value]) => ({
              name: key,
              value,
            })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      });
    }
    return () => {
      chart?.dispose();
    };
  }, [title, data]);

  return <div ref={chartRef} style={{ height: '100%', width: '100%' }} />;
}
