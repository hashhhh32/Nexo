
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface ScoreFactorProps {
  name: string;
  score: number;
  maxScore: number;
  description: string;
}

function ScoreFactor({ name, score, maxScore, description }: ScoreFactorProps) {
  const percentage = (score / maxScore) * 100;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          <span className="text-sm font-medium">{name}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="ml-1 cursor-help">
                  <Info className="h-3 w-3 text-muted-foreground" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <span className="text-sm font-medium">{score}/{maxScore}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}

export function FundingReadinessScore() {
  // Sample data - in a real app, this would come from an API
  const overallScore = 73;
  const scoreFactors = [
    {
      name: "Financial Health",
      score: 18,
      maxScore: 25,
      description: "Measures your startup's current financial stability and health."
    },
    {
      name: "Growth Metrics",
      score: 21,
      maxScore: 25,
      description: "Evaluates your growth rate, CAC, LTV, and other key metrics."
    },
    {
      name: "Market Opportunity",
      score: 16,
      maxScore: 20,
      description: "Assesses your total addressable market and growth potential."
    },
    {
      name: "Team & Execution",
      score: 12,
      maxScore: 15,
      description: "Evaluates your team's experience, background, and execution ability."
    },
    {
      name: "Documentation",
      score: 6,
      maxScore: 15,
      description: "Checks if your pitch deck, financial model, and other documents are ready."
    }
  ];
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-finance-green";
    if (score >= 60) return "text-finance-yellow";
    return "text-finance-red";
  };

  const getScoreProgressColor = (score: number) => {
    if (score >= 80) return "bg-finance-green";
    if (score >= 60) return "bg-finance-yellow";
    return "bg-finance-red";
  };
  
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>Funding Readiness Score</CardTitle>
        <CardDescription>How prepared are you for your next funding round?</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-6">
          <div className={`text-5xl font-bold mb-2 ${getScoreColor(overallScore)}`}>
            {overallScore}
          </div>
          <Progress 
            value={overallScore} 
            className="h-3 w-full" 
            indicatorClassName={getScoreProgressColor(overallScore)}
          />
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-4">Score Breakdown</h3>
          {scoreFactors.map((factor, index) => (
            <ScoreFactor key={index} {...factor} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
