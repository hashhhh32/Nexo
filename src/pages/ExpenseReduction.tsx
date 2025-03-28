
import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { ExpenseReductionCard } from '@/components/ExpenseReductionCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ExpenseReduction = () => {
  // Sample expense reduction recommendations
  const recommendations = [
    {
      title: "Reduce SaaS Stack Overlap",
      description: "Multiple collaboration tools with overlapping features. Consolidate to a single platform.",
      currentCost: 4200,
      suggestedCost: 1800,
      category: "SaaS Subscriptions",
      priority: "High" as const
    },
    {
      title: "Optimize Cloud Resources",
      description: "Right-size your cloud instances based on actual usage patterns.",
      currentCost: 6800,
      suggestedCost: 4250,
      category: "Infrastructure",
      priority: "Medium" as const
    },
    {
      title: "Consolidate Marketing Tools",
      description: "Multiple marketing analytics tools with similar features. Choose one comprehensive solution.",
      currentCost: 2400,
      suggestedCost: 1200,
      category: "Marketing",
      priority: "Medium" as const
    },
    {
      title: "Renegotiate Payment Processing",
      description: "Current payment processor charges above market rates. Negotiate or switch providers.",
      currentCost: 8500,
      suggestedCost: 6120,
      category: "Operations",
      priority: "High" as const
    },
    {
      title: "Audit Software Licenses",
      description: "You're paying for unused licenses. Adjust to actual usage levels.",
      currentCost: 3600,
      suggestedCost: 2400,
      category: "SaaS Subscriptions",
      priority: "Low" as const
    }
  ];
  
  const totalCurrentCost = recommendations.reduce((sum, rec) => sum + rec.currentCost, 0);
  const totalSuggestedCost = recommendations.reduce((sum, rec) => sum + rec.suggestedCost, 0);
  const totalSavings = totalCurrentCost - totalSuggestedCost;
  const savingsPercentage = Math.round((totalSavings / totalCurrentCost) * 100);
  
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <DashboardHeader 
          title="Smart Expense Reduction" 
          description="AI-powered recommendations to optimize your spending"
        />
        
        <div className="space-y-6">
          <Card className="dashboard-card bg-gradient-to-r from-nexo-900 to-nexo-700 text-white">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-nexo-100">Current Monthly Cost</p>
                  <p className="text-2xl font-bold">${totalCurrentCost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-nexo-100">Potential Monthly Cost</p>
                  <p className="text-2xl font-bold">${totalSuggestedCost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-nexo-100">Potential Monthly Savings</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold mr-2">${totalSavings.toLocaleString()}</p>
                    <Badge className="bg-nexo-500 text-white">-{savingsPercentage}%</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">All Recommendations</TabsTrigger>
                <TabsTrigger value="high">High Priority</TabsTrigger>
                <TabsTrigger value="saas">SaaS</TabsTrigger>
                <TabsTrigger value="operations">Operations</TabsTrigger>
              </TabsList>
              
              <Button variant="outline">Export Recommendations</Button>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2">
                {recommendations.map((rec, index) => (
                  <ExpenseReductionCard key={index} {...rec} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="high" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2">
                {recommendations
                  .filter(rec => rec.priority === 'High')
                  .map((rec, index) => (
                    <ExpenseReductionCard key={index} {...rec} />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="saas" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2">
                {recommendations
                  .filter(rec => rec.category === 'SaaS Subscriptions')
                  .map((rec, index) => (
                    <ExpenseReductionCard key={index} {...rec} />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="operations" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2">
                {recommendations
                  .filter(rec => rec.category === 'Operations')
                  .map((rec, index) => (
                    <ExpenseReductionCard key={index} {...rec} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ExpenseReduction;
