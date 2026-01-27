import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { CustomerRegistration } from "@/pages/CustomerRegistration";
import { SecuritySearch } from "@/pages/SecuritySearch";
import { SecurityPanel } from "@/pages/SecurityPanel";
import { OwnerDashboard } from "@/pages/OwnerDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<CustomerRegistration />} />
            <Route path="/seguranca" element={<SecuritySearch />} />
            <Route path="/seguranca/acao" element={<SecurityPanel />} />
            <Route path="/dashboard" element={<OwnerDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
