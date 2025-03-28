
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingDown, TrendingUp, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  change?: { value: string; isPositive: boolean };
  icon?: React.ReactNode;
  iconColor?: string;
  tooltip?: string;
}

function MetricCard({ title, value, change, icon, iconColor = "bg-primary/10", tooltip }: MetricCardProps) {
  return (
    <Card className="dashboard-card">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="metric-value mt-2 text-3xl font-bold">{value}</p>
            {change && (
              <div className="flex items-center mt-2">
                {change.isPositive ? (
                  <TrendingUp className="h-4 w-4 text-finance-green mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-finance-red mr-1" />
                )}
                <span
                  className={cn(
                    "text-xs font-medium",
                    change.isPositive ? "text-finance-green" : "text-finance-red"
                  )}
                >
                  {change.value}
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div className={cn("p-2 rounded-full", iconColor)}>
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function FinancialMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <MetricCard
        title="Monthly Burn Rate"
        value="$92,500"
        change={{ value: "12% vs last month", isPositive: false }}
        icon={<TrendingDown className="h-5 w-5 text-finance-red" />}
        iconColor="bg-finance-red/10"
      />
      <MetricCard
        title="Monthly Revenue"
        value="$58,200"
        change={{ value: "8% vs last month", isPositive: true }}
        icon={<TrendingUp className="h-5 w-5 text-finance-green" />}
        iconColor="bg-finance-green/10"
      />
      <MetricCard
        title="Runway Left"
        value="14.2 months"
        icon={<Calendar className="h-5 w-5 text-finance-blue" />}
        iconColor="bg-finance-blue/10"
      />
    </div>
  );
}
