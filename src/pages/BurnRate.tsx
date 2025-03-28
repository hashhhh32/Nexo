
import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { FinancialMetrics } from '@/components/FinancialMetrics';
import { BurnRateChart } from '@/components/BurnRateChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const BurnRate = () => {
  // Sample data for expense breakdown
  const expenseData = [
    { name: 'Payroll', value: 45000, color: '#FF5B79' },
    { name: 'SaaS', value: 18000, color: '#0C8CE9' },
    { name: 'Operations', value: 22000, color: '#00C48C' },
    { name: 'Marketing', value: 7500, color: '#FFB946' }
  ];
  
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0);
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalExpenses) * 100).toFixed(1);
      
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
          title="Burn Rate Analysis" 
          description="Detailed breakdown of your monthly expenses"
        />
        
        <div className="space-y-6">
          <FinancialMetrics />
          
          <div className="grid gap-6 md:grid-cols-2">
            <BurnRateChart />
            
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Current Month Expense Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        dataKey="value"
                      >
                        {expenseData.map((entry, index) => (
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
                    <p className="text-sm text-muted-foreground">Total Monthly Expenses</p>
                    <p className="text-xl font-bold">${totalExpenses.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Biggest Expense</p>
                    <p className="text-xl font-bold">Payroll (48.7%)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Expense Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-finance-red/10">
                    <span className="text-finance-red">⚠️</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">SaaS Costs Growing Rapidly</h3>
                    <p className="text-sm text-muted-foreground">Your SaaS expenses have increased by 32% over the last 6 months.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-finance-green/10">
                    <span className="text-finance-green">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Payroll Costs Stable</h3>
                    <p className="text-sm text-muted-foreground">Your payroll expenses have remained within 5% variance over the last 6 months.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-finance-yellow/10">
                    <span className="text-finance-yellow">⚠️</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Marketing Spend Fluctuating</h3>
                    <p className="text-sm text-muted-foreground">Your marketing expenses show high month-to-month variance (±22%).</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BurnRate;
