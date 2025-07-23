"use client";

import * as React from "react";
import { useState } from "react";
import { USAMap, USAStateAbbreviation } from '@mirawision/usa-map-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { MapPin, TrendingUp, TrendingDown, Map } from 'lucide-react';

export function VPOPerformanceMap() {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const regionData = [
    {
      name: "Texas",
      abbreviation: "TX",
      vpo: 7.2,
      stores: 287,
      change: 5.3,
      cities: ["Austin", "Houston", "Dallas"],
    },
    {
      name: "California",
      abbreviation: "CA",
      vpo: 6.8,
      stores: 234,
      change: -2.1,
      cities: ["Los Angeles", "San Francisco"],
    },
    {
      name: "Florida",
      abbreviation: "FL",
      vpo: 5.9,
      stores: 189,
      change: 8.7,
      cities: ["Miami", "Orlando", "Tampa"],
    },
    {
      name: "New York",
      abbreviation: "NY",
      vpo: 4.3,
      stores: 156,
      change: -1.5,
      cities: ["New York City", "Buffalo"],
    },
    {
      name: "Illinois",
      abbreviation: "IL",
      vpo: 6.1,
      stores: 142,
      change: 3.2,
      cities: ["Chicago", "Rockford"],
    },
    {
      name: "Washington",
      abbreviation: "WA",
      vpo: 5.8,
      stores: 98,
      change: 12.1,
      cities: ["Seattle", "Spokane"],
    },
    {
      name: "Arizona",
      abbreviation: "AZ",
      vpo: 4.9,
      stores: 76,
      change: -2.8,
      cities: ["Phoenix", "Tucson"],
    },
    {
      name: "Georgia",
      abbreviation: "GA",
      vpo: 5.2,
      stores: 89,
      change: 1.8,
      cities: ["Atlanta", "Savannah"],
    },
    {
      name: "Colorado",
      abbreviation: "CO",
      vpo: 5.5,
      stores: 67,
      change: 4.2,
      cities: ["Denver", "Colorado Springs"],
    },
    {
      name: "Oregon",
      abbreviation: "OR",
      vpo: 4.1,
      stores: 45,
      change: -5.8,
      cities: ["Portland", "Eugene"],
    },
    {
      name: "Massachusetts",
      abbreviation: "MA",
      vpo: 3.8,
      stores: 52,
      change: -8.2,
      cities: ["Boston", "Worcester"],
    }
  ];

  const getPerformanceColor = (vpo: number) => {
    if (vpo >= 6.5) return "#64748b"; // Excellent - Dark slate
    if (vpo >= 5.0) return "#94a3b8"; // Average - Light slate
    return "#cbd5e1"; // Poor - Very light slate
  };

  const getPerformanceLevel = (vpo: number) => {
    if (vpo >= 6.5) return "Excellent";
    if (vpo >= 5.0) return "Average";
    return "Poor";
  };

  const handleStateClick = (stateAbbreviation: USAStateAbbreviation) => {
    setSelectedState(stateAbbreviation);
  };

  // Create custom states config for the map
  const customStates = regionData.reduce((config, region) => {
    config[region.abbreviation] = {
      fill: getPerformanceColor(region.vpo),
      onClick: handleStateClick
    };
    return config;
  }, {} as any);

  // Get selected region data
  const selectedRegionData = selectedState 
    ? regionData.find(r => r.abbreviation === selectedState)
    : null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            VPO Performance Map
          </h2>
          <p className="text-gray-600">Velocity per outlet by region - Click states for details</p>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
            <span>Excellent (6.5+)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
            <span>Average (5.0-6.4)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
            <span>Poor ({"<5.0"})</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <div className="lg:col-span-3">
          <Card className="p-4">
            <div className="w-full h-96 flex items-center justify-center">
              <USAMap customStates={customStates} />
            </div>
          </Card>
        </div>
      </div>

      {/* Regional Performance List */}
      <div className="mt-6">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">All Regions Performance</h3>
            {selectedState && (
              <button 
                onClick={() => setSelectedState(null)}
                className="text-sm text-slate-600 hover:text-slate-800 underline"
              >
                Clear selection
              </button>
            )}
          </div>
          <div className="space-y-3">
            {regionData
              .sort((a, b) => b.vpo - a.vpo)
              .filter(region => !selectedState || region.abbreviation === selectedState)
              .map((region) => (
                <div
                  key={region.name}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedState === region.abbreviation
                      ? 'border-slate-500 bg-slate-50 ring-2 ring-slate-200'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedState(region.abbreviation)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: getPerformanceColor(region.vpo) }}
                      ></div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-gray-900">{region.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {region.abbreviation}
                          </Badge>
                          {selectedState === region.abbreviation && (
                            <Badge className="text-xs bg-slate-600">
                              Selected
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {region.cities.join(", ")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">{region.vpo}</p>
                        <p className="text-xs text-gray-600">VPO Score</p>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">{region.stores}</p>
                        <p className="text-xs text-gray-600">Stores</p>
                      </div>

                      <Badge
                        variant={region.change >= 0 ? "default" : "destructive"}
                        className="flex items-center"
                      >
                        {region.change >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(region.change)}%
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {selectedState && (
            <div className="mt-4 p-4 bg-slate-50 rounded-lg border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-700">{selectedRegionData?.vpo}</p>
                  <p className="text-sm text-gray-600">VPO Score</p>
                  <Badge className="mt-1 bg-slate-100 text-slate-700 text-xs">
                    {selectedRegionData && getPerformanceLevel(selectedRegionData.vpo)}
                  </Badge>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{selectedRegionData?.stores}</p>
                  <p className="text-sm text-gray-600">Active Stores</p>
                </div>
                <div className="text-center">
                  <p className={`text-2xl font-bold ${selectedRegionData && selectedRegionData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedRegionData && selectedRegionData.change > 0 ? '+' : ''}{selectedRegionData?.change}%
                  </p>
                  <p className="text-sm text-gray-600">Growth Rate</p>
                </div>
              </div>
              {selectedRegionData && (
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Major Cities</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedRegionData.cities.map((city) => (
                      <Badge key={city} variant="outline" className="text-xs">
                        {city}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}