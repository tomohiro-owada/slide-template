import { Bar, Line, Pie, Doughnut, Radar, PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, LineElement,
  PointElement, ArcElement, RadialLinearScale,
  Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { chartTheme, type ChartColorIntent } from '../../colors';
import { tokens } from '../../config/tokens';

// Chart.js の登録
ChartJS.register(
  CategoryScale, LinearScale, BarElement, LineElement,
  PointElement, ArcElement, RadialLinearScale,
  Title, Tooltip, Legend, Filler,
);

export type ChartType = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar' | 'polarArea';

// deck.json から渡されるチャートデータ
export interface ChartBlockData {
  type: ChartType;
  intent: ChartColorIntent;
  highlightIndex?: number;       // intent=highlight の時、どのデータを目立たせるか
  labels: string[];
  datasets: Array<{
    label?: string;
    data: number[];
  }>;
  // 表示オプション
  showLegend?: boolean;
  showGrid?: boolean;
  stacked?: boolean;
}

interface ChartBlockProps {
  chart: ChartBlockData;
  width?: number | string;
  height?: number | string;
}

// intent に基づいて色を解決
function resolveColors(
  intent: ChartColorIntent,
  dataLength: number,
  datasetIndex: number,
  highlightIndex?: number,
  values?: number[],
): string[] {
  switch (intent) {
    case 'categorical':
      return chartTheme.categorical.colors.slice(0, dataLength);

    case 'highlight':
      return Array.from({ length: dataLength }, (_, i) =>
        i === (highlightIndex ?? 0) ? chartTheme.highlight.active : chartTheme.highlight.muted
      );

    case 'sequential':
      // データ数に合わせて steps を均等にサンプリング
      return Array.from({ length: dataLength }, (_, i) => {
        const idx = Math.round((i / Math.max(dataLength - 1, 1)) * (chartTheme.sequential.steps.length - 1));
        return chartTheme.sequential.steps[idx];
      });

    case 'diverging':
      return (values ?? []).map(v =>
        v > 0 ? chartTheme.diverging.positive
        : v < 0 ? chartTheme.diverging.negative
        : chartTheme.diverging.neutral
      );

    case 'comparison':
      return datasetIndex === 0
        ? Array(dataLength).fill(chartTheme.comparison.a)
        : Array(dataLength).fill(chartTheme.comparison.b);

    default:
      return chartTheme.categorical.colors.slice(0, dataLength);
  }
}

export function ChartBlock({ chart, width = '100%', height = 400 }: ChartBlockProps) {
  const { type, intent, highlightIndex, labels, datasets, showLegend, showGrid, stacked } = chart;

  const isPie = type === 'pie' || type === 'doughnut' || type === 'polarArea';

  const chartData = {
    labels,
    datasets: datasets.map((ds, dsIndex) => {
      const colors = resolveColors(intent, ds.data.length, dsIndex, highlightIndex, ds.data);
      return {
        label: ds.label ?? '',
        data: ds.data,
        backgroundColor: isPie ? colors : colors.map(c => c + 'CC'), // 少し透過
        borderColor: colors,
        borderWidth: isPie ? 2 : 2,
        borderRadius: type === 'bar' ? 4 : 0,
        pointRadius: type === 'line' ? 4 : 0,
        pointBackgroundColor: colors,
        tension: type === 'line' ? 0.3 : 0,
        fill: false,
      };
    }),
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend ?? (datasets.length > 1 || isPie),
        position: 'bottom' as const,
        labels: {
          color: chartTheme.defaults.labelColor,
          font: { family: tokens.font.body, size: 14 },
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: { family: tokens.font.body },
        bodyFont: { family: tokens.font.body },
      },
    },
    scales: isPie || type === 'radar' ? {} : {
      x: {
        display: true,
        grid: { display: false },
        ticks: {
          color: chartTheme.defaults.labelColor,
          font: { family: tokens.font.body, size: 14 },
        },
        stacked: stacked,
      },
      y: {
        display: showGrid !== false,
        grid: {
          color: chartTheme.defaults.gridColor,
          drawBorder: false,
        },
        ticks: {
          color: chartTheme.defaults.labelColor,
          font: { family: tokens.font.body, size: 14 },
        },
        stacked: stacked,
      },
    },
  };

  const style = { width, height, position: 'relative' as const };

  const componentMap = { bar: Bar, line: Line, pie: Pie, doughnut: Doughnut, radar: Radar, polarArea: PolarArea };
  const ChartComponent = componentMap[type] ?? Bar;

  return (
    <div style={style}>
      <ChartComponent data={chartData} options={options} />
    </div>
  );
}
