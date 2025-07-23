"use client";

import React from 'react';
import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Store, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Target, 
  DollarSign,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  Share,
  AlertTriangle,
  Crown,
  Zap,
  Eye,
  ChevronDown,
  BarChart3,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';

interface StoreData {
  id: string;
  storeName: string;
  state: string;
  city: string;
  banner: string;
  vpo: number;
  revenue: number;
  units: number;
  revenueContribution: number;
  vsTarget: number;
  vsSPLY: number;
  vsAverage: number;
  marketShare: number;
  trend4Week: number;
  trend13Week: number;
  growthRate: number;
  shareOfHandlers: number;
  weightedDistribution: number;
  skusActive: number;
  positioning: string;
  samplingStatus: string;
  samplingROI: number;
  storeFormat: string;
  trafficLevel: string;
  channel: string;
  lifecycle: string;
  trendData: number[];
}

export function GlobalTableau() {
  const [viewMode, setViewMode] = useState<'store' | 'state' | 'banner'>('store');
  const [sortBy, setSortBy] = useState<keyof StoreData>('vpo');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [performanceTier, setPerformanceTier] = useState<string>('all');
  const [positioningFilter, setPositioningFilter] = useState<string>('all');
  const [samplingFilter, setSamplingFilter] = useState<string>('all');
  const [storeFormatFilter, setStoreFormatFilter] = useState<string>('all');
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Expanded mock store data
  const storeData: StoreData[] = [
    {
      id: '1',
      storeName: 'HEB Central Market - Austin',
      state: 'Texas',
      city: 'Austin',
      banner: 'HEB',
      vpo: 8.7,
      revenue: 487500,
      units: 14500,
      revenueContribution: 3.2,
      vsTarget: 15.3,
      vsSPLY: 23.4,
      vsAverage: 45.2,
      marketShare: 12.8,
      trend4Week: 8.5,
      trend13Week: 12.3,
      growthRate: 18.7,
      shareOfHandlers: 85.0,
      weightedDistribution: 92.5,
      skusActive: 4,
      positioning: 'Cashier',
      samplingStatus: 'Recent (2 weeks)',
      samplingROI: 340,
      storeFormat: 'Premium',
      trafficLevel: 'High',
      channel: 'Circana',
      lifecycle: 'Mature',
      trendData: [6.2, 6.8, 7.1, 7.5, 8.0, 8.3, 8.7]
    },
    {
      id: '2',
      storeName: 'Whole Foods - Beverly Hills',
      state: 'California',
      city: 'Los Angeles',
      banner: 'Whole Foods',
      vpo: 8.4,
      revenue: 456200,
      units: 12900,
      revenueContribution: 3.0,
      vsTarget: 12.1,
      vsSPLY: 19.8,
      vsAverage: 38.9,
      marketShare: 15.2,
      trend4Week: 6.2,
      trend13Week: 15.7,
      growthRate: 22.3,
      shareOfHandlers: 78.0,
      weightedDistribution: 88.0,
      skusActive: 3,
      positioning: 'Queue Line',
      samplingStatus: 'Recent (1 week)',
      samplingROI: 285,
      storeFormat: 'Premium',
      trafficLevel: 'High',
      channel: 'Circana',
      lifecycle: 'Expanding',
      trendData: [5.8, 6.1, 6.5, 7.2, 7.8, 8.1, 8.4]
    },
    {
      id: '3',
      storeName: 'Amazon Fresh - Seattle',
      state: 'Washington',
      city: 'Seattle',
      banner: 'Amazon Fresh',
      vpo: 8.2,
      revenue: 398750,
      units: 12400,
      revenueContribution: 2.6,
      vsTarget: 8.9,
      vsSPLY: 31.2,
      vsAverage: 42.1,
      marketShare: 9.8,
      trend4Week: 12.1,
      trend13Week: 28.5,
      growthRate: 35.6,
      shareOfHandlers: 65.0,
      weightedDistribution: 75.0,
      skusActive: 2,
      positioning: 'Endcap',
      samplingStatus: 'None (>8 weeks)',
      samplingROI: 0,
      storeFormat: 'Traditional',
      trafficLevel: 'Medium',
      channel: 'Amazon',
      lifecycle: 'New',
      trendData: [4.2, 5.1, 6.0, 6.8, 7.3, 7.8, 8.2]
    },
    {
      id: '4',
      storeName: 'HEB Plus - Houston Heights',
      state: 'Texas',
      city: 'Houston',
      banner: 'HEB',
      vpo: 7.9,
      revenue: 423100,
      units: 13800,
      revenueContribution: 2.8,
      vsTarget: 10.5,
      vsSPLY: 17.2,
      vsAverage: 32.1,
      marketShare: 14.5,
      trend4Week: 5.8,
      trend13Week: 11.2,
      growthRate: 16.8,
      shareOfHandlers: 82.0,
      weightedDistribution: 89.0,
      skusActive: 4,
      positioning: 'Cashier',
      samplingStatus: 'Recent (3 weeks)',
      samplingROI: 315,
      storeFormat: 'Premium',
      trafficLevel: 'High',
      channel: 'Circana',
      lifecycle: 'Mature',
      trendData: [6.8, 7.1, 7.3, 7.5, 7.7, 7.8, 7.9]
    },
    {
      id: '5',
      storeName: 'Publix GreenWise - Miami',
      state: 'Florida',
      city: 'Miami',
      banner: 'Publix',
      vpo: 7.1,
      revenue: 372800,
      units: 11200,
      revenueContribution: 2.4,
      vsTarget: 5.8,
      vsSPLY: 16.4,
      vsAverage: 24.7,
      marketShare: 11.3,
      trend4Week: 4.2,
      trend13Week: 9.8,
      growthRate: 12.5,
      shareOfHandlers: 72.0,
      weightedDistribution: 82.0,
      skusActive: 3,
      positioning: 'Cooler Door',
      samplingStatus: 'Recent (3 weeks)',
      samplingROI: 195,
      storeFormat: 'Premium',
      trafficLevel: 'High',
      channel: 'Circana',
      lifecycle: 'Mature',
      trendData: [6.1, 6.3, 6.5, 6.8, 6.9, 7.0, 7.1]
    },
    {
      id: '6',
      storeName: 'Kroger Premium - Dallas',
      state: 'Texas',
      city: 'Dallas',
      banner: 'Kroger',
      vpo: 6.8,
      revenue: 387400,
      units: 11700,
      revenueContribution: 2.5,
      vsTarget: 3.2,
      vsSPLY: 14.8,
      vsAverage: 19.3,
      marketShare: 10.8,
      trend4Week: 2.1,
      trend13Week: 8.5,
      growthRate: 11.2,
      shareOfHandlers: 68.0,
      weightedDistribution: 78.0,
      skusActive: 3,
      positioning: 'Queue Line',
      samplingStatus: 'Recent (1 week)',
      samplingROI: 245,
      storeFormat: 'Premium',
      trafficLevel: 'High',
      channel: 'Circana',
      lifecycle: 'Mature',
      trendData: [6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8]
    },
    {
      id: '7',
      storeName: 'Wegmans - NYC',
      state: 'New York',
      city: 'New York',
      banner: 'Wegmans',
      vpo: 7.6,
      revenue: 359600,
      units: 10800,
      revenueContribution: 2.3,
      vsTarget: 8.9,
      vsSPLY: 21.5,
      vsAverage: 28.4,
      marketShare: 13.2,
      trend4Week: 7.2,
      trend13Week: 18.3,
      growthRate: 19.8,
      shareOfHandlers: 75.0,
      weightedDistribution: 85.0,
      skusActive: 3,
      positioning: 'Cashier',
      samplingStatus: 'Recent (2 weeks)',
      samplingROI: 385,
      storeFormat: 'Premium',
      trafficLevel: 'High',
      channel: 'Circana',
      lifecycle: 'Expanding',
      trendData: [5.9, 6.2, 6.8, 7.1, 7.3, 7.5, 7.6]
    },
    {
      id: '8',
      storeName: 'Fresh Market - Chicago',
      state: 'Illinois',
      city: 'Chicago',
      banner: 'Fresh Market',
      vpo: 7.3,
      revenue: 342900,
      units: 10300,
      revenueContribution: 2.2,
      vsTarget: 6.5,
      vsSPLY: 18.7,
      vsAverage: 25.8,
      marketShare: 12.1,
      trend4Week: 5.4,
      trend13Week: 14.2,
      growthRate: 15.6,
      shareOfHandlers: 71.0,
      weightedDistribution: 81.0,
      skusActive: 3,
      positioning: 'Endcap',
      samplingStatus: 'Recent (4 weeks)',
      samplingROI: 225,
      storeFormat: 'Premium',
      trafficLevel: 'High',
      channel: 'Circana',
      lifecycle: 'Mature',
      trendData: [6.5, 6.7, 6.9, 7.0, 7.1, 7.2, 7.3]
    },
    {
      id: '9',
      storeName: 'HEB Plus - San Antonio',
      state: 'Texas',
      city: 'San Antonio',
      banner: 'HEB',
      vpo: 6.2,
      revenue: 328500,
      units: 9900,
      revenueContribution: 2.1,
      vsTarget: 1.8,
      vsSPLY: 12.3,
      vsAverage: 15.7,
      marketShare: 9.8,
      trend4Week: 1.2,
      trend13Week: 7.8,
      growthRate: 9.5,
      shareOfHandlers: 65.0,
      weightedDistribution: 75.0,
      skusActive: 4,
      positioning: 'Aisle',
      samplingStatus: 'None (>8 weeks)',
      samplingROI: 0,
      storeFormat: 'Traditional',
      trafficLevel: 'Medium',
      channel: 'Circana',
      lifecycle: 'Mature',
      trendData: [5.8, 5.9, 6.0, 6.0, 6.1, 6.1, 6.2]
    },
    {
      id: '10',
      storeName: 'Whole Foods - San Francisco',
      state: 'California',
      city: 'San Francisco',
      banner: 'Whole Foods',
      vpo: 6.5,
      revenue: 315200,
      units: 9400,
      revenueContribution: 2.0,
      vsTarget: 2.5,
      vsSPLY: 13.8,
      vsAverage: 17.2,
      marketShare: 11.5,
      trend4Week: 2.8,
      trend13Week: 9.2,
      growthRate: 10.8,
      shareOfHandlers: 69.0,
      weightedDistribution: 79.0,
      skusActive: 3,
      positioning: 'Queue Line',
      samplingStatus: 'Recent (5 weeks)',
      samplingROI: 165,
      storeFormat: 'Premium',
      trafficLevel: 'High',
      channel: 'Circana',
      lifecycle: 'Mature',
      trendData: [6.0, 6.1, 6.2, 6.3, 6.4, 6.4, 6.5]
    },
    {
      id: '11',
      storeName: 'Target - Phoenix',
      state: 'Arizona',
      city: 'Phoenix',
      banner: 'Target',
      vpo: 5.8,
      revenue: 298400,
      units: 8900,
      revenueContribution: 1.9,
      vsTarget: -2.1,
      vsSPLY: 8.5,
      vsAverage: 12.3,
      marketShare: 8.7,
      trend4Week: -1.2,
      trend13Week: 5.8,
      growthRate: 6.2,
      shareOfHandlers: 58.0,
      weightedDistribution: 68.0,
      skusActive: 2,
      positioning: 'Aisle',
      samplingStatus: 'None (>8 weeks)',
      samplingROI: 0,
      storeFormat: 'Traditional',
      trafficLevel: 'Medium',
      channel: 'Circana',
      lifecycle: 'Mature',
      trendData: [5.5, 5.6, 5.7, 5.7, 5.8, 5.8, 5.8]
    },
    {
      id: '12',
      storeName: 'Walmart Supercenter - Atlanta',
      state: 'Georgia',
      city: 'Atlanta',
      banner: 'Walmart',
      vpo: 4.9,
      revenue: 245600,
      units: 7800,
      revenueContribution: 1.6,
      vsTarget: -8.5,
      vsSPLY: 3.2,
      vsAverage: 5.8,
      marketShare: 6.9,
      trend4Week: -3.2,
      trend13Week: 1.8,
      growthRate: 2.1,
      shareOfHandlers: 45.0,
      weightedDistribution: 55.0,
      skusActive: 2,
      positioning: 'Aisle',
      samplingStatus: 'Recent (6 weeks)',
      samplingROI: 125,
      storeFormat: 'Traditional',
      trafficLevel: 'High',
      channel: 'Circana',
      lifecycle: 'Mature',
      trendData: [4.8, 4.8, 4.9, 4.9, 4.9, 4.9, 4.9]
    },
    {
      id: '13',
      storeName: 'Costco - Denver',
      state: 'Colorado',
      city: 'Denver',
      banner: 'Costco',
      vpo: 5.2,
      revenue: 267800,
      units: 8200,
      revenueContribution: 1.7,
      vsTarget: -5.8,
      vsSPLY: 6.8,
      vsAverage: 8.9,
      marketShare: 7.8,
      trend4Week: -2.1,
      trend13Week: 4.2,
      growthRate: 4.8,
      shareOfHandlers: 52.0,
      weightedDistribution: 62.0,
      skusActive: 1,
      positioning: 'Endcap',
      samplingStatus: 'None (>8 weeks)',
      samplingROI: 0,
      storeFormat: 'Traditional',
      trafficLevel: 'High',
      channel: 'Circana',
      lifecycle: 'Mature',
      trendData: [5.0, 5.0, 5.1, 5.1, 5.2, 5.2, 5.2]
    },
    {
      id: '14',
      storeName: 'Safeway - Portland',
      state: 'Oregon',
      city: 'Portland',
      banner: 'Safeway',
      vpo: 4.3,
      revenue: 198500,
      units: 6800,
      revenueContribution: 1.3,
      vsTarget: -15.2,
      vsSPLY: -2.1,
      vsAverage: 1.2,
      marketShare: 5.8,
      trend4Week: -5.8,
      trend13Week: -1.2,
      growthRate: -0.8,
      shareOfHandlers: 38.0,
      weightedDistribution: 48.0,
      skusActive: 2,
      positioning: 'Aisle',
      samplingStatus: 'None (>8 weeks)',
      samplingROI: 0,
      storeFormat: 'Traditional',
      trafficLevel: 'Medium',
      channel: 'Circana',
      lifecycle: 'Declining',
      trendData: [4.5, 4.4, 4.4, 4.3, 4.3, 4.3, 4.3]
    },
    {
      id: '15',
      storeName: 'Stop & Shop - Boston',
      state: 'Massachusetts',
      city: 'Boston',
      banner: 'Stop & Shop',
      vpo: 3.8,
      revenue: 165400,
      units: 5900,
      revenueContribution: 1.1,
      vsTarget: -22.5,
      vsSPLY: -8.2,
      vsAverage: -5.8,
      marketShare: 4.2,
      trend4Week: -8.5,
      trend13Week: -6.2,
      growthRate: -5.8,
      shareOfHandlers: 32.0,
      weightedDistribution: 42.0,
      skusActive: 1,
      positioning: 'Aisle',
      samplingStatus: 'None (>8 weeks)',
      samplingROI: 0,
      storeFormat: 'Traditional',
      trafficLevel: 'Medium',
      channel: 'Circana',
      lifecycle: 'Declining',
      trendData: [4.2, 4.1, 4.0, 3.9, 3.8, 3.8, 3.8]
    },
    {
      id: '16',
      storeName: 'Corner Store - Rural TX',
      state: 'Florida',
      city: 'Rural',
      banner: 'Independent',
      vpo: 1.2,
      revenue: 12800,
      units: 425,
      revenueContribution: 0.1,
      vsTarget: -45.2,
      vsSPLY: -12.3,
      vsAverage: -78.5,
      marketShare: 2.1,
      trend4Week: -8.2,
      trend13Week: -15.6,
      growthRate: -18.9,
      shareOfHandlers: 25.0,
      weightedDistribution: 30.0,
      skusActive: 1,
      positioning: 'Aisle',
      samplingStatus: 'None (>8 weeks)',
      samplingROI: 0,
      storeFormat: 'Convenience',
      trafficLevel: 'Low',
      channel: 'Direct',
      lifecycle: 'Declining',
      trendData: [2.1, 1.8, 1.6, 1.4, 1.3, 1.2, 1.2]
    }
  ];

  // Quick filter functions
  const applyQuickFilter = (filterType: string) => {
    switch (filterType) {
      case 'top-performers':
        setPerformanceTier(performanceTier === 'top10' ? 'all' : 'top10');
        break;
      case 'sampling-success':
        setSamplingFilter(samplingFilter === 'high-roi' ? 'all' : 'high-roi');
        break;
      case 'premium-positioning':
        setPositioningFilter(positioningFilter === 'premium' ? 'all' : 'premium');
        break;
      case 'growth-leaders':
        setPerformanceTier(performanceTier === 'growth' ? 'all' : 'growth');
        break;
      case 'attention-needed':
        setPerformanceTier(performanceTier === 'bottom10' ? 'all' : 'bottom10');
        break;
      default:
        // Reset all filters
        setPerformanceTier('all');
        setSamplingFilter('all');
        setPositioningFilter('all');
        setSelectedStates([]);
        setStoreFormatFilter('all');
        setChannelFilter('all');
    }
  };

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = storeData.filter(store => {
      // Search filter
      if (searchTerm && !store.storeName.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !store.city.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !store.state.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // State filter
      if (selectedStates.length > 0 && !selectedStates.includes(store.state)) {
        return false;
      }

      // Performance tier filter
      if (performanceTier !== 'all') {
        const sortedByVPO = [...storeData].sort((a, b) => b.vpo - a.vpo);
        const top10Index = Math.ceil(sortedByVPO.length * 0.1);
        const bottom10Index = Math.floor(sortedByVPO.length * 0.9);
        
        switch (performanceTier) {
          case 'top10':
            if (!sortedByVPO.slice(0, top10Index).includes(store)) return false;
            break;
          case 'bottom10':
            if (!sortedByVPO.slice(bottom10Index).includes(store)) return false;
            break;
          case 'growth':
            if (store.growthRate < 20) return false;
            break;
        }
      }

      // Positioning filter
      if (positioningFilter !== 'all') {
        switch (positioningFilter) {
          case 'premium':
            if (!['Cashier', 'Queue Line', 'Endcap'].includes(store.positioning)) return false;
            break;
        }
      }

      // Sampling filter
      if (samplingFilter !== 'all') {
        switch (samplingFilter) {
          case 'high-roi':
            if (store.samplingROI < 300) return false;
            break;
          case 'recent':
            if (!store.samplingStatus.includes('Recent')) return false;
            break;
        }
      }

      // Store format filter
      if (storeFormatFilter !== 'all' && store.storeFormat.toLowerCase() !== storeFormatFilter) {
        return false;
      }

      // Channel filter
      if (channelFilter !== 'all' && store.channel.toLowerCase() !== channelFilter) {
        return false;
      }

      return true;
    });

    // Sort data
    filtered.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
      }
      
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      return sortOrder === 'desc' ? bStr.localeCompare(aStr) : aStr.localeCompare(bStr);
    });

    return filtered;
  }, [storeData, searchTerm, selectedStates, performanceTier, positioningFilter, samplingFilter, storeFormatFilter, channelFilter, sortBy, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredAndSortedData.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStates, performanceTier, positioningFilter, samplingFilter, storeFormatFilter, channelFilter]);

  const handleSort = (column: keyof StoreData) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const toggleRowExpansion = (storeId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(storeId)) {
      newExpanded.delete(storeId);
    } else {
      newExpanded.add(storeId);
    }
    setExpandedRows(newExpanded);
  };

  const getPerformanceColor = (value: number, type: 'vpo' | 'growth' | 'target') => {
    if (type === 'vpo') {
      if (value >= 7) return 'text-slate-700 bg-slate-100';
      if (value >= 5) return 'text-slate-600 bg-slate-50';
      return 'text-slate-500 bg-gray-50';
    }
    if (type === 'growth' || type === 'target') {
      if (value >= 15) return 'text-slate-700 bg-slate-100';
      if (value >= 0) return 'text-slate-600 bg-slate-50';
      return 'text-red-600 bg-red-50';
    }
    return 'text-gray-600 bg-gray-50';
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 5) return <TrendingUp className="h-4 w-4 text-slate-600" />;
    if (trend < -5) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <div className="h-4 w-4" />;
  };

  const renderSparkline = (data: number[]) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    return (
      <div className="flex items-end h-8 w-16 space-x-0.5">
        {data.map((value, index) => {
          const height = range > 0 ? ((value - min) / range) * 100 : 50;
          return (
            <div
              key={index}
              className="bg-slate-400 w-1 rounded-t"
              style={{ height: `${Math.max(height, 10)}%` }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Store Performance Intelligence</h2>
          <p className="text-gray-600">Advanced analytics and comparison across all retail locations</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share View
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={performanceTier === 'top10' ? 'default' : 'outline'}
          size="sm"
          onClick={() => applyQuickFilter('top-performers')}
        >
          <Crown className="h-4 w-4 mr-2" />
          Top Performers
        </Button>
        <Button
          variant={samplingFilter === 'high-roi' ? 'default' : 'outline'}
          size="sm"
          onClick={() => applyQuickFilter('sampling-success')}
        >
          <Zap className="h-4 w-4 mr-2" />
          Sampling Success
        </Button>
        <Button
          variant={positioningFilter === 'premium' ? 'default' : 'outline'}
          size="sm"
          onClick={() => applyQuickFilter('premium-positioning')}
        >
          <Target className="h-4 w-4 mr-2" />
          Premium Positioning
        </Button>
        <Button
          variant={performanceTier === 'growth' ? 'default' : 'outline'}
          size="sm"
          onClick={() => applyQuickFilter('growth-leaders')}
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          Growth Leaders
        </Button>
        <Button
          variant={performanceTier === 'bottom10' ? 'default' : 'outline'}
          size="sm"
          onClick={() => applyQuickFilter('attention-needed')}
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          Attention Needed
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => applyQuickFilter('reset')}
        >
          Clear All
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
            <Input
              placeholder="Store name, city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Performance</label>
            <Select value={performanceTier} onValueChange={setPerformanceTier}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stores</SelectItem>
                <SelectItem value="top10">Top 10%</SelectItem>
                <SelectItem value="above-avg">Above Average</SelectItem>
                <SelectItem value="below-avg">Below Average</SelectItem>
                <SelectItem value="bottom10">Bottom 10%</SelectItem>
                <SelectItem value="growth">Growth Leaders</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Positioning</label>
            <Select value={positioningFilter} onValueChange={setPositioningFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                <SelectItem value="premium">Premium (Cashier/Queue)</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="suboptimal">Suboptimal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Sampling</label>
            <Select value={samplingFilter} onValueChange={setSamplingFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stores</SelectItem>
                <SelectItem value="recent">Recent Sampling</SelectItem>
                <SelectItem value="high-roi">High ROI (>300%)</SelectItem>
                <SelectItem value="none">No Recent Sampling</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Format</label>
            <Select value={storeFormatFilter} onValueChange={setStoreFormatFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Formats</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="traditional">Traditional</SelectItem>
                <SelectItem value="convenience">Convenience</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Channel</label>
            <Select value={channelFilter} onValueChange={setChannelFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Channels</SelectItem>
                <SelectItem value="circana">Circana</SelectItem>
                <SelectItem value="amazon">Amazon</SelectItem>
                <SelectItem value="direct">Direct</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedData.length)} of {filteredAndSortedData.length} stores
          </p>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Show:</label>
            <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as keyof StoreData)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vpo">VPO</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="growthRate">Growth Rate</SelectItem>
              <SelectItem value="vsTarget">vs Target</SelectItem>
              <SelectItem value="vsSPLY">vs SPLY</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Store Details
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('vpo')}
                >
                  VPO {sortBy === 'vpo' && (sortOrder === 'desc' ? '↓' : '↑')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('revenue')}
                >
                  Revenue {sortBy === 'revenue' && (sortOrder === 'desc' ? '↓' : '↑')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('vsTarget')}
                >
                  vs Target {sortBy === 'vsTarget' && (sortOrder === 'desc' ? '↓' : '↑')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('vsSPLY')}
                >
                  vs SPLY {sortBy === 'vsSPLY' && (sortOrder === 'desc' ? '↓' : '↑')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Trend
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Positioning
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Sampling
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedData.map((store) => (
                <React.Fragment key={store.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleRowExpansion(store.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedRows.has(store.id) ? 
                            <ChevronDown className="h-4 w-4" /> : 
                            <ChevronRightIcon className="h-4 w-4" />
                          }
                        </button>
                        <div>
                          <p className="font-medium text-gray-900">{store.storeName}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <MapPin className="h-3 w-3" />
                            <span>{store.city}, {store.state}</span>
                            <Badge variant="outline" className="text-xs">
                              {store.banner}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge className={getPerformanceColor(store.vpo, 'vpo')}>
                        {store.vpo.toFixed(1)}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-gray-900">${(store.revenue / 1000).toFixed(0)}K</p>
                        <p className="text-sm text-gray-500">{store.revenueContribution.toFixed(1)}% of total</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge className={getPerformanceColor(store.vsTarget, 'target')}>
                        {store.vsTarget > 0 ? '+' : ''}{store.vsTarget.toFixed(1)}%
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Badge className={getPerformanceColor(store.vsSPLY, 'growth')}>
                        {store.vsSPLY > 0 ? '+' : ''}{store.vsSPLY.toFixed(1)}%
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(store.trend4Week)}
                        {renderSparkline(store.trendData)}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={['Cashier', 'Queue Line'].includes(store.positioning) ? 'default' : 'outline'}>
                        {store.positioning}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{store.samplingStatus}</p>
                        {store.samplingROI > 0 && (
                          <p className="text-xs text-slate-600">{store.samplingROI}% ROI</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                  
                  {/* Expanded Row Details */}
                  {expandedRows.has(store.id) && (
                    <tr className="bg-slate-50">
                      <td colSpan={9} className="px-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Performance Metrics</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>Units Sold:</span>
                                <span className="font-medium">{store.units.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Market Share:</span>
                                <span className="font-medium">{store.marketShare.toFixed(1)}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Growth Rate:</span>
                                <span className="font-medium">{store.growthRate.toFixed(1)}%</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Distribution</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>Share of Handlers:</span>
                                <span className="font-medium">{store.shareOfHandlers.toFixed(0)}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Weighted Distribution:</span>
                                <span className="font-medium">{store.weightedDistribution.toFixed(0)}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Active SKUs:</span>
                                <span className="font-medium">{store.skusActive}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Store Details</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>Format:</span>
                                <span className="font-medium">{store.storeFormat}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Traffic Level:</span>
                                <span className="font-medium">{store.trafficLevel}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Lifecycle:</span>
                                <span className="font-medium">{store.lifecycle}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRightIcon className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}