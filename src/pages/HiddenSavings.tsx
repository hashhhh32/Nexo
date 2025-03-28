
import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { HiddenSavings as HiddenSavingsComponent } from '@/components/HiddenSavings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const HiddenSavings = () => {
  // Sample data for savings categories
  const savingsData = [
    { name: 'SaaS Subscriptions', value: 18520, color: '#0C8CE9' },
    { name: 'Infrastructure', value: 24650, color: '#7B61FF' },
    { name: 'Marketing', value: 9200, color: '#FFB946' },
    { name: 'Operations', value: 12600, color: '#00C48C' }
  ];
  
  const totalSavings = savingsData.reduce((sum, item) => sum + item.value, 0);
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalSavings) * 100).toFixed(1);
      
      return (
        <div className="bg-background border border-border rounded-md p-3 shadow-md">
          <p className="font-medium text-sm">{data.name}</p>
          <p className="text-xs">${data.value.toLocaleString()} ({percentage}%)</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <DashboardHeader 
          title="Hidden Savings Finder" 
          description="Discover opportunities to reduce costs and optimize spending"
        />
        
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Potential Savings by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={savingsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        dataKey="value"
                      >
                        {savingsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Annual Savings</p>
                    <p className="text-xl font-bold">${totalSavings.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Biggest Savings Area</p>
                    <p className="text-xl font-bold">Infrastructure</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Savings Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Top Areas to Focus</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm">Infrastructure Optimization</p>
                          <p className="text-sm text-finance-green">$24,650/year</p>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div className="bg-finance-purple h-2 rounded-full w-[100%]"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm">SaaS Consolidation</p>
                          <p className="text-sm text-finance-green">$18,520/year</p>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div className="bg-finance-blue h-2 rounded-full w-[75%]"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm">Operations Efficiency</p>
                          <p className="text-sm text-finance-green">$12,600/year</p>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div className="bg-finance-green h-2 rounded-full w-[51%]"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm">Marketing ROI</p>
                          <p className="text-sm text-finance-green">$9,200/year</p>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div className="bg-finance-yellow h-2 rounded-full w-[37%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Savings Impact Analysis</h3>
                    <p className="text-sm text-muted-foreground mb-3">Implementing all recommended savings would:</p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <span className="inline-block h-2 w-2 bg-finance-green rounded-full mr-2"></span>
                        Reduce monthly burn rate by 18%
                      </li>
                      <li className="flex items-center text-sm">
                        <span className="inline-block h-2 w-2 bg-finance-green rounded-full mr-2"></span>
                        Extend runway by approximately 3.5 months
                      </li>
                      <li className="flex items-center text-sm">
                        <span className="inline-block h-2 w-2 bg-finance-green rounded-full mr-2"></span>
                        Improve gross margin by 7 percentage points
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <HiddenSavingsComponent />
        </div>
      </div>
    </div>
  );
};

export default HiddenSavings;
