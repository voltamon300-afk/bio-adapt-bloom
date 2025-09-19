import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OnboardingWizard } from "./pages/OnboardingWizard";
import { Dashboard } from "./pages/Dashboard";
import { ExerciseSession } from "./pages/ExerciseSession";
import { ProgressDashboard } from "./pages/ProgressDashboard";
import { Settings } from "./pages/Settings";
import { SessionSummary } from "./pages/SessionSummary";
import { TelehealthCall } from "./pages/TelehealthCall";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
          <Routes>
            <Route path="/" element={<OnboardingWizard />} />
            <Route path="/index" element={<OnboardingWizard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/exercise" element={<ExerciseSession />} />
            <Route path="/progress" element={<ProgressDashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/summary" element={<SessionSummary />} />
            <Route path="/telehealth" element={<TelehealthCall />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;