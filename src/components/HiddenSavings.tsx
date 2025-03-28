
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, DollarSign, AlertCircle } from 'lucide-react';

interface SavingsOpportunityProps {
  title: string;
  description: string;
  savingsAmount: number;
  type: 'Subscription' | 'Contract' | 'Optimization';
  effort: 'Easy' | 'Medium' | 'Complex';
  priority: 'High' | 'Medium' | 'Low';
}

function SavingsOpportunity({ 
  title, 
  description, 
  savingsAmount, 
  type, 
  effort,
  priority
}: SavingsOpportunityProps) {
  const getEffortColor = (effort: string) => {
    switch(effort) {
      case 'Easy': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Complex': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };
  
  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Subscription': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Contract': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Optimization': return 'bg-teal-500/10 text-teal-500 border-teal-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };
  
  const getPriorityIcon = (priority: string) => {
    switch(priority) {
      case 'High': return <AlertCircle className="h-5 w-5 text-finance-red" />;
      case 'Medium': return <AlertCircle className="h-5 w-5 text-finance-yellow" />;
      case 'Low': return <AlertCircle className="h-5 w-5 text-finance-green" />;
      default: return null;
    }
  };
  
  return (
    <Card className="dashboard-card">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-start gap-3">
            <div className="mt-1">{getPriorityIcon(priority)}</div>
            <div>
              <h3 className="font-medium text-lg">{title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={getTypeColor(type)}>{type}</Badge>
                <Badge className={getEffortColor(effort)}>{effort}</Badge>
              </div>
            </div>
          </div>
          <div className="px-3 py-1 bg-finance-green/10 rounded-full flex items-center">
            <DollarSign className="h-4 w-4 text-finance-green mr-1" />
            <span className="text-finance-green font-medium">${savingsAmount.toLocaleString()}/year</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        <div className="flex justify-end">
          <Button variant="default" className="mr-2">Implement</Button>
          <Button variant="outline">Ignore</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function HiddenSavings() {
  // Sample data - in a real app, this would come from an API
  const savingsOpportunities = [
    {
      title: "Consolidate SaaS Subscriptions",
      description: "You're paying for multiple project management tools (Asana, Monday, and Trello). Consolidating to one platform can save costs.",
      savingsAmount: 5760,
      type: "Subscription" as const,
      effort: "Easy" as const,
      priority: "High" as const
    },
    {
      title: "Renegotiate AWS Contract",
      description: "Based on your usage patterns, you could save by switching to reserved instances instead of on-demand pricing.",
      savingsAmount: 12420,
      type: "Contract" as const,
      effort: "Medium" as const,
      priority: "High" as const
    },
    {
      title: "Optimize Cloud Storage Usage",
      description: "You're storing 72% of rarely accessed data in hot storage. Moving to cold storage would reduce costs.",
      savingsAmount: 8350,
      type: "Optimization" as const,
      effort: "Medium" as const,
      priority: "Medium" as const
    }
  ];
  
  const totalSavings = savingsOpportunities.reduce((total, opportunity) => total + opportunity.savingsAmount, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Hidden Savings Opportunities</h2>
          <p className="text-muted-foreground">AI-detected savings based on your spending patterns</p>
        </div>
        <Card className="dashboard-card bg-finance-green/5 border-finance-green/20">
          <CardContent className="py-3 px-4">
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-finance-green mr-2" />
              <div>
                <p className="text-sm text-muted-foreground">Total Annual Savings</p>
                <p className="text-xl font-bold text-finance-green">${totalSavings.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {savingsOpportunities.map((opportunity, index) => (
          <SavingsOpportunity key={index} {...opportunity} />
        ))}
      </div>
    </div>
  );
}
