import ReactECharts from 'echarts-for-react';

interface LineChartProps {
  title: string;
  labels: string[];
  data: any[];
}

const LineChart = ({ title, labels, data }: LineChartProps) => {
  const movingAverage = (arr: number[], windowSize: number) => {
    const result: number[] = [];
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
      if (i >= windowSize) sum -= arr[i - windowSize];
      const denom = Math.min(i + 1, windowSize);
      result.push(Number((sum / denom).toFixed(2)));
    }
    return result;
  };

  const ma7 = movingAverage(data, 7);

  const option = {
    _computed: undefined as unknown,
    grid: { left: 40, right: 20, top: 40, bottom: 40 },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'hsl(222, 47%, 11%)',
      borderColor: 'hsl(217, 33%, 20%)',
      textStyle: { color: 'hsl(215, 20%, 65%)', fontFamily: 'JetBrains Mono' },
      axisPointer: { type: 'line' },
      formatter: (params: any) => {
        const label = params?.[0]?.axisValueLabel ?? '';
        const items = params
          .map((p: any) => `${p.marker}${p.seriesName}: <b>${p.value}</b>`)
          .join('<br/>');
        return `${label}<br/>${items}`;
      },
    },
    legend: {
      top: 0,
      textStyle: { color: 'hsl(215, 20%, 65%)', fontFamily: 'Inter' },
      data: [
        { name: 'Call Volume', icon: 'circle' },
        { name: '7-day Moving Avg', icon: 'circle' },
      ],
    },
    dataZoom: [
      {
        type: 'inside',
        throttle: 30,
        startValue: Math.max(0, (labels?.length ?? 0) - 30),
        endValue: Math.max(0, (labels?.length ?? 1) - 1),
      },
      {
        type: 'slider',
        height: 16,
        bottom: 8,
        backgroundColor: 'rgba(255,255,255,0.04)',
        dataBackground: { lineStyle: { color: 'hsl(217,33%,20%)' }, areaStyle: { color: 'rgba(100,100,255,0.08)' } },
        borderColor: 'hsl(217,33%,20%)',
        textStyle: { color: 'hsl(215,20%,65%)' },
        handleStyle: { color: 'hsl(199,89%,48%)' },
        startValue: Math.max(0, (labels?.length ?? 0) - 30),
        endValue: Math.max(0, (labels?.length ?? 1) - 1),
      },
    ],
    xAxis: {
      type: 'category',
      data: labels,
      axisLabel: {
        color: 'hsl(215, 20%, 65%)',
        fontFamily: 'Inter',
        fontSize: 11,
        formatter: (val: string) => (typeof val === 'string' ? val.split(' ')[0] : val),
      },
      axisLine: { lineStyle: { color: 'hsl(217, 33%, 15%)' } },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: 'hsl(215, 20%, 65%)', fontFamily: 'JetBrains Mono', fontSize: 11 },
      splitLine: { lineStyle: { color: 'hsl(217, 33%, 15%)' } },
    },
    series: [
      {
        name: 'Call Volume',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: { color: 'hsl(199, 89%, 48%)' },
        lineStyle: { color: 'hsl(199, 89%, 48%)', width: 3 },
        areaStyle: { color: 'hsla(199, 89%, 48%, 0.1)' },
        emphasis: { focus: 'series' },
        data,
      },
      {
        name: '7-day Moving Avg',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { color: 'hsl(168, 84%, 40%)', width: 2, type: 'dashed' },
        data: ma7,
      },
    ],
  } as const;

  return (
    <div className="chart-container animate-fade-in h-full">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="h-64">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  );
};

export default LineChart;
