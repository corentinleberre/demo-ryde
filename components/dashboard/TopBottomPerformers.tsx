"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, DollarSign, Package, MapPin } from 'lucide-react';

export function TopBottomPerformers() {
  const [metric, setMetric] = useState<'revenue' | 'vpo' | 'units'>('revenue');

  const performanceData = {
    revenue: {
      top: [
        { name: 'HEB Central Market - Austin', value: 487500, location: 'Austin, TX' },
        { name: 'Whole Foods - Beverly Hills', value: 456200, location: 'Los Angeles, CA' },
        { name: 'HEB Plus - Houston Heights', value: 423100, location: 'Houston, TX' },
        { name: 'Amazon Fresh - Seattle', value: 398750, location: 'Seattle, WA' },
        { name: 'Kroger Premium - Dallas', value: 387400, location: 'Dallas, TX' },
        { name: 'Publix GreenWise - Miami', value: 372800, location: 'Miami, FL' },
        { name: 'Wegmans - NYC', value: 359600, location: 'New York, NY' },
        { name: 'Fresh Market - Chicago', value: 342900, location: 'Chicago, IL' },
        { name: 'HEB Plus - San Antonio', value: 328500, location: 'San Antonio, TX' },
        { name: 'Whole Foods - San Francisco', value: 315200, location: 'San Francisco, CA' }
      ],
      bottom: [
        { name: 'Corner Store - Rural TX', value: 12800, location: 'Rural, TX' },
        { name: 'Mini Mart - Suburbs FL', value: 15600, location: 'Suburbs, FL' },
        { name: 'Gas Station - Highway CA', value: 18200, location: 'Highway, CA' },
        { name: 'Local Shop - Small Town IL', value: 21500, location: 'Small Town, IL' },
        { name: 'Convenience Plus - NY', value: 24800, location: 'Upstate, NY' },
        { name: 'Quick Stop - TX', value: 27300, location: 'East Texas' },
        { name: 'Market Express - CA', value: 29900, location: 'Central Valley, CA' },
        { name: 'Shop N Go - FL', value: 32400, location: 'North FL' },
        { name: 'Fast Mart - IL', value: 35100, location: 'Downstate, IL' },
        { name: 'Stop & Shop - NY', value: 38700, location: 'Western, NY' }
      ]
    },
    vpo: {
      top: [
        { name: 'HEB Central Market - Austin', value: 8.7, location: 'Austin, TX' },
        { name: 'Whole Foods - Beverly Hills', value: 8.4, location: 'Los Angeles, CA' },
        { name: 'Amazon Fresh - Seattle', value: 8.2, location: 'Seattle, WA' },
        { name: 'HEB Plus - Houston Heights', value: 7.9, location: 'Houston, TX' },
        { name: 'Wegmans - NYC', value: 7.6, location: 'New York, NY' },
        { name: 'Fresh Market - Chicago', value: 7.3, location: 'Chicago, IL' },
        { name: 'Publix GreenWise - Miami', value: 7.1, location: 'Miami, FL' },
        { name: 'Kroger Premium - Dallas', value: 6.8, location: 'Dallas, TX' },
        { name: 'Whole Foods - San Francisco', value: 6.5, location: 'San Francisco, CA' },
        { name: 'HEB Plus - San Antonio', value: 6.2, location: 'San Antonio, TX' }
      ],
      bottom: [
        { name: 'Corner Store - Rural TX', value: 1.2, location: 'Rural, TX' },
        { name: 'Mini Mart - Suburbs FL', value: 1.5, location: 'Suburbs, FL' },
        { name: 'Gas Station - Highway CA', value: 1.8, location: 'Highway, CA' },
        { name: 'Local Shop - Small Town IL', value: 2.1, location: 'Small Town, IL' },
        { name: 'Convenience Plus - NY', value: 2.3, location: 'Upstate, NY' },
        { name: 'Quick Stop - TX', value: 2.5, location: 'East Texas' },
        { name: 'Market Express - CA', value: 2.7, location: 'Central Valley, CA' },
        { name: 'Shop N Go - FL', value: 2.9, location: 'North FL' },
        { name: 'Fast Mart - IL', value: 3.1, location: 'Downstate, IL' },
        { name: 'Stop & Shop - NY', value: 3.4, location: 'Western, NY' }
      ]
    },
    units: {
      top: [
        { name: 'HEB Central Market - Austin', value: 14500, location: 'Austin, TX' },
        { name: 'HEB Plus - Houston Heights', value: 13800, location: 'Houston, TX' },
        { name: 'Whole Foods - Beverly Hills', value: 12900, location: 'Los Angeles, CA' },
        { name: 'Amazon Fresh - Seattle', value: 12400, location: 'Seattle, WA' },
        { name: 'Kroger Premium - Dallas', value: 11700, location: 'Dallas, TX' },
        { name: 'Publix GreenWise - Miami', value: 11200, location: 'Miami, FL' },
        { name: 'Wegmans - NYC', value: 10800, location: 'New York, NY' },
        { name: 'Fresh Market - Chicago', value: 10300, location: 'Chicago, IL' },
        { name: 'HEB Plus - San Antonio', value: 9900, location: 'San Antonio, TX' },
        { name: 'Whole Foods - San Francisco', value: 9400, location: 'San Francisco, CA' }
      ],
      bottom: [
        { name: 'Corner Store - Rural TX', value: 425, location: 'Rural, TX' },
        { name: 'Mini Mart - Suburbs FL', value: 520, location: 'Suburbs, FL' },
        { name: 'Gas Station - Highway CA', value: 680, location: 'Highway, CA' },
        { name: 'Local Shop - Small Town IL', value: 750, location: 'Small Town, IL' },
        { name: 'Convenience Plus - NY', value: 890, location: 'Upstate, NY' },
        { name: 'Quick Stop - TX', value: 950, location: 'East Texas' },
        { name: 'Market Express - CA', value: 1100, location: 'Central Valley, CA' },
        { name: 'Shop N Go - FL', value: 1250, location: 'North FL' },
        { name: 'Fast Mart - IL', value: 1380, location: 'Downstate, IL' },
        { name: 'Stop & Shop - NY', value: 1520, location: 'Western, NY' }
      ]
    }
  };

  const formatValue = (value: number, type: string) => {
    if (type === 'revenue') return `$${(value / 1000).toFixed(0)}K`;
    if (type === 'vpo') return value.toFixed(1);
    return `${(value / 1000).toFixed(1)}K`;
  };

  const getMaxValue = (data: any[], type: string) => {
    return Math.max(...data.map(item => item.value));
  };

  const getBarWidth = (value: number, maxValue: number) => {
    return (value / maxValue) * 100;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Performers */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Top Performers</h2>
            <p className="text-gray-600">Best performing stores</p>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant={metric === 'revenue' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMetric('revenue')}
            >
              <DollarSign className="h-4 w-4 mr-1" />
              Revenue
            </Button>
            <Button
              variant={metric === 'vpo' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMetric('vpo')}
            >
              <BarChart className="h-4 w-4 mr-1" />
              VPO
            </Button>
            <Button
              variant={metric === 'units' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMetric('units')}
            >
              <Package className="h-4 w-4 mr-1" />
              Units
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {performanceData[metric].top.map((store, index) => {
            const maxValue = getMaxValue(performanceData[metric].top, metric);
            return (
              <div key={store.name} className="flex items-center space-x-3">
                <Badge variant="outline" className="w-8 h-8 rounded-full p-0 flex items-center justify-center text-xs font-bold">
                  #{index + 1}
                </Badge>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900 text-sm">{store.name}</p>
                    <span className="text-green-600 font-bold">
                      {formatValue(store.value, metric)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      {store.location}
                    </div>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-slate-500 transition-all duration-300"
                        style={{ width: `${getBarWidth(store.value, maxValue)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Bottom Performers */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Bottom Performers</h2>
            <p className="text-gray-600">Stores needing attention</p>
          </div>
        </div>

        <div className="space-y-3">
          {performanceData[metric].bottom.map((store, index) => {
            const maxValue = getMaxValue(performanceData[metric].bottom, metric);
            return (
              <div key={store.name} className="flex items-center space-x-3">
                <Badge variant="destructive" className="w-8 h-8 rounded-full p-0 flex items-center justify-center text-xs font-bold">
                  #{index + 1}
                </Badge>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900 text-sm">{store.name}</p>
                    <span className="text-slate-600 font-bold">
                      {formatValue(store.value, metric)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      {store.location}
                    </div>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-slate-400 transition-all duration-300"
                        style={{ width: `${getBarWidth(store.value, maxValue)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}