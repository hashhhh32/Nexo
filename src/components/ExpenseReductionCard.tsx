
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ExpenseReductionProps {
  title: string;
  description: string;
  currentCost: number;
  suggestedCost: number;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
}

export function ExpenseReductionCard({ 
  title, 
  description, 
  currentCost, 
  suggestedCost, 
  category,
  priority
}: ExpenseReductionProps) {
  const savings = currentCost - suggestedCost;
  const savingsPercentage = Math.round((savings / currentCost) * 100);
  
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'High': return 'bg-finance-red text-white';
      case 'Medium': return 'bg-finance-yellow text-black';
      case 'Low': return 'bg-finance-green text-white';
      default: return 'bg-muted text-foreground';
    }
  };
  
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-1">{category}</CardDescription>
          </div>
          <Badge className={getPriorityColor(priority)}>{priority} Priority</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Current Monthly Cost</p>
            <p className="text-lg font-semibold">${currentCost.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <div className="px-4 py-2 bg-finance-green/10 rounded-full">
              <p className="text-finance-green font-medium">Save ${savings.toLocaleString()} ({savingsPercentage}%)</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Suggested Cost</p>
            <p className="text-lg font-semibold">${suggestedCost.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full" variant="default">View Details</Button>
      </CardFooter>
    </Card>
  );
}
