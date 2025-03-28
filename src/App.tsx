
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BurnRate from "./pages/BurnRate";
import ExpenseReduction from "./pages/ExpenseReduction";
import FundingReadiness from "./pages/FundingReadiness";
import CashFlow from "./pages/CashFlow";
import HiddenSavings from "./pages/HiddenSavings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/burn-rate" element={<BurnRate />} />
          <Route path="/expense-reduction" element={<ExpenseReduction />} />
          <Route path="/funding-readiness" element={<FundingReadiness />} />
          <Route path="/cash-flow" element={<CashFlow />} />
          <Route path="/hidden-savings" element={<HiddenSavings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
