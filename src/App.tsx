
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import BurnRate from "./pages/BurnRate";
import ExpenseReduction from "./pages/ExpenseReduction";
import FundingReadiness from "./pages/FundingReadiness";
import CashFlow from "./pages/CashFlow";
import HiddenSavings from "./pages/HiddenSavings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/burn-rate" 
              element={
                <ProtectedRoute>
                  <BurnRate />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/expense-reduction" 
              element={
                <ProtectedRoute>
                  <ExpenseReduction />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/funding-readiness" 
              element={
                <ProtectedRoute>
                  <FundingReadiness />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cash-flow" 
              element={
                <ProtectedRoute>
                  <CashFlow />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/hidden-savings" 
              element={
                <ProtectedRoute>
                  <HiddenSavings />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
