"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Target, 
  MapPin, 
  Store, 
  Users, 
  Lightbulb,
  ArrowRight,
  Crown,
  Zap,
  Eye,
  RefreshCw
} from 'lucide-react';

interface Insight {
  id: string;
  type: 'opportunity' | 'alert' | 'trend' | 'recommendation';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  metric: string;
  change: number;
  location?: string;
  action?: string;
  confidence: number;
  category: 'performance' | 'positioning' | 'expansion' | 'sampling';
}

export function AIInsights() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);

  const insights: Insight[] = [
    {
      id: '1',
      type: 'opportunity',
      priority: 'high',
      title: 'Premium Positioning Drives 45% Higher Revenue',
      description: 'Stores with cashier and queue line positioning consistently outperform aisle placement by 45% in revenue generation across all markets.',
      metric: '+45% revenue',
      change: 45,
      action: 'Upgrade positioning in 23 underperforming stores',
      confidence: 94,
      category: 'positioning'
    },
    {
      id: '2',
      type: 'alert',
      priority: 'high',
      title: 'Texas Market Showing Deceleration',
      description: 'Despite strong overall performance, Texas region growth has slowed to 5.3% from 12.8% last quarter, primarily in Dallas and San Antonio markets.',
      metric: '-7.5% growth decline',
      change: -7.5,
      location: 'Texas',
      action: 'Investigate competitive pressure and adjust strategy',
      confidence: 87,
      category: 'performance'
    },
    {
      id: '3',
      type: 'trend',
      priority: 'medium',
      title: 'Sampling ROI Peaks at 340% in Premium Stores',
      description: 'Recent sampling campaigns in premium format stores (HEB Central Market, Whole Foods) deliver 2.3x higher ROI than traditional formats.',
      metric: '340% ROI',
      change: 340,
      action: 'Prioritize sampling in premium locations',
      confidence: 91,
      category: 'sampling'
    },
    {
      id: '4',
      type: 'opportunity',
      priority: 'high',
      title: 'Amazon Channel Accelerating at 31% Growth',
      description: 'Amazon Fresh locations show exceptional velocity growth, outpacing traditional retail by 2.5x. Expansion opportunity identified.',
      metric: '+31% growth',
      change: 31,
      location: 'Amazon Channel',
      action: 'Accelerate Amazon Fresh rollout',
      confidence: 89,
      category: 'expansion'
    },
    {
      id: '5',
      type: 'recommendation',
      priority: 'medium',
      title: 'California Market Ready for Expansion',
      description: 'Current 58.5% store rollout completion with strong VPO performance (6.8) indicates market readiness for accelerated expansion.',
      metric: '6.8 VPO average',
      change: 6.8,
      location: 'California',
      action: 'Fast-track Phase 2 expansion by 3 months',
      confidence: 82,
      category: 'expansion'
    },
    {
      id: '6',
      type: 'alert',
      priority: 'medium',
      title: 'Aisle Positioning Underperforming by 35%',
      description: 'Stores with aisle positioning show 35% lower VPO scores and declining trends. 15 stores require immediate attention.',
      metric: '-35% vs average',
      change: -35,
      action: 'Negotiate better positioning or consider exit',
      confidence: 93,
      category: 'positioning'
    },
    {
      id: '7',
      type: 'trend',
      priority: 'low',
      title: 'Weekend Sales Surge 23% Higher',
      description: 'Data shows consistent weekend performance boost across all channels, with Saturday being the peak day for velocity.',
      metric: '+23% weekend boost',
      change: 23,
      action: 'Optimize weekend inventory and staffing',
      confidence: 76,
      category: 'performance'
    },
    {
      id: '8',
      type: 'opportunity',
      priority: 'high',
      title: 'Cooler Door Placement Shows 28% Lift',
      description: 'Limited cooler door placements demonstrate exceptional performance. Opportunity to negotiate similar positioning in 45+ stores.',
      metric: '+28% performance lift',
      change: 28,
      action: 'Negotiate cooler door placement expansion',
      confidence: 85,
      category: 'positioning'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Insights', icon: Sparkles },
    { id: 'performance', name: 'Performance', icon: TrendingUp },
    { id: 'positioning', name: 'Positioning', icon: Target },
    { id: 'expansion', name: 'Expansion', icon: Store },
    { id: 'sampling', name: 'Sampling', icon: Zap }
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return Crown;
      case 'alert': return AlertTriangle;
      case 'trend': return TrendingUp;
      case 'recommendation': return Lightbulb;
      default: return Sparkles;
    }
  };

  const getInsightColor = (type: string, priority: string) => {
    if (type === 'alert') return 'border-gray-300 bg-gray-50';
    if (type === 'opportunity') return 'border-gray-300 bg-gray-50';
    if (priority === 'high') return 'border-gray-300 bg-gray-50';
    return 'border-gray-200 bg-gray-50';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-gray-200 text-gray-800';
      case 'medium': return 'bg-gray-100 text-gray-700';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'bg-gray-100 text-gray-800';
      case 'alert': return 'bg-gray-200 text-gray-800';
      case 'trend': return 'bg-gray-100 text-gray-700';
      case 'recommendation': return 'bg-gray-200 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInsights = selectedCategory === 'all' 
    ? insights 
    : insights.filter(insight => insight.category === selectedCategory);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate AI analysis refresh
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Sparkles className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI-Driven Insights</h2>
            <p className="text-gray-600">Intelligent analysis and recommendations powered by machine learning</p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center space-x-2"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>{refreshing ? 'Analyzing...' : 'Refresh Insights'}</span>
        </Button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center space-x-2"
          >
            <category.icon className="h-4 w-4" />
            <span>{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInsights
          .sort((a, b) => {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          })
          .map((insight) => {
            const IconComponent = getInsightIcon(insight.type);
            return (
              <Card 
                key={insight.id} 
                className={`p-4 border-l-4 ${getInsightColor(insight.type, insight.priority)} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-5 w-5 text-gray-600" />
                    <Badge className={getPriorityColor(insight.priority)}>
                      {insight.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <Badge variant="outline" className={getTypeColor(insight.type)}>
                    {insight.type}
                  </Badge>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 leading-tight">
                  {insight.title}
                </h3>

                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  {insight.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {insight.change > 0 ? (
                      <TrendingUp className="h-4 w-4 text-gray-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-gray-500" />
                    )}
                    <span className={`font-bold text-sm ${
                      insight.change > 0 ? 'text-gray-700' : 'text-gray-500'
                    }`}>
                      {insight.metric}
                    </span>
                  </div>
                  
                  {insight.location && (
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>{insight.location}</span>
                    </div>
                  )}
                </div>

                {insight.action && (
                  <div className="p-2 bg-white rounded border border-gray-200 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-700">Recommended Action:</span>
                      <ArrowRight className="h-3 w-3 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{insight.action}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                    View Details
                  </Button>
                </div>
              </Card>
            );
          })}
      </div>

      {filteredInsights.length === 0 && (
        <div className="text-center py-12">
          <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No insights found</h3>
          <p className="text-gray-600">Try selecting a different category or refresh the analysis.</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-700">
            {insights.filter(i => i.type === 'opportunity').length}
          </p>
          <p className="text-sm text-gray-600">Opportunities</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-700">
            {insights.filter(i => i.type === 'alert').length}
          </p>
          <p className="text-sm text-gray-600">Alerts</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-700">
            {insights.filter(i => i.type === 'trend').length}
          </p>
          <p className="text-sm text-gray-600">Trends</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-700">
            {insights.filter(i => i.type === 'recommendation').length}
          </p>
          <p className="text-sm text-gray-600">Recommendations</p>
        </div>
      </div>
    </div>
  );
}