
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { BrandProvider } from "@/contexts/BrandContext";
import { BrandingProvider } from "@/components/BrandingProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { TourProvider } from "@/components/tour/TourProvider";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <BrandProvider>
      <BrandingProvider>
        <LanguageProvider>
          <SettingsProvider>
            <AuthProvider>
              <TourProvider>
                <ThemeProvider>
                  <TooltipProvider>
                    <div className="relative min-h-screen">
                      <Toaster />
                      <Sonner />
                      <BrowserRouter>
                        <Routes>
                          <Route path="/login" element={
                            <PublicRoute><Login /></PublicRoute>
                          } />
                          <Route path="/" element={
                            <ProtectedRoute><Index /></ProtectedRoute>
                          } />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </BrowserRouter>
                    </div>
                  </TooltipProvider>
                </ThemeProvider>
              </TourProvider>
            </AuthProvider>
          </SettingsProvider>
        </LanguageProvider>
      </BrandingProvider>
    </BrandProvider>
  </QueryClientProvider>
);

export default App;
