import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  title: string;
  labels: string[];
  data: number[];
  color?: string;
  description?: React.ReactNode;
}

const BarChart = ({ title, labels, data, color = 'hsl(199, 89%, 48%)', description }: BarChartProps) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Calls',
        data,
        backgroundColor: color,
        borderRadius: 6,
        borderSkipped: false,
        hoverBackgroundColor: 'hsl(168, 84%, 40%)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'hsl(215, 20%, 65%)',
          font: {
            family: 'Inter',
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: 'hsl(217, 33%, 15%)',
        },
        ticks: {
          color: 'hsl(215, 20%, 65%)',
          font: {
            family: 'JetBrains Mono',
            size: 11,
          },
        },
      },
    },
  };

  return (
    <div className="chart-container animate-fade-in h-full">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
      {description ? (
        <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
};

export default BarChart;
