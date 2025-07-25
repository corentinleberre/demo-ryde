"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Store, TrendingUp, MapPin, Target } from "lucide-react";

// Simple progress component replacement
const SimpleProgress = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className || ""}`}>
    <div
      className="bg-slate-600 h-2 rounded-full transition-all duration-300"
      style={{ width: `${Math.min(100, Math.max(0, value || 0))}%` }}
    />
  </div>
);

export function StoreExpansionProgress() {
  const expansionData = [
    {
      phase: "Phase 1 - Texas",
      target: 500,
      current: 427,
      completion: 85.4,
      stores: [
        { city: "Austin", count: 89, target: 100 },
        { city: "Houston", count: 156, target: 180 },
        { city: "Dallas", count: 124, target: 140 },
        { city: "San Antonio", count: 58, target: 80 },
      ],
    },
    {
      phase: "Phase 2 - California",
      target: 400,
      current: 234,
      completion: 58.5,
      stores: [
        { city: "Los Angeles", count: 98, target: 160 },
        { city: "San Francisco", count: 67, target: 120 },
        { city: "San Diego", count: 45, target: 80 },
        { city: "Sacramento", count: 24, target: 40 },
      ],
    },
    {
      phase: "Phase 3 - Florida",
      target: 350,
      current: 189,
      completion: 54.0,
      stores: [
        { city: "Miami", count: 78, target: 120 },
        { city: "Orlando", count: 52, target: 90 },
        { city: "Tampa", count: 35, target: 80 },
        { city: "Jacksonville", count: 24, target: 60 },
      ],
    },
    {
      phase: "Phase 4 - New York",
      target: 300,
      current: 156,
      completion: 52.0,
      stores: [
        { city: "New York City", count: 89, target: 180 },
        { city: "Buffalo", count: 34, target: 60 },
        { city: "Rochester", count: 18, target: 35 },
        { city: "Albany", count: 15, target: 25 },
      ],
    },
  ];

  const totalTarget = expansionData.reduce(
    (sum, phase) => sum + phase.target,
    0
  );
  const totalCurrent = expansionData.reduce(
    (sum, phase) => sum + phase.current,
    0
  );
  const overallCompletion =
    totalTarget > 0
      ? Math.min(100, Math.max(0, (totalCurrent / totalTarget) * 100))
      : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Store Expansion Progress
          </h2>
          <p className="text-gray-600">
            Rollout progress across target markets
          </p>
        </div>

        <div className="text-right">
          <div className="flex items-center space-x-2 mb-2">
            <Store className="h-5 w-5 text-slate-600" />
            <span className="text-2xl font-bold text-gray-900">
              {totalCurrent.toLocaleString()}
            </span>
            <span className="text-gray-600">
              / {totalTarget.toLocaleString()}
            </span>
          </div>
          <Badge className="bg-slate-600">
            <TrendingUp className="h-3 w-3 mr-1" />
            {overallCompletion.toFixed(1)}% Complete
          </Badge>
        </div>
      </div>

      {/* Overall Progress */}
      <Card className="p-4 mb-6 bg-slate-50 border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-700">
            Overall Expansion Progress
          </h3>
          <span className="text-slate-600 font-bold">
            {overallCompletion.toFixed(1)}%
          </span>
        </div>
        <SimpleProgress value={overallCompletion} className="h-3" />
        <div className="flex justify-between mt-2 text-sm text-slate-600">
          <span>{totalCurrent.toLocaleString()} stores active</span>
          <span>{(totalTarget - totalCurrent).toLocaleString()} remaining</span>
        </div>
      </Card>

      {/* Phase-by-Phase Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {expansionData.map((phase, index) => (
          <Card key={phase.phase} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{phase.phase}</h3>
                <p className="text-sm text-gray-600">
                  {phase.current} / {phase.target} stores
                </p>
              </div>
              <Badge
                variant={
                  phase.completion > 75
                    ? "default"
                    : phase.completion > 50
                    ? "secondary"
                    : "outline"
                }
              >
                {phase.completion.toFixed(1)}%
              </Badge>
            </div>

            <SimpleProgress value={phase.completion} className="mb-4" />

            <div className="space-y-2">
              {phase.stores.map((store) => (
                <div
                  key={store.city}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-700">{store.city}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-900 font-medium">
                      {store.count}
                    </span>
                    <span className="text-gray-500">/ {store.target}</span>
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-500 transition-all duration-300"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(
                              0,
                              store.target > 0
                                ? (store.count / store.target) * 100
                                : 0
                            )
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Status</span>
                <span className="font-medium">
                  {phase.completion > 75
                    ? "On Track"
                    : phase.completion > 50
                    ? "In Progress"
                    : "Starting"}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-slate-600" />
            <span className="font-semibold text-gray-900">Q1 2025 Target</span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-600">1,550</p>
            <p className="text-sm text-gray-600">Total Store Goal</p>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress to Q1 Goal</span>
            <span>{((totalCurrent / 1550) * 100).toFixed(1)}%</span>
          </div>
          <SimpleProgress value={(totalCurrent / 1550) * 100} className="h-2" />
        </div>
      </div>
    </div>
  );
}
