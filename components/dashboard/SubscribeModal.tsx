import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Mail, Calendar, TrendingUp, FileText, CheckCircle } from 'lucide-react';

interface SubscribeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SubscribeModal({ open, onOpenChange }: SubscribeModalProps) {
  const [email, setEmail] = useState('');
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [frequency, setFrequency] = useState('weekly');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const reportTypes = [
    {
      id: 'performance',
      name: 'Sales Performance Report',
      description: 'Weekly sales trends, revenue, and units sold',
      icon: TrendingUp
    },
    {
      id: 'vpo',
      name: 'VPO Performance Report',
      description: 'Velocity per outlet analysis by region',
      icon: Calendar
    },
    {
      id: 'channel',
      name: 'Channel Performance Report',
      description: 'Performance breakdown by sales channel',
      icon: FileText
    },
    {
      id: 'expansion',
      name: 'Store Expansion Report',
      description: 'Store rollout progress and expansion metrics',
      icon: Mail
    }
  ];

  const handleReportToggle = (reportId: string) => {
    setSelectedReports(prev => 
      prev.includes(reportId) 
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && selectedReports.length > 0) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onOpenChange(false);
        setEmail('');
        setSelectedReports([]);
        setFrequency('weekly');
      }, 2000);
    }
  };

  if (isSubmitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle className="h-16 w-16 text-slate-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Subscription Confirmed!</h3>
            <p className="text-gray-600 text-center">
              You'll receive your selected reports at <strong>{email}</strong>
            </p>
            <Badge className="mt-4 bg-slate-600">
              {frequency.charAt(0).toUpperCase() + frequency.slice(1)} delivery
            </Badge>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-slate-600" />
            <span>Subscribe to Reports</span>
          </DialogTitle>
          <DialogDescription>
            Get automated reports delivered to your inbox. Stay updated on Ryde's performance metrics.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Report Selection */}
          <div className="space-y-3">
            <Label>Select Reports</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reportTypes.map((report) => (
                <div
                  key={report.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedReports.includes(report.id)
                      ? 'border-slate-500 bg-slate-50'
                      : 'border-gray-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={selectedReports.includes(report.id)}
                      onCheckedChange={() => handleReportToggle(report.id)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <report.icon className="h-4 w-4 text-slate-600" />
                        <h4 className="font-medium text-gray-900">{report.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{report.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frequency Selection */}
          <div className="space-y-3">
            <Label>Delivery Frequency</Label>
            <div className="flex space-x-4">
              {['weekly', 'monthly', 'quarterly'].map((freq) => (
                <label key={freq} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="frequency"
                    value={freq}
                    checked={frequency === freq}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="text-slate-600 focus:ring-slate-500"
                  />
                  <span className="text-sm text-gray-700 capitalize">{freq}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Summary */}
          {selectedReports.length > 0 && (
            <div className="p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Subscription Summary</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>• {selectedReports.length} report(s) selected</p>
                <p>• Delivered {frequency} to {email || 'your email'}</p>
                <p>• First report: Next {frequency === 'weekly' ? 'Monday' : frequency === 'monthly' ? 'month' : 'quarter'}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!email || selectedReports.length === 0}
              className="bg-slate-600 hover:bg-slate-700"
            >
              Subscribe to Reports
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}