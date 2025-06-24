/**
 * Main Application Component - Footballytics
 * 
 * This is the root component that sets up routing, providers, and global state
 * for the Footballytics application.
 * 
 * Author: Georgio Elias
 * Course: Full Stack Development - Lebanese University
 * Features: React Router, Query Client, Toast Notifications
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page Components
import Index from "./pages/Index";
import LiveData from "./pages/LiveData";
import Analytics from "./pages/Analytics";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Initialize React Query client for API data management
const queryClient = new QueryClient();

/**
 * Main App Component
 * Sets up global providers and routing structure
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Global toast notifications */}
      <Toaster />
      <Sonner />
      
      {/* Router configuration */}
      <BrowserRouter>
        <Routes>
          {/* Main application routes */}
          <Route path="/" element={<Index />} />
          <Route path="/live" element={<LiveData />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Catch-all route for 404 errors */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
