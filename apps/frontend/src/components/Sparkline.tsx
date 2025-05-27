import { useMemo } from 'react';
import { LinePath } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { curveMonotoneX } from '@visx/curve';
import { Group } from '@visx/group';

/**
 * SparklineProps interface for the Sparkline component
 */
interface SparklineProps {
  /** Array of numeric data points to be displayed in the sparkline */
  data: number[];

  /**
   * Width of the sparkline SVG in pixels
   * @default 100
   */
  width?: number;

  /**
   * Height of the sparkline SVG in pixels
   * @default 30
   */
  height?: number;

  /**
   * Color of the sparkline
   * @default 'steelblue'
   */
  strokeColor?: string;

  /**
   * Width of the sparkline stroke
   * @default 1.5
   */
  strokeWidth?: number;

  /**
   * Margin around the sparkline
   * @default { top: 0, right: 0, bottom: 0, left: 0 }
   */
  margin?: { top: number; right: number; bottom: number; left: number };
}

/**
 * A simple sparkline chart component that visualizes a series of numeric values.
 * Renders a small inline chart showing data trends without axes or labels.
 * Uses visx for rendering SVG paths with smooth curves.
 *
 * Features:
 * - Smooth curve rendering with curveMonotoneX
 * - Customizable colors, dimensions, and margins
 *
 * @example
 * <Sparkline data={[5, 10, 5, 20, 8, 15]} width={150} height={40} />
 */
function Sparkline({
  data,
  width = 100,
  height = 30,
  strokeColor = 'steelblue',
  strokeWidth = 1.5,
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
}: SparklineProps) {
  // Handle empty data case
  if (!data || data.length === 0) {
    return <svg width={width} height={height} />;
  }

  // Calculate inner dimensions
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Create scales
  const x = useMemo(
    () =>
      scaleLinear({
        domain: [0, data.length - 1],
        range: [0, innerWidth],
        round: true,
      }),
    [data.length, innerWidth],
  );

  const y = useMemo(
    () =>
      scaleLinear({
        domain: [Math.min(...data), Math.max(...data)],
        range: [innerHeight, 0],
        round: true,
      }),
    [data, innerHeight],
  );

  return (
    <svg width={width} height={height}>
      <Group left={margin.left} top={margin.top}>
        <LinePath
          data={data}
          x={(_d, i) => x(i)}
          y={(d) => y(d)}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          curve={curveMonotoneX}
          fill="none"
        />
      </Group>
    </svg>
  );
}

export default Sparkline;
