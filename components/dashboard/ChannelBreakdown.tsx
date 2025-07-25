"use client";

import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

export function ChannelBreakdown() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const channelData = [
    {
      name: "Circana Accounts",
      value: 45,
      revenue: 1845000,
      change: 3.2,
      color: "#64748b",
    },
    {
      name: "Amazon",
      value: 25,
      revenue: 1025000,
      change: 12.5,
      color: "#475569",
    },
    {
      name: "TikTok Shop",
      value: 15,
      revenue: 615000,
      change: 28.7,
      color: "#6b7280",
    },
    {
      name: "Direct Accounts",
      value: 15,
      revenue: 615000,
      change: -2.1,
      color: "#9ca3af",
    },
  ];

  const totalRevenue = channelData.reduce(
    (sum, channel) => sum + channel.revenue,
    0
  );

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold mb-2">{data.name}</p>
          <div className="space-y-1">
            <p>Share: {data.value}%</p>
            <p>Revenue: ${(data.revenue / 1000000).toFixed(2)}M</p>
            <p
              className={`flex items-center ${
                data.change >= 0 ? "text-slate-600" : "text-slate-500"
              }`}
            >
              {data.change >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {Math.abs(data.change)}% vs last period
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent > 0.05) {
      // Only show label if slice is bigger than 5%
      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          fontSize={12}
          fontWeight="bold"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Channel Performance
          </h2>
          <p className="text-gray-600">Revenue distribution by sales channel</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">
            ${(totalRevenue / 1000000).toFixed(1)}M
          </p>
          <p className="text-sm text-gray-600">Total Revenue</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Left Side */}
        <div className="h-64">
          {isClient ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Loading chart...
            </div>
          )}
        </div>

        {/* Channel List - Right Side */}
        <div className="space-y-3">
          {channelData.map((channel) => (
            <div
              key={channel.name}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: channel.color }}
                ></div>
                <div>
                  <p className="font-medium text-gray-900">{channel.name}</p>
                  <p className="text-sm text-gray-600">
                    ${(channel.revenue / 1000000).toFixed(1)}M
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold text-gray-900">
                  {channel.value}%
                </span>
                <Badge
                  variant={channel.change >= 0 ? "default" : "destructive"}
                  className="text-xs"
                >
                  {channel.change >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(channel.change)}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
