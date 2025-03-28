
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BarChart, TrendingDown, PiggyBank, TrendingUp, Search, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
  isActive: boolean;
}

const NavItem = ({ to, icon: Icon, label, isCollapsed, isActive }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/burn-rate", icon: BarChart, label: "Burn Rate" },
    { to: "/expense-reduction", icon: TrendingDown, label: "Expense Reduction" },
    { to: "/funding-readiness", icon: TrendingUp, label: "Funding Readiness" },
    { to: "/cash-flow", icon: PiggyBank, label: "Cash Flow" },
    { to: "/hidden-savings", icon: Search, label: "Hidden Savings" },
  ];

  return (
    <div
      className={cn(
        "bg-sidebar border-r border-sidebar-border min-h-screen transition-all duration-300 flex flex-col",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="font-bold text-lg text-nexo-400">
            NEXO
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className={cn(
            "ml-auto p-2 rounded-md hover:bg-sidebar-accent",
            isCollapsed && "mx-auto"
          )}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-auto py-4 px-3">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isCollapsed={isCollapsed}
              isActive={location.pathname === item.to}
            />
          ))}
        </nav>
      </div>

      <div className="border-t border-sidebar-border p-4">
        {!isCollapsed && (
          <div className="text-xs text-sidebar-foreground/60">
            Nexo Finance v1.0
          </div>
        )}
      </div>
    </div>
  );
}
