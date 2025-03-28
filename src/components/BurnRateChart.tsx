
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Sample data - in a real app, this would come from an API
const data = [
  { month: 'Jan', Payroll: 45000, SaaS: 15000, Operations: 20000, Marketing: 10000 },
  { month: 'Feb', Payroll: 45000, SaaS: 16000, Operations: 22000, Marketing: 12000 },
  { month: 'Mar', Payroll: 47000, SaaS: 16000, Operations: 18000, Marketing: 15000 },
  { month: 'Apr', Payroll: 47000, SaaS: 17000, Operations: 19000, Marketing: 13000 },
  { month: 'May', Payroll: 48000, SaaS: 17500, Operations: 21000, Marketing: 14000 },
  { month: 'Jun', Payroll: 48000, SaaS: 18000, Operations: 22000, Marketing: 16000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);
    
    return (
      <div className="bg-background border border-border rounded-md p-3 shadow-md">
        <p className="font-medium">{label}</p>
        <p className="text-xs text-muted-foreground mb-2">Total: ${total.toLocaleString()}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <p className="text-xs">{entry.name}:</p>
            </div>
            <p className="text-xs font-medium">${entry.value.toLocaleString()}</p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function BurnRateChart() {
  return (
    <Card className="dashboard-card h-[400px]">
      <CardHeader className="pb-2">
        <CardTitle>Monthly Burn Rate Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} stackOffset="sign">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} tick={{ fill: 'rgba(255,255,255,0.7)' }} />
            <YAxis axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} tick={{ fill: 'rgba(255,255,255,0.7)' }} tickFormatter={(value) => `$${value / 1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="Payroll" stackId="a" fill="#FF5B79" />
            <Bar dataKey="SaaS" stackId="a" fill="#0C8CE9" />
            <Bar dataKey="Operations" stackId="a" fill="#00C48C" />
            <Bar dataKey="Marketing" stackId="a" fill="#FFB946" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
