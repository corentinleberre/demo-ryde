"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Target, BarChart3 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export function SharePerformanceOverview() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const shareMetrics = [
    {
      title: "Share of Volume",
      value: 23.7,
      change: 2.3,
      trend: "up",
      icon: BarChart3,
      color: "#64748b",
      data: [{ value: 23.7 }, { value: 76.3 }],
    },
    {
      title: "Share of Value",
      value: 31.2,
      change: 4.8,
      trend: "up",
      icon: Target,
      color: "#475569",
      data: [{ value: 31.2 }, { value: 68.8 }],
    },
  ];

  const COLORS = ["#64748b", "#e2e8f0"];
  const GRAY_COLORS = ["#475569", "#e2e8f0"];

  const getColors = (index: number) => {
    if (index === 0) return COLORS;
    return GRAY_COLORS;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {shareMetrics.map((metric, index) => (
        <Card key={metric.title} className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-lg`}
                style={{ backgroundColor: `${metric.color}15` }}
              >
                <metric.icon
                  className="h-5 w-5"
                  style={{ color: metric.color }}
                />
              </div>
              <h3 className="font-semibold text-gray-900">{metric.title}</h3>
            </div>

            <Badge variant={metric.trend === "up" ? "default" : "destructive"}>
              {metric.trend === "up" ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {Math.abs(metric.change)}%
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold" style={{ color: metric.color }}>
                {metric.value}%
              </p>
              <p className="text-sm text-gray-600 mt-1">vs last period</p>
            </div>

            <div className="w-16 h-16">
              {isClient ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={metric.data}
                      cx="50%"
                      cy="50%"
                      innerRadius={20}
                      outerRadius={30}
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {metric.data.map((entry, idx) => (
                        <Cell
                          key={`cell-${idx}`}
                          fill={getColors(index)[idx]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                  Loading...
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Market Position</span>
              <span className="font-medium">
                {metric.value > 30
                  ? "Leading"
                  : metric.value > 20
                  ? "Strong"
                  : "Growing"}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
