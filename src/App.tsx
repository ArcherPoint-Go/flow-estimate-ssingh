import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import RFQsPage from "@/pages/RFQsPage";
import EnvelopePage from "@/pages/EnvelopePage";
import CostBuildPage from "@/pages/CostBuildPage";
import PricingPage from "@/pages/PricingPage";
import CompetitivePage from "@/pages/CompetitivePage";
import ApprovalPage from "@/pages/ApprovalPage";
import QuotePackagePage from "@/pages/QuotePackagePage";
import SourcesPage from "@/pages/SourcesPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/rfqs?rfq=RFQ-2026-0001" replace />} />
          <Route path="/rfqs" element={<AppLayout><RFQsPage /></AppLayout>} />
          <Route path="/envelope" element={<AppLayout><EnvelopePage /></AppLayout>} />
          <Route path="/cost-build" element={<AppLayout><CostBuildPage /></AppLayout>} />
          <Route path="/pricing" element={<AppLayout><PricingPage /></AppLayout>} />
          <Route path="/competitive" element={<AppLayout><CompetitivePage /></AppLayout>} />
          <Route path="/approval" element={<AppLayout><ApprovalPage /></AppLayout>} />
          <Route path="/quote-package" element={<AppLayout><QuotePackagePage /></AppLayout>} />
          <Route path="/sources" element={<AppLayout><SourcesPage /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
