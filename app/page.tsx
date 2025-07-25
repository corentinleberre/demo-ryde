"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
// Import chart components
import { SalesPerformanceTrend } from "@/components/dashboard/SalesPerformanceTrend";
import { SharePerformanceOverview } from "@/components/dashboard/SharePerformanceOverview";
import { ChannelBreakdown } from "@/components/dashboard/ChannelBreakdown";
import { SamplingImpactAnalysis } from "@/components/dashboard/SamplingImpactAnalysis";
// Import non-chart components
import { StoreExpansionProgress } from "@/components/dashboard/StoreExpansionProgress";
import { TopBottomPerformers } from "@/components/dashboard/TopBottomPerformers";

export default function Dashboard() {
  const [timePeriod, setTimePeriod] = useState("weekly");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 gap-6">
          <Card className="p-6">
            <SalesPerformanceTrend timePeriod={timePeriod} />
          </Card>

          <Card className="p-6">
            <SharePerformanceOverview />
          </Card>

          <Card className="p-6">
            <ChannelBreakdown />
          </Card>

          <Card className="p-6">
            <SamplingImpactAnalysis />
          </Card>

          <Card className="p-6">
            <StoreExpansionProgress />
          </Card>

          <Card className="p-6">
            <TopBottomPerformers />
          </Card>
        </div>
      </div>
    </div>
  );
}
