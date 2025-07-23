"use client";

import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Mail, TrendingUp, TrendingDown, Edit3, Save, RotateCcw, GripVertical, BarChart3, Eye, Lightbulb, X, Sparkles, User, ChevronDown, LogOut, Settings } from 'lucide-react';
import { SalesPerformanceTrend } from '@/components/dashboard/SalesPerformanceTrend';
import { SharePerformanceOverview } from '@/components/dashboard/SharePerformanceOverview';
import { VPOPerformanceMap } from '@/components/dashboard/VPOPerformanceMap';
import { ChannelBreakdown } from '@/components/dashboard/ChannelBreakdown';
import { TopBottomPerformers } from '@/components/dashboard/TopBottomPerformers';
import { StoreExpansionProgress } from '@/components/dashboard/StoreExpansionProgress';
import { SamplingImpactAnalysis } from '@/components/dashboard/SamplingImpactAnalysis';
import { SubscribeModal } from '@/components/dashboard/SubscribeModal';
import { GlobalTableau } from '@/components/dashboard/GlobalTableau';
import { StorePositioningPerformance } from '@/components/dashboard/StorePositioningPerformance';
import { AIInsights } from '@/components/dashboard/AIInsights';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DashboardComponent {
  id: string;
  name: string;
  component: React.ComponentType<any>;
  props?: any;
  size: 'full' | 'half' | 'third';
  visible: boolean;
}

