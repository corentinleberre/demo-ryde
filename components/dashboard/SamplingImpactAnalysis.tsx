"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ComposedChart } from 'recharts';
import { 
  Gift, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Target, 
  DollarSign,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Crown,
  Calendar,
  Store,
  Users,
  Eye,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

export function SamplingImpactAnalysis() {
  const [viewMode, setViewMode] = useState<'region' | 'store'>('region');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('8weeks');
  const [expandedStores, setExpandedStores] = useState<Set<string>>(new Set());

  // Enhanced store-level data with before/after sampling
  const storeData = [
    {
      id: 'heb-austin',
      name: 'HEB Central Market - Austin',
      region: 'Texas',
      location: 'Austin, TX',
      samplingDate: '2024-01-15',
      samplesDistributed: 2500,
      beforeSales: {
        revenue: 28500,
        units: 850,
        vpo: 6.2,
        period: '4 weeks before'
      },
      afterSales: {
        revenue: 42300,
        units: 1280,
        vpo: 8.7,
        period: '4 weeks after'
      },
      weeklyData: [
        { week: 'Week -4', revenue: 6800, units: 205, samples: 0 },
        { week: 'Week -3', revenue: 7100, units: 210, samples: 0 },
        { week: 'Week -2', revenue: 7200, units: 215, samples: 0 },
        { week: 'Week -1', revenue: 7400, units: 220, samples: 0 },
        { week: 'Campaign', revenue: 8500, units: 250, samples: 2500 },
        { week: 'Week +1', revenue: 11200, units: 340, samples: 0 },
        { week: 'Week +2', revenue: 10800, units: 325, samples: 0 },
        { week: 'Week +3', revenue: 10500, units: 315, samples: 0 },
        { week: 'Week +4', revenue: 9800, units: 300, samples: 0 }
      ]
    },
    {
      id: 'whole-foods-la',
      name: 'Whole Foods - Beverly Hills',
      region: 'California',
      location: 'Los Angeles, CA',
      samplingDate: '2024-01-22',
      samplesDistributed: 2200,
      beforeSales: {
        revenue: 24800,
        units: 720,
        vpo: 5.8,
        period: '4 weeks before'
      },
      afterSales: {
        revenue: 38600,
        units: 1150,
        vpo: 8.4,
        period: '4 weeks after'
      },
      weeklyData: [
        { week: 'Week -4', revenue: 6000, units: 175, samples: 0 },
        { week: 'Week -3', revenue: 6200, units: 180, samples: 0 },
        { week: 'Week -2', revenue: 6300, units: 182, samples: 0 },
        { week: 'Week -1', revenue: 6300, units: 183, samples: 0 },
        { week: 'Campaign', revenue: 7800, units: 230, samples: 2200 },
        { week: 'Week +1', revenue: 10200, units: 305, samples: 0 },
        { week: 'Week +2', revenue: 9800, units: 295, samples: 0 },
        { week: 'Week +3', revenue: 9400, units: 280, samples: 0 },
        { week: 'Week +4', revenue: 9200, units: 270, samples: 0 }
      ]
    },
    {
      id: 'amazon-seattle',
      name: 'Amazon Fresh - Seattle',
      region: 'Washington',
      location: 'Seattle, WA',
      samplingDate: '2024-02-01',
      samplesDistributed: 1800,
      beforeSales: {
        revenue: 18200,
        units: 580,
        vpo: 4.2,
        period: '4 weeks before'
      },
      afterSales: {
        revenue: 32400,
        units: 980,
        vpo: 8.2,
        period: '4 weeks after'
      },
      weeklyData: [
        { week: 'Week -4', revenue: 4200, units: 135, samples: 0 },
        { week: 'Week -3', revenue: 4400, units: 140, samples: 0 },
        { week: 'Week -2', revenue: 4600, units: 150, samples: 0 },
        { week: 'Week -1', revenue: 5000, units: 155, samples: 0 },
        { week: 'Campaign', revenue: 6800, units: 210, samples: 1800 },
        { week: 'Week +1', revenue: 8900, units: 270, samples: 0 },
        { week: 'Week +2', revenue: 8200, units: 250, samples: 0 },
        { week: 'Week +3', revenue: 7800, units: 240, samples: 0 },
        { week: 'Week +4', revenue: 7500, units: 220, samples: 0 }
      ]
    },
    {
      id: 'publix-miami',
      name: 'Publix GreenWise - Miami',
      region: 'Florida',
      location: 'Miami, FL',
      samplingDate: '2024-01-29',
      samplesDistributed: 1500,
      beforeSales: {
        revenue: 21600,
        units: 650,
        vpo: 5.2,
        period: '4 weeks before'
      },
      afterSales: {
        revenue: 31200,
        units: 920,
        vpo: 7.1,
        period: '4 weeks after'
      },
      weeklyData: [
        { week: 'Week -4', revenue: 5200, units: 160, samples: 0 },
        { week: 'Week -3', revenue: 5300, units: 162, samples: 0 },
        { week: 'Week -2', revenue: 5500, units: 164, samples: 0 },
        { week: 'Week -1', revenue: 5600, units: 164, samples: 0 },
        { week: 'Campaign', revenue: 6500, units: 195, samples: 1500 },
        { week: 'Week +1', revenue: 8200, units: 245, samples: 0 },
        { week: 'Week +2', revenue: 7900, units: 235, samples: 0 },
        { week: 'Week +3', revenue: 7600, units: 225, samples: 0 },
        { week: 'Week +4', revenue: 7500, units: 215, samples: 0 }
      ]
    },
    {
      id: 'kroger-dallas',
      name: 'Kroger Premium - Dallas',
      region: 'Texas',
      location: 'Dallas, TX',
      samplingDate: '2024-02-05',
      samplesDistributed: 1200,
      beforeSales: {
        revenue: 19800,
        units: 620,
        vpo: 4.8,
        period: '4 weeks before'
      },
      afterSales: {
        revenue: 28900,
        units: 890,
        vpo: 6.8,
        period: '4 weeks after'
      },
      weeklyData: [
        { week: 'Week -4', revenue: 4800, units: 150, samples: 0 },
        { week: 'Week -3', revenue: 4900, units: 155, samples: 0 },
        { week: 'Week -2', revenue: 5000, units: 157, samples: 0 },
        { week: 'Week -1', revenue: 5100, units: 158, samples: 0 },
        { week: 'Campaign', revenue: 6200, units: 190, samples: 1200 },
        { week: 'Week +1', revenue: 7600, units: 235, samples: 0 },
        { week: 'Week +2', revenue: 7300, units: 225, samples: 0 },
        { week: 'Week +3', revenue: 7100, units: 220, samples: 0 },
        { week: 'Week +4', revenue: 6900, units: 210, samples: 0 }
      ]
    }
  ];

  // Calculate regional aggregates
  const regionData = storeData.reduce((acc, store) => {
    if (!acc[store.region]) {
      acc[store.region] = {
        region: store.region,
        storeCount: 0,
        totalSamples: 0,
        beforeRevenue: 0,
        afterRevenue: 0,
        beforeUnits: 0,
        afterUnits: 0,
        stores: []
      };
    }
    
    acc[store.region].storeCount++;
    acc[store.region].totalSamples += store.samplesDistributed;
    acc[store.region].beforeRevenue += store.beforeSales.revenue;
    acc[store.region].afterRevenue += store.afterSales.revenue;
    acc[store.region].beforeUnits += store.beforeSales.units;
    acc[store.region].afterUnits += store.afterSales.units;
    acc[store.region].stores.push(store);
    
    return acc;
  }, {} as any);

  const regionArray = Object.values(regionData).map((region: any) => ({
    ...region,
    revenueGrowth: ((region.afterRevenue - region.beforeRevenue) / region.beforeRevenue * 100),
    unitsGrowth: ((region.afterUnits - region.beforeUnits) / region.beforeUnits * 100),
    avgROI: (region.afterRevenue - region.beforeRevenue) / (region.totalSamples * 0.5) * 100 // Assuming $0.50 per sample cost
  }));

  const getFilteredData = () => {
    if (selectedRegion === 'all') {
      return viewMode === 'region' ? regionArray : storeData;
    }
    return storeData.filter(store => store.region === selectedRegion);
  };

  const toggleStoreExpansion = (storeId: string) => {
    const newExpanded = new Set(expandedStores);
    if (newExpanded.has(storeId)) {
      newExpanded.delete(storeId);
    } else {
      newExpanded.add(storeId);
    }
    setExpandedStores(newExpanded);
  };

  const calculateImpact = (before: number, after: number) => {
    return ((after - before) / before * 100);
  };

  const formatCurrency = (value: number) => `$${(value / 1000).toFixed(1)}K`;
  const formatUnits = (value: number) => `${(value / 1000).toFixed(1)}K`;
  const formatPercent = (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <p key={index} style={{ color: entry.color }}>
                {entry.name}: {entry.name.includes('Revenue') ? formatCurrency(entry.value) : 
                              entry.name.includes('Units') ? formatUnits(entry.value) : 
                              entry.value.toLocaleString()}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sampling Impact Analysis</h2>
          <p className="text-gray-600">Before vs After performance analysis of sampling campaigns</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">View:</label>
            <Select value={viewMode} onValueChange={(value) => setViewMode(value as 'region' | 'store')}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="region">By Region</SelectItem>
                <SelectItem value="store">By Store</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Region:</label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="Texas">Texas</SelectItem>
                <SelectItem value="California">California</SelectItem>
                <SelectItem value="Washington">Washington</SelectItem>
                <SelectItem value="Florida">Florida</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              <Store className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{storeData.length}</p>
              <p className="text-sm text-gray-600">Stores Sampled</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              <Gift className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {storeData.reduce((sum, store) => sum + store.samplesDistributed, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Samples</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {formatPercent(storeData.reduce((sum, store) => 
                  sum + calculateImpact(store.beforeSales.revenue, store.afterSales.revenue), 0) / storeData.length)}
              </p>
              <p className="text-sm text-gray-600">Avg Revenue Growth</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(regionArray.reduce((sum, region) => sum + region.avgROI, 0) / regionArray.length)}%
              </p>
              <p className="text-sm text-gray-600">Avg ROI</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Regional View */}
      {viewMode === 'region' && selectedRegion === 'all' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Performance Comparison</h3>
          <div className="space-y-4">
            {regionArray.map((region) => (
              <div key={region.region} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{region.region}</h4>
                      <p className="text-sm text-gray-600">{region.storeCount} stores • {region.totalSamples.toLocaleString()} samples</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-gray-100 text-gray-800">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {formatPercent(region.revenueGrowth)}
                    </Badge>
                    <Badge className="bg-gray-200 text-gray-800">
                      {Math.round(region.avgROI)}% ROI
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Before Revenue</p>
                    <p className="font-semibold text-gray-900">{formatCurrency(region.beforeRevenue)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">After Revenue</p>
                    <p className="font-semibold text-gray-900">{formatCurrency(region.afterRevenue)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Before Units</p>
                    <p className="font-semibold text-gray-900">{formatUnits(region.beforeUnits)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">After Units</p>
                    <p className="font-semibold text-gray-900">{formatUnits(region.afterUnits)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Store-Level Analysis */}
      {(viewMode === 'store' || selectedRegion !== 'all') && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Store-Level Impact Analysis</h3>
          <div className="space-y-4">
            {getFilteredData().map((store: any) => (
              <div key={store.id} className="border border-gray-200 rounded-lg">
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleStoreExpansion(store.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {expandedStores.has(store.id) ? 
                        <ChevronDown className="h-4 w-4 text-gray-400" /> : 
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      }
                      <div>
                        <h4 className="font-semibold text-gray-900">{store.name}</h4>
                        <p className="text-sm text-gray-600">{store.location} • {store.samplesDistributed.toLocaleString()} samples</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Revenue Growth</p>
                        <Badge className="bg-gray-100 text-gray-800">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {formatPercent(calculateImpact(store.beforeSales.revenue, store.afterSales.revenue))}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">VPO Change</p>
                        <p className="font-semibold text-gray-900">
                          {store.beforeSales.vpo} → {store.afterSales.vpo}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {expandedStores.has(store.id) && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                      {/* Before/After Comparison */}
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">Before vs After Comparison</h5>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Revenue</p>
                              <p className="text-xs text-gray-600">{store.afterSales.period}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">{formatCurrency(store.afterSales.revenue)}</p>
                              <p className="text-sm text-gray-600">{formatCurrency(store.beforeSales.revenue)} → </p>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Units Sold</p>
                              <p className="text-xs text-gray-600">{store.afterSales.period}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">{store.afterSales.units}</p>
                              <p className="text-sm text-gray-600">{store.beforeSales.units} → </p>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium text-gray-700">VPO Score</p>
                              <p className="text-xs text-gray-600">Velocity per outlet</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">{store.afterSales.vpo}</p>
                              <p className="text-sm text-gray-600">{store.beforeSales.vpo} → </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Weekly Trend Chart */}
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">Weekly Performance Trend</h5>
                        <div className="h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={store.weeklyData}>
                              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                              <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                              <YAxis yAxisId="revenue" orientation="left" tick={{ fontSize: 10 }} />
                              <YAxis yAxisId="samples" orientation="right" tick={{ fontSize: 10 }} />
                              <Tooltip content={<CustomTooltip />} />
                              <Bar
                                yAxisId="samples"
                                dataKey="samples"
                                fill="#d1d5db"
                                name="Samples"
                                opacity={0.7}
                              />
                              <Line
                                yAxisId="revenue"
                                type="monotone"
                                dataKey="revenue"
                                stroke="#6b7280"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                                name="Revenue"
                              />
                            </ComposedChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

    </div>
  );
}