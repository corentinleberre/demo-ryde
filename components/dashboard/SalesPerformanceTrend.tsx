"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface SalesPerformanceTrendProps {
  timePeriod: string;
}

export function SalesPerformanceTrend({ timePeriod }: SalesPerformanceTrendProps) {
  // Generate mock data based on time period
  const generateData = () => {
    const periods = timePeriod === 'weekly' ? 12 : timePeriod === 'monthly' ? 12 : 5;
    const data = [];
    
    for (let i = 0; i < periods; i++) {
      const baseRevenue = 2800000 + (i * 150000) + (Math.random() - 0.5) * 400000;
      const baseUnits = 145000 + (i * 8000) + (Math.random() - 0.5) * 20000;
      
      let period = '';
      if (timePeriod === 'weekly') {
        period = `Week ${i + 1}`;
      } else if (timePeriod === 'monthly') {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        period = months[i];
      } else {
        period = `${2020 + i}`;
      }
      
      data.push({
        period,
        revenue: Math.round(baseRevenue),
        units: Math.round(baseUnits),
      });
    }
    
    return data;
  };

  const data = generateData();
  const currentRevenue = data[data.length - 1]?.revenue || 0;
  const previousRevenue = data[data.length - 2]?.revenue || 0;
  const revenueChange = ((currentRevenue - previousRevenue) / previousRevenue * 100);

  const currentUnits = data[data.length - 1]?.units || 0;
  const previousUnits = data[data.length - 2]?.units || 0;
  const unitsChange = ((currentUnits - previousUnits) / previousUnits * 100);

  const formatValue = (value: number, type: string) => {
    if (type === 'revenue') {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `${(value / 1000).toFixed(0)}K`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-slate-600">
              Revenue: ${(payload[0].value / 1000000).toFixed(2)}M
            </p>
            <p className="text-slate-600">
              Units: {(payload[1].value / 1000).toFixed(0)}K
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sales Performance Trend</h2>
          <p className="text-gray-600">Revenue and units sold over time</p>
        </div>
        
        <div className="flex space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Revenue Change</p>
            <Badge variant={revenueChange >= 0 ? 'default' : 'destructive'} className="flex items-center">
              {revenueChange >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {Math.abs(revenueChange).toFixed(1)}%
            </Badge>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Units Change</p>
            <Badge variant={unitsChange >= 0 ? 'default' : 'destructive'} className="flex items-center">
              {unitsChange >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {Math.abs(unitsChange).toFixed(1)}%
            </Badge>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="period" 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              yAxisId="revenue"
              orientation="left"
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#e5e7eb' }}
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
            />
            <YAxis 
              yAxisId="units"
              orientation="right"
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#e5e7eb' }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              yAxisId="revenue"
              type="monotone"
              dataKey="revenue"
              stroke="#64748b"
              strokeWidth={3}
              dot={{ r: 4, fill: '#64748b' }}
              activeDot={{ r: 6, fill: '#64748b' }}
              name="Revenue"
            />
            <Line
              yAxisId="units"
              type="monotone"
              dataKey="units"
              stroke="#94a3b8"
              strokeWidth={3}
              dot={{ r: 4, fill: '#94a3b8' }}
              activeDot={{ r: 6, fill: '#94a3b8' }}
              name="Units Sold"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}