export default function Dashboard() {
  const [timePeriod, setTimePeriod] = useState('weekly');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showAIRecommendations, setShowAIRecommendations] = useState(true);

  const [dashboardComponents, setDashboardComponents] = useState<DashboardComponent[]>([
    {
      id: 'sales-trend',
      name: 'Sales Performance Trend',
      component: SalesPerformanceTrend,
      props: { timePeriod },
      size: 'full',
      visible: true
    },
    {
      id: 'share-overview',
      name: 'Share Performance Overview',
      component: SharePerformanceOverview,
      size: 'full',
      visible: true
    },
    {
      id: 'vpo-map',
      name: 'VPO Performance Map',
      component: VPOPerformanceMap,
      size: 'full',
      visible: true
    },
    {
      id: 'channel-breakdown',
      name: 'Channel Breakdown',
      component: ChannelBreakdown,
      size: 'full',
      visible: true
    },
    {
      id: 'top-bottom-performers',
      name: 'Top & Bottom Performers',
      component: TopBottomPerformers,
      size: 'full',
      visible: true
    },
    {
      id: 'store-expansion',
      name: 'Store Expansion Progress',
      component: StoreExpansionProgress,
      size: 'full',
      visible: true
    },
    {
      id: 'sampling-impact',
      name: 'Sampling Impact Analysis',
      component: SamplingImpactAnalysis,
      size: 'full',
      visible: true
    },
    {
      id: 'store-positioning',
      name: 'Performance par Position en Magasin',
      component: StorePositioningPerformance,
      size: 'full',
      visible: true
    },
    {
      id: 'global-tableau',
      name: 'Store Performance Intelligence',
      component: GlobalTableau,
      size: 'full',
      visible: true
    },
    {
      id: 'ai-insights',
      name: 'AI-Driven Insights',
      component: AIInsights,
      size: 'full',
      visible: true
    }
  ]);

  const handleDragStart = (e: React.DragEvent, componentId: string) => {
    if (!isEditMode) return;
    setDraggedItem(componentId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!isEditMode) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    if (!isEditMode || !draggedItem) return;
    e.preventDefault();

    const draggedIndex = dashboardComponents.findIndex(c => c.id === draggedItem);
    const targetIndex = dashboardComponents.findIndex(c => c.id === targetId);

    if (draggedIndex !== -1 && targetIndex !== -1 && draggedIndex !== targetIndex) {
      const newComponents = [...dashboardComponents];
      const [draggedComponent] = newComponents.splice(draggedIndex, 1);
      newComponents.splice(targetIndex, 0, draggedComponent);
      setDashboardComponents(newComponents);
    }

    setDraggedItem(null);
  };

  const toggleComponentVisibility = (componentId: string) => {
    setDashboardComponents(prev =>
      prev.map(comp =>
        comp.id === componentId
          ? { ...comp, visible: !comp.visible }
          : comp
      )
    );
  };

  const resetLayout = () => {
    setDashboardComponents(prev =>
      prev.map(comp => ({ ...comp, visible: true }))
    );
  };

  const aiRecommendations = [
    {
      type: 'layout',
      icon: BarChart3,
      title: 'Optimize Dashboard Layout',
      description: 'Based on your usage patterns, consider moving "Sales Performance Trend" to the top for better visibility.',
      action: 'Move to top',
      priority: 'high'
    },
    {
      type: 'visibility',
      icon: Eye,
      title: 'Component Usage Insights',
      description: 'You spend 60% of your time on VPO Performance Map. Consider making it larger or adding related metrics.',
      action: 'Resize component',
      priority: 'medium'
    },
    {
      type: 'performance',
      icon: TrendingUp,
      title: 'Performance Alert',
      description: 'Texas region shows declining trends. Consider adding Texas-specific filters to your main view.',
      action: 'Add filter',
      priority: 'high'
    },
    {
      type: 'efficiency',
      icon: Lightbulb,
      title: 'Workflow Optimization',
      description: 'Hide "Store Expansion Progress" during Q4 to focus on sales performance metrics.',
      action: 'Hide component',
      priority: 'low'
    }
  ];

  const getGridClass = (size: string) => {
    switch (size) {
      case 'half':
        return 'lg:col-span-6';
      case 'third':
        return 'lg:col-span-4';
      default:
        return 'lg:col-span-12';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <img 
                  src="https://ryde-dashboard.v7apps.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fryde-logo.8b5b5dfa.png&w=1080&q=75" 
                  alt="Ryde Logo"
                  className="h-8 brightness-0"
                />
              </div>
              
              {/* Time Period Selector */}
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Period:</label>
                <Select value={timePeriod} onValueChange={setTimePeriod}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="ytd">Year to Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              <Button 
                variant={isEditMode ? "default" : "outline"} 
                size="sm"
                onClick={() => setIsEditMode(!isEditMode)}
              >
                {isEditMode ? (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Layout
                  </>
                ) : (
                  <>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Layout
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowSubscribeModal(true)}
              >
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              {/* User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 px-3 py-2 h-auto">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/api/placeholder/32/32" alt="Frank Marineau" />
                      <AvatarFallback className="bg-slate-600 text-white text-sm font-semibold">
                        FM
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left hidden sm:block">
                      <p className="text-sm font-medium text-gray-900">Frank Marineau</p>
                      <p className="text-xs text-gray-500">Volume7</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">Frank Marineau</p>
                      <p className="text-xs text-gray-500">frank.marineau@volume7.io</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="px-2 py-1 bg-slate-100 rounded text-xs font-medium text-slate-700">
                          Volume7
                        </div>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Dashboard Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Mode Banner */}
      {isEditMode && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Edit3 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Edit Mode Active</span>
                </div>
                <span className="text-sm text-blue-700">Drag components to reorder • Toggle visibility</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={resetLayout}
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Layout
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Recommendations Panel */}
      {isEditMode && showAIRecommendations && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-900">AI Layout Recommendations</h3>
                  <p className="text-sm text-purple-700">Optimize your dashboard based on usage patterns and performance insights</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAIRecommendations(false)}
                className="text-purple-600 hover:text-purple-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiRecommendations.map((rec, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-purple-200">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      rec.priority === 'high' ? 'bg-red-100' :
                      rec.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                    }`}>
                      <rec.icon className={`h-4 w-4 ${
                        rec.priority === 'high' ? 'text-red-600' :
                        rec.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-medium text-gray-900">{rec.title}</h4>
                        <Badge variant={
                          rec.priority === 'high' ? 'destructive' :
                          rec.priority === 'medium' ? 'default' : 'secondary'
                        } className="text-xs">
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{rec.description}</p>
                      <Button size="sm" variant="outline" className="text-xs">
                        {rec.action}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Bar */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Brand:</label>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                <SelectItem value="ryde-original">Ryde Original</SelectItem>
                <SelectItem value="ryde-zero">Ryde Zero</SelectItem>
                <SelectItem value="ryde-energy">Ryde Energy</SelectItem>
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
                <SelectItem value="texas">Texas</SelectItem>
                <SelectItem value="california">California</SelectItem>
                <SelectItem value="florida">Florida</SelectItem>
                <SelectItem value="newyork">New York</SelectItem>
                <SelectItem value="illinois">Illinois</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Channel:</label>
            <Select value={selectedChannel} onValueChange={setSelectedChannel}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Channels</SelectItem>
                <SelectItem value="circana">Circana Accounts</SelectItem>
                <SelectItem value="amazon">Amazon</SelectItem>
                <SelectItem value="tiktok">TikTok Shop</SelectItem>
                <SelectItem value="direct">Direct Accounts</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Component Visibility Controls (Edit Mode) */}
        {isEditMode && (
          <Card className="p-4 mb-6 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Component Visibility</h3>
            <div className="flex flex-wrap gap-2">
              {dashboardComponents.map((component) => (
                <Button
                  key={component.id}
                  variant={component.visible ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleComponentVisibility(component.id)}
                  className="text-xs"
                >
                  {component.name}
                </Button>
              ))}
            </div>
          </Card>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {dashboardComponents
            .filter(component => component.visible)
            .map((component) => {
              const Component = component.component;
              return (
                <div
                  key={component.id}
                  className={`${getGridClass(component.size)} ${
                    isEditMode ? 'cursor-move' : ''
                  } ${draggedItem === component.id ? 'opacity-50' : ''}`}
                  draggable={isEditMode}
                  onDragStart={(e) => handleDragStart(e, component.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, component.id)}
                >
                  <Card className={`p-6 h-full ${isEditMode ? 'border-2 border-dashed border-blue-300 hover:border-blue-400' : ''}`}>
                    {isEditMode && (
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                        <div className="flex items-center space-x-2">
                          <GripVertical className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">{component.name}</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleComponentVisibility(component.id)}
                          className="text-xs"
                        >
                          Hide
                        </Button>
                      </div>
                    )}
                    <Component {...(component.props || {})} />
                  </Card>
                </div>
              );
            })}
        </div>

      </div>

      {/* Subscribe Modal */}
      <SubscribeModal 
        open={showSubscribeModal} 
        onOpenChange={setShowSubscribeModal} 
      />
    </div>
  );
}