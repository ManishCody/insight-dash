import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  title: string;
  data: Record<string, number>;
  colors?: string[];
  description?: React.ReactNode;
}

const DoughnutChart = ({ title, data, colors, description }: DoughnutChartProps) => {
  const defaultColors = [
    'hsl(199, 89%, 48%)',
    'hsl(168, 84%, 40%)',
    'hsl(262, 83%, 58%)',
    'hsl(38, 92%, 50%)',
    'hsl(0, 72%, 51%)',
  ];

  const chartColors = colors || defaultColors;

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: chartColors.slice(0, Object.keys(data).length),
        borderColor: 'hsl(222, 47%, 9%)',
        borderWidth: 3,
        hoverBorderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'hsl(215, 20%, 65%)',
          font: {
            family: 'Inter',
            size: 12,
          },
          padding: 16,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'hsl(222, 47%, 11%)',
        titleColor: 'hsl(210, 40%, 98%)',
        bodyColor: 'hsl(215, 20%, 65%)',
        borderColor: 'hsl(217, 33%, 20%)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        titleFont: {
          family: 'Inter',
          weight: '600' as const,
        },
        bodyFont: {
          family: 'JetBrains Mono',
        },
      },
    },
  };

  return (
    <div className="chart-container animate-fade-in h-full">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="h-64">
        <Doughnut data={chartData} options={options} />
      </div>
      {description ? (
        <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
};

export default DoughnutChart;
