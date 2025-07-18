
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import CheckoutPage from "./pages/CheckoutPage";
import NotFound from "./pages/NotFound";
import SessionExpired from "./pages/SessionExpired";
import Error500 from "./pages/Error500";
import Classes from "./pages/Classes";
import DashboardPage from './pages/DashboardPage';
import Students from "./pages/Student";
import StudentSubscriptions from "./pages/StudentSubscriptions";
import Schedule from "./pages/Schedule";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/checkout/:subscriptionId" element={<CheckoutPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/session-expired" element={<SessionExpired />} />
          <Route path="/internal-error" element={<Error500 />} />
          <Route path="/NotFound" element={<NotFound />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/Students" element={<Students />} />
          <Route path="/student-subscriptions" element={<StudentSubscriptions />} />
          <Route path="/schedule" element={<Schedule />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
