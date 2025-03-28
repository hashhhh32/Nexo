
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Generate forecast data based on inputs
const generateForecastData = (
  currentCash: number,
  monthlyRevenue: number,
  monthlyExpenses: number,
  monthlyRevenueGrowth: number,
  monthlyExpensesGrowth: number,
  months: number
) => {
  const data = [];
  let cash = currentCash;
  let revenue = monthlyRevenue;
  let expenses = monthlyExpenses;

  for (let i = 0; i < months; i++) {
    // Calculate cash for this month
    cash = cash + revenue - expenses;
    
    // Add data point
    data.push({
      month: i === 0 ? 'Current' : `Month ${i}`,
      cash: Math.max(0, Math.round(cash)),
      revenue: Math.round(revenue),
      expenses: Math.round(expenses),
    });
    
    // Grow revenue and expenses for next month
    revenue = revenue * (1 + monthlyRevenueGrowth / 100);
    expenses = expenses * (1 + monthlyExpensesGrowth / 100);
  }
  
  return data;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-md p-3 shadow-md">
        <p className="text-sm font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-2 mt-1">
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

export function CashFlowForecast() {
  // Default values
  const [inputs, setInputs] = useState({
    currentCash: 500000,
    monthlyRevenue: 58200,
    monthlyExpenses: 92500,
    monthlyRevenueGrowth: 7,
    monthlyExpensesGrowth: 2,
  });
  
  const [forecastData, setForecastData] = useState(
    generateForecastData(
      inputs.currentCash,
      inputs.monthlyRevenue,
      inputs.monthlyExpenses,
      inputs.monthlyRevenueGrowth,
      inputs.monthlyExpensesGrowth,
      12
    )
  );
  
  const [scenario, setScenario] = useState('default');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };
  
  const updateForecast = () => {
    setForecastData(
      generateForecastData(
        inputs.currentCash,
        inputs.monthlyRevenue,
        inputs.monthlyExpenses,
        inputs.monthlyRevenueGrowth,
        inputs.monthlyExpensesGrowth,
        12
      )
    );
  };
  
  const handleScenarioChange = (value: string) => {
    setScenario(value);
    
    // Apply preset scenarios
    if (value === 'optimistic') {
      setInputs({
        currentCash: 500000,
        monthlyRevenue: 58200,
        monthlyExpenses: 92500,
        monthlyRevenueGrowth: 15,
        monthlyExpensesGrowth: 2,
      });
      
      setForecastData(
        generateForecastData(500000, 58200, 92500, 15, 2, 12)
      );
    } else if (value === 'conservative') {
      setInputs({
        currentCash: 500000,
        monthlyRevenue: 58200,
        monthlyExpenses: 92500,
        monthlyRevenueGrowth: 3,
        monthlyExpensesGrowth: 2,
      });
      
      setForecastData(
        generateForecastData(500000, 58200, 92500, 3, 2, 12)
      );
    } else {
      setInputs({
        currentCash: 500000,
        monthlyRevenue: 58200,
        monthlyExpenses: 92500,
        monthlyRevenueGrowth: 7,
        monthlyExpensesGrowth: 2,
      });
      
      setForecastData(
        generateForecastData(500000, 58200, 92500, 7, 2, 12)
      );
    }
  };
  
  // Calculate runway
  const getRunway = () => {
    const lastPositiveCashIndex = forecastData.findIndex(item => item.cash <= 0) - 1;
    if (lastPositiveCashIndex === -2) {
      return "12+ months"; // All cash values are positive
    }
    return lastPositiveCashIndex === -1 ? "0 months" : `${lastPositiveCashIndex} months`;
  };
  
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>Cash Flow Forecast</CardTitle>
        <CardDescription>Simulate your future cash position</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="default" value={scenario} onValueChange={handleScenarioChange} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="default">Default</TabsTrigger>
            <TabsTrigger value="optimistic">Optimistic</TabsTrigger>
            <TabsTrigger value="conservative">Conservative</TabsTrigger>
          </TabsList>
          
          <div className="mb-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
              <div>
                <Label htmlFor="currentCash">Current Cash</Label>
                <Input
                  id="currentCash"
                  name="currentCash"
                  type="number"
                  value={inputs.currentCash}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="monthlyRevenue">Monthly Revenue</Label>
                <Input
                  id="monthlyRevenue"
                  name="monthlyRevenue"
                  type="number"
                  value={inputs.monthlyRevenue}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="monthlyExpenses">Monthly Expenses</Label>
                <Input
                  id="monthlyExpenses"
                  name="monthlyExpenses"
                  type="number"
                  value={inputs.monthlyExpenses}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="monthlyRevenueGrowth">Revenue Growth (%)</Label>
                <Input
                  id="monthlyRevenueGrowth"
                  name="monthlyRevenueGrowth"
                  type="number"
                  value={inputs.monthlyRevenueGrowth}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="monthlyExpensesGrowth">Expense Growth (%)</Label>
                <Input
                  id="monthlyExpensesGrowth"
                  name="monthlyExpensesGrowth"
                  type="number"
                  value={inputs.monthlyExpensesGrowth}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <Button onClick={updateForecast} className="w-full">Update Forecast</Button>
          </div>
          
          <div className="mb-2 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Estimated Runway</p>
              <p className="font-semibold">{getRunway()}</p>
            </div>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} tick={{ fill: 'rgba(255,255,255,0.7)' }} />
                <YAxis axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} tick={{ fill: 'rgba(255,255,255,0.7)' }} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="cash" stroke="#0C8CE9" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="revenue" stroke="#00C48C" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="expenses" stroke="#FF5B79" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
