export { Button } from "./button";
export { AdminLogin } from "./admin/login";
export { useAdminLogin } from "./hooks/useAdminLogin";
export * from "./schemas/adminSchemas";
export { Toaster } from "react-hot-toast";
export { default as toast } from "react-hot-toast";

// Legacy exports (deprecated)
export { AdminDashboard } from "./admin/dashboard.admin";
export { AdminDashboardSidebar } from "./admin/dashboard.sidebar";
export { AdminDashboardMain } from "./admin/dashboard.main";
export { WeddingPageContent } from "./admin/wedding.page";

// New architecture exports
export { AdminLayout } from "./admin/admin.layout";
export { AdminSidebar } from "./admin/AdminSidebar";
export { Dashboard } from "./admin/Dashboard";
export { WeddingManagement } from "./admin/WeddingManagement";
export { SplitScreenAdmin } from "./admin/splitscree.admin";

// Hooks
export { useSidebar } from "./hooks/useSidebar";
export { useWeddings } from "./hooks/useWeddings";

// Components
export { StatusBadge } from "./components/StatusBadge";
export { LoadingSpinner } from "./components/LoadingSpinner";
export { ErrorBoundary } from "./components/ErrorBoundary";
export { Header } from "./components/Header";
export { WeddingBooking } from "./components/WeddingBooking";
export { WeddingBookingRefactored } from "./components/WeddingBookingRefactored";
export { HeroSection } from "./components/wedding/HeroSection";
export { PricingSection } from "./components/wedding/PricingSection";
export { BookingForm } from "./components/wedding/BookingForm";

// Types
export * from "./types/admin.types";
export * from "./types/wedding.types";

// Utils
export * from "./utils/validation";

// Constants
export * from "./constants/admin.constants";
export * from "./constants/wedding.constants";
export * from "./constants/animations.constants";

// Hooks
export { useBookingForm } from "./hooks/useBookingForm";
export { useCarousel } from "./hooks/useCarousel";
export { useRotatingText } from "./hooks/useRotatingText";
