
import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { FundingReadinessScore } from '@/components/FundingReadinessScore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const FundingReadiness = () => {
  // Sample improvement tasks
  const improvementTasks = [
    {
      title: "Update Financial Model",
      description: "Create a detailed 3-year financial projection with clear assumptions.",
      impact: "High",
      difficulty: "Medium",
      status: "In Progress"
    },
    {
      title: "Improve Unit Economics",
      description: "Reduce customer acquisition cost by at least 15%.",
      impact: "High",
      difficulty: "Hard",
      status: "Not Started"
    },
    {
      title: "Prepare Investor Deck",
      description: "Create a compelling pitch deck highlighting traction and vision.",
      impact: "High",
      difficulty: "Medium",
      status: "Completed"
    },
    {
      title: "Optimize Burn Rate",
      description: "Reduce monthly burn by implementing cost-saving measures.",
      impact: "Medium",
      difficulty: "Medium",
      status: "In Progress"
    },
    {
      title: "Document Growth Strategy",
      description: "Outline clear GTM strategy with milestones and KPIs.",
      impact: "Medium",
      difficulty: "Easy",
      status: "Not Started"
    }
  ];
  
  // Function to get badge color based on status
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Completed': return 'bg-finance-green text-white';
      case 'In Progress': return 'bg-finance-blue text-white';
      case 'Not Started': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };
  
  // Function to get badge color based on impact
  const getImpactColor = (impact: string) => {
    switch(impact) {
      case 'High': return 'bg-finance-red/10 text-finance-red';
      case 'Medium': return 'bg-finance-yellow/10 text-finance-yellow';
      case 'Low': return 'bg-finance-green/10 text-finance-green';
      default: return 'bg-muted text-muted-foreground';
    }
  };
  
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <DashboardHeader 
          title="Funding Readiness" 
          description="Track and improve your startup's readiness for fundraising"
        />
        
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FundingReadinessScore />
            
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Investor Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Series A Typical Requirements</h3>
                      <Badge variant="outline">Target Round</Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm">ARR</p>
                          <p className="text-sm">$1-3M</p>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div className="bg-nexo-400 h-2 rounded-full w-[30%]"></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Your ARR: $720k</p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm">Growth Rate</p>
                          <p className="text-sm">10-15% MoM</p>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div className="bg-nexo-400 h-2 rounded-full w-[70%]"></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Your Growth Rate: 8% MoM</p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm">Gross Margin</p>
                          <p className="text-sm">60-80%</p>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div className="bg-nexo-400 h-2 rounded-full w-[90%]"></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Your Gross Margin: 72%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Fundraising Timeline Estimate</h3>
                    <div className="w-full bg-secondary h-4 rounded-full relative">
                      <div className="bg-nexo-400 h-4 rounded-full w-[35%]"></div>
                      <div className="absolute top-0 left-[35%] h-4 w-0.5 bg-white"></div>
                      <div className="flex justify-between mt-2 text-xs">
                        <span>Start</span>
                        <span>Fundraising Readiness</span>
                        <span>Target Close</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Estimated time to fundraising readiness: 4-5 months</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Improvement Tasks</CardTitle>
              <Button size="sm">Add Task</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {improvementTasks.map((task, index) => (
                  <div key={index} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{task.title}</h3>
                        <Badge className={getImpactColor(task.impact)}>{task.impact} Impact</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                    </div>
                    <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FundingReadiness;
