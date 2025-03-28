
import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { CashFlowForecast } from '@/components/CashFlowForecast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Calendar, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CashFlow = () => {
  // Sample cash inflows and outflows for recent months
  const cashMovements = [
    { date: '2023-06-15', description: 'Customer Payment - Acme Corp', amount: 12500, type: 'inflow' },
    { date: '2023-06-12', description: 'Payroll', amount: 45000, type: 'outflow' },
    { date: '2023-06-10', description: 'Customer Payment - TechStart Ltd', amount: 8750, type: 'inflow' },
    { date: '2023-06-05', description: 'AWS Cloud Services', amount: 4200, type: 'outflow' },
    { date: '2023-06-01', description: 'Office Rent', amount: 5800, type: 'outflow' },
    { date: '2023-05-28', description: 'Customer Payment - GlobalFirm', amount: 15000, type: 'inflow' },
    { date: '2023-05-25', description: 'Marketing Expenses', amount: 7500, type: 'outflow' },
    { date: '2023-05-20', description: 'SaaS Subscriptions', amount: 3200, type: 'outflow' },
  ];
  
  // Sample cash alerts
  const cashAlerts = [
    {
      title: "Large Expense Coming",
      description: "Annual insurance payment of $24,000 due in 15 days.",
      severity: "high"
    },
    {
      title: "Payment Delayed",
      description: "Invoice #1082 payment from TechFirm Inc is 7 days overdue ($15,500).",
      severity: "medium"
    },
    {
      title: "Positive Cash Flow Trend",
      description: "Your net cash flow has been positive for 3 consecutive months.",
      severity: "low"
    }
  ];
  
  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };
  
  // Function to get alert icon based on severity
  const getAlertIcon = (severity: string) => {
    switch(severity) {
      case 'high':
        return <AlertCircle className="h-5 w-5 text-finance-red" />;
      case 'medium':
        return <AlertCircle className="h-5 w-5 text-finance-yellow" />;
      case 'low':
        return <AlertCircle className="h-5 w-5 text-finance-green" />;
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };
  
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <DashboardHeader 
          title="Cash Flow Forecasting" 
          description="Monitor and project your startup's cash position"
        />
        
        <div className="space-y-6">
          <CashFlowForecast />
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Recent Cash Movements</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="inflows">Inflows</TabsTrigger>
                    <TabsTrigger value="outflows">Outflows</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-0 space-y-4">
                    {cashMovements.map((movement, index) => (
                      <div key={index} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-full mr-3 ${movement.type === 'inflow' ? 'bg-finance-green/10' : 'bg-finance-red/10'}`}>
                            {movement.type === 'inflow' ? (
                              <ArrowUp className="h-4 w-4 text-finance-green" />
                            ) : (
                              <ArrowDown className="h-4 w-4 text-finance-red" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{movement.description}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(movement.date)}</p>
                          </div>
                        </div>
                        <p className={`font-medium ${movement.type === 'inflow' ? 'text-finance-green' : 'text-finance-red'}`}>
                          {movement.type === 'inflow' ? '+' : '-'}${movement.amount.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="inflows" className="mt-0 space-y-4">
                    {cashMovements
                      .filter(movement => movement.type === 'inflow')
                      .map((movement, index) => (
                        <div key={index} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0">
                          <div className="flex items-center">
                            <div className="p-2 rounded-full mr-3 bg-finance-green/10">
                              <ArrowUp className="h-4 w-4 text-finance-green" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{movement.description}</p>
                              <p className="text-xs text-muted-foreground">{formatDate(movement.date)}</p>
                            </div>
                          </div>
                          <p className="font-medium text-finance-green">
                            +${movement.amount.toLocaleString()}
                          </p>
                        </div>
                      ))}
                  </TabsContent>
                  
                  <TabsContent value="outflows" className="mt-0 space-y-4">
                    {cashMovements
                      .filter(movement => movement.type === 'outflow')
                      .map((movement, index) => (
                        <div key={index} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0">
                          <div className="flex items-center">
                            <div className="p-2 rounded-full mr-3 bg-finance-red/10">
                              <ArrowDown className="h-4 w-4 text-finance-red" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{movement.description}</p>
                              <p className="text-xs text-muted-foreground">{formatDate(movement.date)}</p>
                            </div>
                          </div>
                          <p className="font-medium text-finance-red">
                            -${movement.amount.toLocaleString()}
                          </p>
                        </div>
                      ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Cash Flow Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cashAlerts.map((alert, index) => (
                    <div key={index} className="flex items-start p-3 rounded-lg border">
                      <div className="mr-3 mt-0.5">
                        {getAlertIcon(alert.severity)}
                      </div>
                      <div>
                        <h3 className="font-medium">{alert.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 rounded-lg bg-nexo-900/50 border border-nexo-700">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-nexo-200 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-nexo-50">Next Cash Planning Meeting</h3>
                      <p className="text-sm text-nexo-200 mt-1">Thursday, June 22nd at 10:00 AM</p>
                      <p className="text-xs text-nexo-300 mt-1">Agenda: Review Q3 cash projections and discuss fundraising timeline</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashFlow;
