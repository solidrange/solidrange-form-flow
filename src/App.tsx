
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
 *    - Language system (internationalization)
 *    - Brand system (comprehensive color theming)
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
import { BrandProvider } from "@/contexts/BrandContext";  // Brand identity system
import { BrandingProvider } from "@/components/BrandingProvider";  // Brand styling system
import { LanguageProvider } from "@/contexts/LanguageContext";  // Language system
import Index from "./pages/Index";      // Main Form Builder page
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
 * LanguageProvider: Enables internationalization support
 * BrandProvider: Enables brand identity management
 * ThemeProvider: Enables light/dark theme switching
 * BrandingProvider: Enables comprehensive brand styling (must be inside ThemeProvider)
 * TooltipProvider: Enables helpful hover messages
 * BrowserRouter: Enables page navigation
 */
const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <BrandProvider>
      <LanguageProvider>
        <ThemeProvider>
          <BrandingProvider>
            <TooltipProvider>
              <div className="relative min-h-screen">
                {/* Notification systems - these show popup messages to users */}
                <Toaster />
                <Sonner />
                
                {/* Page routing system - decides which page to show based on URL */}
                <BrowserRouter>
                  <Routes>
                    {/* Main page: Form Builder dashboard */}
                    <Route path="/" element={<Index />} />
                    
                    {/* Catch-all route: Show "Not Found" page for any invalid URL */}
                    {/* IMPORTANT: This must be the last route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </div>
            </TooltipProvider>
          </BrandingProvider>
        </ThemeProvider>
      </LanguageProvider>
    </BrandProvider>
  </QueryClientProvider>
);

export default App;
