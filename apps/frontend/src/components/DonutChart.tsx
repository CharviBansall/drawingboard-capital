import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

export default function DonutChart({
  title,
  data,
  region = 'overview',
}: {
  title: string;
  data: Record<string, number>;
  region?: 'overview' | 'usa' | 'india';
}) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chart: echarts.ECharts | undefined;

    if (chartRef.current) {
      chart = echarts.init(chartRef.current);

      // Adjust title based on region
      const displayTitle =
        region !== 'overview' ? `${title} - ${region.toUpperCase()}` : title;

      chart.setOption({
        title: {
          text: displayTitle,
          left: 'center',
          textStyle: { fontSize: 18 },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)',
        },
        color: [
          '#e4f3fe', // --color-blue-3
          '#c1def5', // --color-blue-6
          '#afd4f0', // --color-blue-7
          '#f1fbff', // --color-blue-2
          '#011a2b', // --color-blue-9
          '#072233', // --color-blue-12
        ],
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center',
          formatter: '{name}',
        },
        series: [
          {
            name: title,
            type: 'pie',
            radius: ['40%', '70%'], // Inner and outer radius to create donut
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 4,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 16,
                fontWeight: 'bold',
              },
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            labelLine: {
              show: false,
            },
            data: Object.entries(data).map(([key, value]) => ({
              name: key,
              value,
            })),
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
  }, [title, data]);

  return <div ref={chartRef} style={{ height: '100%', width: '100%' }} />;
}
