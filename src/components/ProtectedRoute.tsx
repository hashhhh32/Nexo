
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, Role } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: Role;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, profile, isLoading, hasRole } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If role check is required and user doesn't have role
  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-4">Access Restricted</h1>
        <p className="text-muted-foreground text-center max-w-md">
          You need the {requiredRole} role to access this page. Please contact an administrator
          if you believe you should have access to this content.
        </p>
        <Button 
          variant="default" 
          className="mt-8" 
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </div>
    );
  }

  // Return children if everything is fine
  return <>{children}</>;
};

export default ProtectedRoute;
