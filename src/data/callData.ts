import { day2ndDec } from "./days/2nd-dec";
import { day3rdDec } from "./days/3rd-dec";
import { day4thDec } from "./days/4th-dec";
import { day5thDec } from "./days/5th-dec";

export interface CallRecord {
  call_id: number;
  call_date: string;
  call_status: 'completed' | 'busy' | 'no-answer' | 'failed';
  sentiment: 'Positive' | 'Neutral' | 'Negative' | null;
  awareness_flag: 'yes' | 'no' | null;
  final_interest_flag: 'yes' | 'no' | null;
  user_scheme_level: 'first' | 'second' | 'third' | null;
  interaction_count: number;
  call_direction: 'outbound' | 'inbound';
}

export const callData: any = {
  "5th dec": day5thDec,
  "4th dec": day4thDec,
  "3rd dec": day3rdDec,
  "2nd dec": day2ndDec,
}

export const getAvailableDates = (): string[] => Object.keys(callData);

export const getCallsByDate = (dateKey: string): any[] => {
  return callData[dateKey] || [];
};

export const getCallStatusDistribution = (calls: any[]) => {
  const distribution = calls.reduce((acc, call) => {
    acc[call.call_status] = (acc[call.call_status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  return distribution;
};

export const getSentimentDistribution = (calls: any[]) => {
  const completedCalls = calls.filter(c => c.sentiment);
  const distribution = completedCalls.reduce((acc, call) => {
    if (call.sentiment) {
      acc[call.sentiment] = (acc[call.sentiment] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  return distribution;
};

export const getInterestFlagDistribution = (calls: any[]) => {
  const completedCalls = calls.filter(c => c.final_interest_flag);
  const distribution = completedCalls.reduce((acc, call) => {
    if (call.final_interest_flag) {
      const label = call.final_interest_flag === 'yes' ? 'Interested' : 'Not Interested';
      acc[label] = (acc[label] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  return distribution;
};

export const getAwarenessDistribution = (calls: any[]) => {
  const completedCalls = calls.filter(c => c.awareness_flag);
  const distribution = completedCalls.reduce((acc, call) => {
    if (call.awareness_flag) {
      const label = call.awareness_flag === 'yes' ? 'Aware' : 'Not Aware';
      acc[label] = (acc[label] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  return distribution;
};

export const getSchemeLevelDistribution = (calls: any[]) => {
  const callsWithLevel = calls.filter(c => c.user_scheme_level);
  const distribution = callsWithLevel.reduce((acc, call) => {
    if (call.user_scheme_level) {
      const label = `Loan ${call.user_scheme_level.charAt(0).toUpperCase() + call.user_scheme_level.slice(1)}`;
      acc[label] = (acc[label] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  return distribution;
};

export const getDailyCallVolume = (calls: any[]) => {
  const volume = calls.reduce((acc, call) => {
    acc[call.call_date] = (acc[call.call_date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  return Object.entries(volume).sort(([a], [b]) => a.localeCompare(b));
};

export const getAverageInteractions = (calls: any[]) => {
  const completedCalls = calls.filter(c => c.call_status === 'completed');
  if (completedCalls.length === 0) return (0).toFixed(1);
  const total = completedCalls.reduce((sum, c) => sum + (Number(c.interaction_count) || 0), 0);
  return (total / completedCalls.length).toFixed(1);
};

export const getTotalCalls = (calls: any[]) => calls.length;
export const getCompletedCalls = (calls: any[]) => calls.filter(c => c.call_status === 'completed').length;
export const getConversionRate = (calls: any[]) => {
  const completedCalls = calls.filter(c => c.call_status === 'completed');
  const interested = completedCalls.filter(c => c.final_interest_flag === 'yes').length;
  if (completedCalls.length === 0) return (0).toFixed(1);
  return ((interested / completedCalls.length) * 100).toFixed(1);
};
