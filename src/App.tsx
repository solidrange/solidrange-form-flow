
/**
 * MAIN APPLICATION COMPONENT
 * ===========================
 * 
 * This is the main wrapper component for our entire Form Builder application.
 * Think of this as the foundation that holds everything together.
 * 
 * What this component provides:
 * 1. Navigation system (routing) - decides which page to show
 * 2. Global features available throughout the app:
 *    - Toast notifications (popup messages for success/error)
 *    - Tooltips (helpful hover messages)
 *    - Theme system (light/dark mode)
 *    - Data fetching capabilities
 * 
 * The app structure:
 * - Main page ("/") shows the Form Builder dashboard
 * - Any invalid URL shows a "Not Found" page
 */

import React from "react";
import { Toaster } from "@/components/ui/toaster";      // Popup notifications system
import { Toaster as Sonner } from "@/components/ui/sonner";  // Alternative notification system
import { TooltipProvider } from "@/components/ui/tooltip";    // Hover help text system
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";  // Data fetching system
import { BrowserRouter, Routes, Route } from "react-router-dom";  // Page navigation system
import { ThemeProvider } from "@/contexts/ThemeContext";  // Light/dark theme system
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "./pages/Dashboard";
import Forms from "./pages/Forms";
import Submissions from "./pages/Submissions";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound"; // 404 error page

// Create a client for managing data requests and caching
// This helps the app load faster by remembering data it has already fetched
const queryClient = new QueryClient();

/**
 * Main App Component
 * 
 * This wraps the entire application with all the necessary providers.
 * Each provider gives special capabilities to all components inside it:
 * 
 * QueryClientProvider: Enables smart data fetching and caching
 * ThemeProvider: Enables light/dark theme switching
 * TooltipProvider: Enables helpful hover messages
 * BrowserRouter: Enables page navigation
 */
const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            {/* Notification systems - these show popup messages to users */}
            <Toaster />
            <Sonner />
            
            {/* Page routing system - decides which page to show based on URL */}
            <BrowserRouter>
              <AppSidebar />
              <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b">
                  <SidebarTrigger className="-ml-1" />
                  <div className="flex-1">
                    <h1 className="font-semibold">Solidrange Form Builder</h1>
                  </div>
                </header>
                <div className="flex-1 overflow-auto">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/forms" element={<Forms />} />
                    <Route path="/submissions" element={<Submissions />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </SidebarInset>
            </BrowserRouter>
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
