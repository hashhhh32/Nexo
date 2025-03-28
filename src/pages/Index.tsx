
import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { FinancialMetrics } from '@/components/FinancialMetrics';
import { BurnRateChart } from '@/components/BurnRateChart';
import { ExpenseReductionCard } from '@/components/ExpenseReductionCard';
import { FundingReadinessScore } from '@/components/FundingReadinessScore';
import { CashFlowForecast } from '@/components/CashFlowForecast';

const Index = () => {
  // Sample expense reduction recommendations data
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
    }
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <DashboardHeader 
          title="Financial Dashboard" 
          description="Your startup's financial health at a glance"
        />
        
        <div className="space-y-6">
          {/* Financial metrics cards */}
          <FinancialMetrics />
          
          {/* Main dashboard grid */}
          <div className="grid gap-6 md:grid-cols-2">
            <BurnRateChart />
            
            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <ExpenseReductionCard key={index} {...rec} />
              ))}
            </div>
          </div>
          
          {/* Bottom sections */}
          <div className="grid gap-6 md:grid-cols-2">
            <FundingReadinessScore />
            <CashFlowForecast />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
