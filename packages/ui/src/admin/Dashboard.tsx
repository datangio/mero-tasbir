"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Eye,
  Settings,
  Bell,
  User,
  Camera,
  Heart,
  Sparkles,
  BarChart3,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  ArrowRight,
  Menu,
  Home,
  FolderOpen,
  FileText,
  Image,
  Video,
  Mail,
  Phone,
  LogOut,
  BookOpen,
  Briefcase,
  ShoppingBag,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { ANIMATION_VARIANTS } from "../constants/admin.constants";
import { ErrorBoundary } from "../components/ErrorBoundary";

interface DashboardStats {
  label: string;
  value: string;
  color: string;
  bgColor: string;
  icon: React.ComponentType<any>;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  href?: string;
  onClick?: () => void;
  color: string;
  bgColor: string;
}

interface ActivityItem {
  id: string;
  message: string;
  timestamp: Date;
  type: "success" | "info" | "warning" | "error";
}

export const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [contentManagementOpen, setContentManagementOpen] = React.useState(true);
  const stats: DashboardStats[] = [
    {
      label: "Total Events",
      value: "24",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      icon: Calendar,
      trend: { value: "+12%", isPositive: true },
    },
    {
      label: "Active Projects",
      value: "12",
      color: "text-green-600",
      bgColor: "bg-green-50",
      icon: Camera,
      trend: { value: "+8%", isPositive: true },
    },
    {
      label: "Revenue",
      value: "$125k",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      icon: DollarSign,
      trend: { value: "+15%", isPositive: true },
    },
    {
      label: "This Month",
      value: "8",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      icon: Star,
      trend: { value: "-3%", isPositive: false },
    },
  ];

  const quickActions: QuickAction[] = [
    {
      id: "manage-weddings",
      title: "Manage Weddings",
      description: "Add, edit, and track wedding events",
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      href: "/wedding",
    },
    {
      id: "view-analytics",
      title: "View Analytics",
      description: "Check performance metrics and insights",
      icon: BarChart3,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      href: "/analytics",
    },
    {
      id: "manage-events",
      title: "Manage Events",
      description: "Organize and schedule events",
      icon: Sparkles,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      href: "/event",
    },
    {
      id: "job-tracking",
      title: "Job Tracking",
      description: "Monitor job progress and assignments",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      href: "/jobs",
    },
  ];

  const recentActivity: ActivityItem[] = [
    {
      id: "1",
      message: "New wedding booking: John & Emily",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      type: "success",
    },
    {
      id: "2",
      message: "Event status updated: Confirmed",
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      type: "info",
    },
    {
      id: "3",
      message: "Payment received: $50,000",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      type: "success",
    },
    {
      id: "4",
      message: "Venue availability check required",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      type: "warning",
    },
  ];

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Top Header */}
        <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        {/* Main Content Area */}
        <div className="flex">
          {/* Sidebar */}
          <DashboardSidebar 
            open={sidebarOpen} 
            contentManagementOpen={contentManagementOpen}
            setContentManagementOpen={setContentManagementOpen}
          />
          
          {/* Dashboard Content */}
          <div className="flex-1 p-6">
            <motion.div
              className="space-y-6"
              variants={ANIMATION_VARIANTS.page}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Welcome Section */}
              <WelcomeHeader />

              {/* Stats Grid */}
              <StatsGrid stats={stats} />

              {/* Main Dashboard Content */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <QuickActionsCard actions={quickActions} />
                <RecentActivityCard activities={recentActivity} />
              </div>

              {/* Additional Dashboard Widgets */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <UpcomingEventsWidget />
                <RevenueChartWidget />
                <TasksWidget />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

const WelcomeHeader: React.FC = () => (
  <motion.div
    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-2xl border border-slate-700/50"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {/* Subtle background pattern */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-0 left-0 h-32 w-32 -translate-x-16 -translate-y-16 rounded-full bg-white"></div>
      <div className="absolute bottom-0 right-0 h-24 w-24 translate-x-12 translate-y-12 rounded-full bg-white"></div>
      <div className="absolute top-1/2 left-1/2 h-16 w-16 -translate-x-8 -translate-y-8 rounded-full bg-white"></div>
    </div>
    
    <div className="relative">
      <div className="mb-6 flex items-center space-x-4">
        <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm border border-white/20">
          <User className="h-7 w-7" />
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Welcome back, Admin!</h2>
          <p className="text-slate-300 mt-1">
            Here's what's happening with your events today.
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-3 bg-white/5 rounded-xl px-4 py-2 backdrop-blur-sm border border-white/10">
          <Calendar className="h-5 w-5 text-blue-400" />
          <span className="text-sm font-medium">24 Total Events</span>
        </div>
        <div className="flex items-center space-x-3 bg-white/5 rounded-xl px-4 py-2 backdrop-blur-sm border border-white/10">
          <TrendingUp className="h-5 w-5 text-emerald-400" />
          <span className="text-sm font-medium">+12% This Month</span>
        </div>
      </div>
    </div>
  </motion.div>
);

interface StatsGridProps {
  stats: DashboardStats[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
    {stats.map((stat, index) => {
      const IconComponent = stat.icon;
      return (
        <motion.div
          key={stat.label}
          className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
              <div className="flex items-center space-x-2">
                <p className="text-2xl font-bold text-black">{stat.value}</p>
                {stat.trend && (
                  <div className="flex items-center space-x-1">
                    {stat.trend.isPositive ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stat.trend.isPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.trend.value}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className={`rounded-2xl p-3 ${stat.bgColor} shadow-lg`}>
              <IconComponent className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </motion.div>
      );
    })}
  </div>
);

interface QuickActionsCardProps {
  actions: QuickAction[];
}

const QuickActionsCard: React.FC<QuickActionsCardProps> = ({ actions }) => (
  <motion.div
    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3 }}
  >
    <div className="mb-6 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-black">Quick Actions</h3>
      <Plus className="h-5 w-5 text-gray-400" />
    </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {actions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <motion.a
                key={action.id}
                href={action.href}
                className="group flex items-center rounded-xl border border-gray-200 p-4 transition-all duration-200 hover:border-gray-300 hover:shadow-lg hover:bg-gray-50/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`mr-4 rounded-xl p-2 ${action.bgColor} shadow-sm`}>
                  <IconComponent className={`h-5 w-5 ${action.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-black group-hover:text-black">
                    {action.title}
                  </h4>
                  <p className="text-xs text-gray-500">{action.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-black transition-colors" />
              </motion.a>
            );
          })}
        </div>
  </motion.div>
);

interface RecentActivityCardProps {
  activities: ActivityItem[];
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({
  activities,
}) => {
  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "info":
        return <Eye className="h-4 w-4 text-blue-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - timestamp.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <motion.div
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-black">
          Recent Activity
        </h3>
        <Bell className="h-5 w-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            className="flex items-start space-x-3 rounded-xl p-3 transition-colors hover:bg-gray-50/50 border border-transparent hover:border-gray-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <div className="mt-1">
              {getActivityIcon(activity.type)}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-sm text-black">{activity.message}</span>
              <div className="mt-1 flex items-center space-x-2">
                <Clock className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">
                  {formatTimeAgo(activity.timestamp)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const UpcomingEventsWidget: React.FC = () => (
  <motion.div
    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
  >
    <div className="mb-6 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-black">Upcoming Events</h3>
      <Calendar className="h-5 w-5 text-gray-400" />
    </div>
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-xl bg-blue-50 p-4 border border-blue-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-blue-500 p-2">
            <Heart className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-black">John & Emily Wedding</span>
        </div>
        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Jun 15</span>
      </div>
      <div className="flex items-center justify-between rounded-xl bg-green-50 p-4 border border-green-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-green-500 p-2">
            <Users className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-black">Corporate Event</span>
        </div>
        <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">Jun 20</span>
      </div>
      <div className="flex items-center justify-between rounded-xl bg-purple-50 p-4 border border-purple-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-purple-500 p-2">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-black">Birthday Party</span>
        </div>
        <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">Jun 25</span>
      </div>
    </div>
  </motion.div>
);

const RevenueChartWidget: React.FC = () => (
  <motion.div
    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7 }}
  >
    <div className="mb-6 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-black">Revenue Trend</h3>
      <BarChart3 className="h-5 w-5 text-gray-400" />
    </div>
    <div className="py-8 text-center">
      <div className="mb-4 rounded-full bg-gradient-to-br from-green-400 to-blue-500 p-4 mx-auto w-16 h-16 flex items-center justify-center">
        <TrendingUp className="h-8 w-8 text-white" />
      </div>
      <p className="text-sm font-medium text-black mb-1">$125,000 Total Revenue</p>
      <p className="text-xs text-gray-500">+15% from last month</p>
      <div className="mt-4 text-xs text-gray-500 bg-gray-50 rounded-xl p-3 border border-gray-200">
        Advanced analytics integration coming soon
      </div>
    </div>
  </motion.div>
);

const TasksWidget: React.FC = () => (
  <motion.div
    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
  >
    <div className="mb-6 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-black">Pending Tasks</h3>
      <CheckCircle className="h-5 w-5 text-gray-400" />
    </div>
    <div className="space-y-4">
      <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50/50 transition-colors border border-transparent hover:border-gray-200">
        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
        <div className="flex-1">
          <span className="text-sm font-medium text-black">Confirm venue booking</span>
          <p className="text-xs text-gray-500 mt-1">Due: Today, 5:00 PM</p>
        </div>
        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
      </div>
      <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50/50 transition-colors border border-transparent hover:border-gray-200">
        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
        <div className="flex-1">
          <span className="text-sm font-medium text-black">Update client contracts</span>
          <p className="text-xs text-gray-500 mt-1">Due: Tomorrow, 10:00 AM</p>
        </div>
        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
      </div>
      <div className="flex items-center space-x-3 p-3 rounded-xl bg-green-50 border border-green-200">
        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" defaultChecked />
        <div className="flex-1">
          <span className="text-sm font-medium text-green-700 line-through">Send invoices</span>
          <p className="text-xs text-green-600 mt-1">Completed: Yesterday</p>
        </div>
        <CheckCircle className="h-4 w-4 text-green-500" />
      </div>
    </div>
  </motion.div>
);

// Dashboard Header Component
interface DashboardHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ sidebarOpen, setSidebarOpen }) => (
  <header className="bg-white border-b border-gray-200 shadow-sm">
    <div className="px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="h-6 w-6 text-black" />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold text-black">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, Admin!</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <motion.button
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="h-6 w-6 text-black" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              3
            </span>
          </motion.button>
          
          <motion.button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="h-6 w-6 text-black" />
          </motion.button>
          
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
              <User className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-black">Admin User</span>
          </div>
        </div>
      </div>
    </div>
  </header>
);

// Dashboard Sidebar Component
interface DashboardSidebarProps {
  open: boolean;
  contentManagementOpen: boolean;
  setContentManagementOpen: (open: boolean) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
  open, 
  contentManagementOpen, 
  setContentManagementOpen 
}) => {
  const navigationItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", active: true },
    { icon: FileText, label: "Reports", href: "/reports", active: false },
    { icon: Users, label: "Clients", href: "/clients", active: false },
    { icon: Settings, label: "Settings", href: "/settings", active: false },
  ];

  const contentManagementItems = [
    { icon: BookOpen, label: "Bookings", href: "/booking", active: false },
    { icon: Calendar, label: "Events", href: "/events", active: false },
    { icon: Heart, label: "Weddings", href: "/wedding", active: false },
    { icon: Briefcase, label: "Jobs", href: "/jobs", active: false },
    { icon: ShoppingBag, label: "Marketplace", href: "/marketplace", active: false },
  ];

  return (
    <motion.aside
      className={`bg-white border-r border-gray-200 shadow-sm transition-all duration-300 overflow-hidden ${
        open ? "w-96" : "w-0"
      }`}
      initial={false}
      animate={{ width: open ? 384 : 0 }}
    >
      <div className="h-full flex flex-col py-6">
        <div className="px-6 mb-6">
          <h2 className="text-lg font-bold text-black">Mero Tasbir</h2>
          <p className="text-sm text-gray-500">Admin Panel</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navigationItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                className={`flex items-center space-x-3 px-6 py-3 transition-colors ${
                  item.active
                    ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                    : "text-black hover:bg-gray-50 hover:text-black"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <IconComponent className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </motion.a>
            );
          })}
          
          {/* Content Management Section */}
          <div className="mt-6">
            <motion.button
              onClick={() => setContentManagementOpen(!contentManagementOpen)}
              className="flex items-center justify-between w-full px-6 py-3 text-left text-black hover:bg-gray-50 hover:text-black transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3">
                <FolderOpen className="h-5 w-5" />
                <span className="font-medium">Content Management</span>
              </div>
              {contentManagementOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </motion.button>
            
            <motion.div
              initial={false}
              animate={{ 
                height: contentManagementOpen ? "auto" : 0,
                opacity: contentManagementOpen ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-1 pl-6">
                {contentManagementItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className={`flex items-center space-x-3 px-6 py-2 rounded-lg transition-colors ${
                        item.active
                          ? "bg-blue-50 text-blue-600"
                          : "text-black hover:bg-gray-50 hover:text-black"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </nav>
        
        <div className="px-6 mt-6">
          <motion.button
            className="flex items-center space-x-3 w-full px-4 py-3 text-black hover:bg-gray-50 hover:text-black rounded-lg transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </motion.button>
        </div>
      </div>
    </motion.aside>
  );
};
