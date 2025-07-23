"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Store, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Target, 
  Crown,
  Medal,
  Award
} from 'lucide-react';

export function StorePositioningPerformance() {
  const [selectedPosition, setSelectedPosition] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'vpo' | 'revenue' | 'growth'>('vpo');
  const [showAllStores, setShowAllStores] = useState<boolean>(false);

  const positioningData = {
    'Cashier': [
      { 
        name: 'HEB Central Market - Austin', 
        location: 'Austin, TX', 
        vpo: 8.7, 
        revenue: 487500, 
        growth: 18.7,
        positioning: 'Cashier',
        rank: 1
      },
      { 
        name: 'HEB Plus - Houston Heights', 
        location: 'Houston, TX', 
        vpo: 7.9, 
        revenue: 423100, 
        growth: 16.8,
        positioning: 'Cashier',
        rank: 2
      },
      { 
        name: 'Wegmans - NYC', 
        location: 'New York, NY', 
        vpo: 7.6, 
        revenue: 359600, 
        growth: 19.8,
        positioning: 'Cashier',
        rank: 3
      },
      { 
        name: 'Kroger Premium - Dallas', 
        location: 'Dallas, TX', 
        vpo: 6.8, 
        revenue: 387400, 
        growth: 11.2,
        positioning: 'Cashier',
        rank: 4
      }
    ],
    'Queue Line': [
      { 
        name: 'Whole Foods - Beverly Hills', 
        location: 'Los Angeles, CA', 
        vpo: 8.4, 
        revenue: 456200, 
        growth: 22.3,
        positioning: 'Queue Line',
        rank: 1
      },
      { 
        name: 'Whole Foods - San Francisco', 
        location: 'San Francisco, CA', 
        vpo: 6.5, 
        revenue: 315200, 
        growth: 10.8,
        positioning: 'Queue Line',
        rank: 2
      }
    ],
    'Endcap': [
      { 
        name: 'Amazon Fresh - Seattle', 
        location: 'Seattle, WA', 
        vpo: 8.2, 
        revenue: 398750, 
        growth: 35.6,
        positioning: 'Endcap',
        rank: 1
      },
      { 
        name: 'Fresh Market - Chicago', 
        location: 'Chicago, IL', 
        vpo: 7.3, 
        revenue: 342900, 
        growth: 15.6,
        positioning: 'Endcap',
        rank: 2
      },
      { 
        name: 'Costco - Denver', 
        location: 'Denver, CO', 
        vpo: 5.2, 
        revenue: 267800, 
        growth: 4.8,
        positioning: 'Endcap',
        rank: 3
      }
    ],
    'Cooler Door': [
      { 
        name: 'Publix GreenWise - Miami', 
        location: 'Miami, FL', 
        vpo: 7.1, 
        revenue: 372800, 
        growth: 12.5,
        positioning: 'Cooler Door',
        rank: 1
      }
    ],
    'Aisle': [
      { 
        name: 'HEB Plus - San Antonio', 
        location: 'San Antonio, TX', 
        vpo: 6.2, 
        revenue: 328500, 
        growth: 9.5,
        positioning: 'Aisle',
        rank: 1
      },
      { 
        name: 'Target - Phoenix', 
        location: 'Phoenix, AZ', 
        vpo: 5.8, 
        revenue: 298400, 
        growth: 6.2,
        positioning: 'Aisle',
        rank: 2
      },
      { 
        name: 'Walmart Supercenter - Atlanta', 
        location: 'Atlanta, GA', 
        vpo: 4.9, 
        revenue: 245600, 
        growth: 2.1,
        positioning: 'Aisle',
        rank: 3
      },
      { 
        name: 'Safeway - Portland', 
        location: 'Portland, OR', 
        vpo: 4.3, 
        revenue: 198500, 
        growth: -0.8,
        positioning: 'Aisle',
        rank: 4
      },
      { 
        name: 'Stop & Shop - Boston', 
        location: 'Boston, MA', 
        vpo: 3.8, 
        revenue: 165400, 
        growth: -5.8,
        positioning: 'Aisle',
        rank: 5
      }
    ]
  };

  // Calculate position averages
  const positionAverages = Object.entries(positioningData).map(([position, stores]) => {
    const avgVPO = stores.reduce((sum, store) => sum + store.vpo, 0) / stores.length;
    const avgRevenue = stores.reduce((sum, store) => sum + store.revenue, 0) / stores.length;
    const avgGrowth = stores.reduce((sum, store) => sum + store.growth, 0) / stores.length;
    const storeCount = stores.length;
    
    return {
      position,
      avgVPO: Number(avgVPO.toFixed(1)),
      avgRevenue: Math.round(avgRevenue),
      avgGrowth: Number(avgGrowth.toFixed(1)),
      storeCount,
      stores
    };
  }).sort((a, b) => b.avgVPO - a.avgVPO);

  const getFilteredData = () => {
    if (selectedPosition === 'all') {
      return Object.values(positioningData).flat().sort((a, b) => {
        if (sortBy === 'vpo') return b.vpo - a.vpo;
        if (sortBy === 'revenue') return b.revenue - a.revenue;
        return b.growth - a.growth;
      });
    }
    return positioningData[selectedPosition as keyof typeof positioningData] || [];
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-4 w-4 text-gray-600" />;
    if (rank === 2) return <Medal className="h-4 w-4 text-gray-500" />;
    if (rank === 3) return <Award className="h-4 w-4 text-gray-400" />;
    return <span className="text-sm font-bold text-gray-500">#{rank}</span>;
  };

  const getPositionColor = (position: string) => {
    const colors = {
      'Cashier': 'bg-gray-100 text-gray-800',
      'Queue Line': 'bg-gray-200 text-gray-800',
      'Endcap': 'bg-gray-300 text-gray-800',
      'Cooler Door': 'bg-gray-400 text-gray-800',
      'Aisle': 'bg-gray-100 text-gray-800'
    };
    return colors[position as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatValue = (value: number, type: string) => {
    if (type === 'revenue') return `$${(value / 1000).toFixed(0)}K`;
    if (type === 'growth') return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
    return value.toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Store Positioning Performance</h2>
          <p className="text-gray-600">Best performing stores by in-store positioning</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Position:</label>
            <Select value={selectedPosition} onValueChange={setSelectedPosition}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                <SelectItem value="Cashier">Cashier</SelectItem>
                <SelectItem value="Queue Line">Queue Line</SelectItem>
                <SelectItem value="Endcap">Endcap</SelectItem>
                <SelectItem value="Cooler Door">Cooler Door</SelectItem>
                <SelectItem value="Aisle">Aisle</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'vpo' | 'revenue' | 'growth')}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vpo">VPO</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="growth">Growth</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Position Performance Overview */}
      {selectedPosition === 'all' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview by Position</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {positionAverages.map((pos, index) => (
              <div key={pos.position} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <Badge className={getPositionColor(pos.position)}>
                    {pos.position}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    {getRankIcon(index + 1)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg VPO:</span>
                    <span className="font-semibold text-gray-900">{pos.avgVPO}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Revenue:</span>
                    <span className="font-semibold text-gray-900">{formatValue(pos.avgRevenue, 'revenue')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Growth:</span>
                    <span className={`font-semibold ${pos.avgGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatValue(pos.avgGrowth, 'growth')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Stores:</span>
                    <span className="font-semibold text-gray-900">{pos.storeCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Store Rankings */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {selectedPosition === 'all' ? 'Overall Ranking' : `Top Stores - ${selectedPosition}`}
          </h3>
          <Badge variant="outline">
            {getFilteredData().length} store{getFilteredData().length > 1 ? 's' : ''}
          </Badge>
        </div>

        <div className="space-y-3 mb-4">
          {getFilteredData().slice(0, showAllStores ? undefined : 5).map((store, index) => (
            <div key={`${store.name}-${store.positioning}`} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8">
                  {selectedPosition === 'all' ? getRankIcon(index + 1) : getRankIcon(store.rank)}
                </div>
                
                <div>
                  <p className="font-semibold text-gray-900">{store.name}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-3 w-3" />
                    <span>{store.location}</span>
                    {selectedPosition === 'all' && (
                      <Badge className={`${getPositionColor(store.positioning)} text-xs`}>
                        {store.positioning}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{store.vpo}</p>
                  <p className="text-xs text-gray-600">VPO</p>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{formatValue(store.revenue, 'revenue')}</p>
                  <p className="text-xs text-gray-600">Revenue</p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    {store.growth >= 0 ? 
                      <TrendingUp className="h-4 w-4 text-gray-600" /> : 
                      <TrendingDown className="h-4 w-4 text-gray-500" />
                    }
                    <span className={`font-bold ${store.growth >= 0 ? 'text-gray-700' : 'text-gray-500'}`}>
                      {formatValue(store.growth, 'growth')}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">Growth</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Show More Button */}
        {getFilteredData().length > 5 && (
          <div className="flex justify-center pt-4 border-t border-gray-100">
            <Button
              variant="outline"
              onClick={() => setShowAllStores(!showAllStores)}
              className="flex items-center space-x-2"
            >
              <span>
                {showAllStores 
                  ? 'Show Less' 
                  : `Show More (${getFilteredData().length - 5} remaining)`
                }
              </span>
            </Button>
          </div>
        )}
      </Card>

    </div>
  );
}