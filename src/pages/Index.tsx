import { Phone, CheckCircle, TrendingUp, Users, MessageSquare, Target } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import Header from '@/components/dashboard/Header';
import StatCard from '@/components/dashboard/StatCard';
import DoughnutChart from '@/components/dashboard/DoughnutChart';
import BarChart from '@/components/dashboard/BarChart';
import LineChart from '@/components/dashboard/LineChart';
import {
  getTotalCalls,
  getCompletedCalls,
  getConversionRate,
  getAverageInteractions,
  getCallStatusDistribution,
  getSentimentDistribution,
  getInterestFlagDistribution,
  getAwarenessDistribution,
  getSchemeLevelDistribution,
  getDailyCallVolume,
  getAvailableDates,
  getCallsByDate,
  callData,
} from '@/data/callData';

const Index = () => {
  const dates = getAvailableDates();
  const [selectedDate, setSelectedDate] = useState<string>('All days');
  const calls = useMemo(() => {
    if (selectedDate === 'All days') {
      return Object.values(callData).flat();
    }
    return getCallsByDate(selectedDate);
  }, [selectedDate]);

  const callStatusData = getCallStatusDistribution(calls);
  const sentimentData = getSentimentDistribution(calls);
  const interestData = getInterestFlagDistribution(calls);
  const awarenessData = getAwarenessDistribution(calls);
  const schemeLevelData = getSchemeLevelDistribution(calls);
  const dailyVolume = getDailyCallVolume(calls);

  const dateLabel = useMemo(() => {
    if (selectedDate === 'All days') return 'All days';
    if (!calls || !calls.length) return selectedDate;
    const raw: string = calls[0]?.call_date || '';
    const datePart = raw.split(' ')[0] || '';
    const parts = datePart.split(/[\/\-]/);
    if (parts.length >= 3) {
      const m = Number(parts[0]);
      const d = Number(parts[1]);
      const yy = Number(parts[2]);
      if (!Number.isNaN(m) && !Number.isNaN(d) && !Number.isNaN(yy)) {
        const year = yy < 100 ? 2000 + yy : yy;
        const dt = new Date(year, m - 1, d);
        if (!isNaN(dt.getTime())) {
          return dt.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        }
      }
    }
    return selectedDate;
  }, [calls, selectedDate]);

  const avgInteractions = useMemo(() => {
    const completed = (calls || []).filter((c: any) => c.call_status === 'completed');
    if (!completed.length) return (0).toFixed(1);
    const total = completed.reduce((sum: number, c: any) => {
      const val = Number(c.interaction_count ?? c.interaction_count_total);
      return sum + (Number.isFinite(val) ? val : 0);
    }, 0);
    return (total / completed.length).toFixed(1);
  }, [calls]);

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient effect */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-8 max-w-7xl">
        <Header dates={dates} selectedDate={selectedDate} onDateChange={setSelectedDate} dateLabel={dateLabel} />

        {/* Key Metrics */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Calls"
              value={getTotalCalls(calls)}
              subtitle="All call attempts"
              icon={Phone}
              trend={{ value: 12.5, isPositive: true }}
              colorClass="text-primary"
            />
            <StatCard
              title="Completed Calls"
              value={getCompletedCalls(calls)}
              subtitle="Successfully connected"
              icon={CheckCircle}
              trend={{ value: 8.3, isPositive: true }}
              colorClass="text-success"
            />
            <StatCard
              title="Conversion Rate"
              value={`${getConversionRate(calls)}%`}
              subtitle="Interest shown"
              icon={TrendingUp}
              trend={{ value: 5.2, isPositive: true }}
              colorClass="text-accent"
            />
            <StatCard
              title="Avg Interactions"
              value={avgInteractions}
              subtitle="Per completed call"
              icon={MessageSquare}
              colorClass="text-warning"
            />
          </div>
        </section>

        {/* Charts Row 1 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Call Analytics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LineChart
              title="Daily Call Volume Trend"
              labels={dailyVolume.map(([date]) => date)}
              data={dailyVolume.map(([, count]) => count)}
              yUnitSuffix=" min"
            />
            <BarChart
              title="Call Status Distribution"
              labels={Object.keys(callStatusData)}
              data={Object.values(callStatusData)}
            />
          </div>
        </section>

        {/* Charts Row 2 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Customer Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DoughnutChart
              title="Sentiment Analysis"
              data={sentimentData}
              colors={['hsl(142, 71%, 45%)', 'hsl(38, 92%, 50%)', 'hsl(0, 72%, 51%)']}
            />
            <DoughnutChart
              title="Interest in Loan"
              data={interestData}
              colors={['hsl(168, 84%, 40%)', 'hsl(217, 33%, 40%)']}
            />
            <DoughnutChart
              title="Scheme Awareness"
              data={awarenessData}
              colors={['hsl(199, 89%, 48%)', 'hsl(262, 83%, 58%)']}
            />
          </div>
        </section>

        {/* Charts Row 3 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Scheme Distribution</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BarChart
              title="User Scheme Level"
              labels={Object.keys(schemeLevelData)}
              data={Object.values(schemeLevelData)}
              color="hsl(262, 83%, 58%)"
            />
            <div className="chart-container animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-4">Campaign Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/30">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-primary" />
                    <span className="text-foreground">Target Audience Reached</span>
                  </div>
                  <span className="mono text-primary font-semibold">{getTotalCalls(calls)}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/30">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-success" />
                    <span className="text-foreground">Qualified Leads</span>
                  </div>
                  <span className="mono text-success font-semibold">{getCompletedCalls(calls)}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/30">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    <span className="text-foreground">Positive Sentiment Rate</span>
                  </div>
                  <span className="mono text-accent font-semibold">
                    {(
                      ((Number(sentimentData['Positive']) || 0) /
                        Object.values(sentimentData)
                          .map(v => Number(v))
                          .reduce((a, b) => a + b, 0) * 100
                      ).toFixed(1)
                    )}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
