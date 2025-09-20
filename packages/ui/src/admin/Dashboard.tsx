"use client";

import React from "react";
import { motion } from "framer-motion";
import { ANIMATION_VARIANTS } from "../constants/admin.constants";
import { ErrorBoundary } from "../components/ErrorBoundary";

interface DashboardStats {
  label: string;
  value: string;
  color: string;
  icon: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  href?: string;
  onClick?: () => void;
}

interface ActivityItem {
  id: string;
  message: string;
  timestamp: Date;
  type: "success" | "info" | "warning" | "error";
}

export const Dashboard: React.FC = () => {
  const stats: DashboardStats[] = [
    {
      label: "Total Events",
      value: "24",
      color: "text-blue-600",
      icon: "📊",
      trend: { value: "+12%", isPositive: true },
    },
    {
      label: "Active Projects",
      value: "12",
      color: "text-green-600",
      icon: "🚀",
      trend: { value: "+8%", isPositive: true },
    },
    {
      label: "Revenue",
      value: "$125k",
      color: "text-purple-600",
      icon: "💰",
      trend: { value: "+15%", isPositive: true },
    },
    {
      label: "This Month",
      value: "8",
      color: "text-orange-600",
      icon: "📅",
      trend: { value: "-3%", isPositive: false },
    },
  ];

  const quickActions: QuickAction[] = [
    {
      id: "manage-weddings",
      title: "Manage Weddings",
      description: "Add, edit, and track wedding events",
      icon: "💒",
      href: "/wedding",
    },
    {
      id: "view-analytics",
      title: "View Analytics",
      description: "Check performance metrics and insights",
      icon: "📈",
      href: "/analytics",
    },
    {
      id: "manage-events",
      title: "Manage Events",
      description: "Organize and schedule events",
      icon: "🎉",
      href: "/event",
    },
    {
      id: "job-tracking",
      title: "Job Tracking",
      description: "Monitor job progress and assignments",
      icon: "📋",
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
    </ErrorBoundary>
  );
};

const WelcomeHeader: React.FC = () => (
  <motion.div
    className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="mb-2 text-2xl font-bold">Welcome back, Admin! 👋</h2>
    <p className="text-blue-100">
      Here's what's happening with your events today.
    </p>
  </motion.div>
);

interface StatsGridProps {
  stats: DashboardStats[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
    {stats.map((stat, index) => (
      <motion.div
        key={stat.label}
        className="rounded-lg border bg-white p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
            <div className="flex items-center space-x-2">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              {stat.trend && (
                <span
                  className={`text-sm font-medium ${
                    stat.trend.isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.trend.value}
                </span>
              )}
            </div>
          </div>
          <span className="text-2xl">{stat.icon}</span>
        </div>
      </motion.div>
    ))}
  </div>
);

interface QuickActionsCardProps {
  actions: QuickAction[];
}

const QuickActionsCard: React.FC<QuickActionsCardProps> = ({ actions }) => (
  <motion.div
    className="rounded-lg border bg-white p-6 shadow-sm"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3 }}
  >
    <h3 className="mb-4 text-lg font-medium text-gray-900">Quick Actions</h3>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {actions.map(action => (
        <motion.a
          key={action.id}
          href={action.href}
          className="flex items-center rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="mr-3 text-xl">{action.icon}</span>
          <div>
            <h4 className="text-sm font-medium text-gray-900">
              {action.title}
            </h4>
            <p className="text-xs text-gray-500">{action.description}</p>
          </div>
        </motion.a>
      ))}
    </div>
  </motion.div>
);

interface RecentActivityCardProps {
  activities: ActivityItem[];
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({
  activities,
}) => {
  const getActivityColor = (type: ActivityItem["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "info":
        return "bg-blue-500";
      case "warning":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
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
      className="rounded-lg border bg-white p-6 shadow-sm"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className="mb-4 text-lg font-medium text-gray-900">
        Recent Activity
      </h3>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            className="flex items-start space-x-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <div
              className={`mt-2 h-2 w-2 rounded-full ${getActivityColor(activity.type)}`}
            ></div>
            <div className="min-w-0 flex-1">
              <span className="text-sm text-gray-600">{activity.message}</span>
              <div className="mt-1 text-xs text-gray-400">
                {formatTimeAgo(activity.timestamp)}
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
    className="rounded-lg border bg-white p-6 shadow-sm"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
  >
    <h3 className="mb-4 text-lg font-medium text-gray-900">Upcoming Events</h3>
    <div className="space-y-3">
      <div className="flex items-center justify-between rounded bg-blue-50 p-2">
        <span className="text-sm font-medium">John & Emily Wedding</span>
        <span className="text-xs text-blue-600">Jun 15</span>
      </div>
      <div className="flex items-center justify-between rounded bg-green-50 p-2">
        <span className="text-sm font-medium">Corporate Event</span>
        <span className="text-xs text-green-600">Jun 20</span>
      </div>
      <div className="flex items-center justify-between rounded bg-purple-50 p-2">
        <span className="text-sm font-medium">Birthday Party</span>
        <span className="text-xs text-purple-600">Jun 25</span>
      </div>
    </div>
  </motion.div>
);

const RevenueChartWidget: React.FC = () => (
  <motion.div
    className="rounded-lg border bg-white p-6 shadow-sm"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7 }}
  >
    <h3 className="mb-4 text-lg font-medium text-gray-900">Revenue Trend</h3>
    <div className="py-8 text-center">
      <div className="mb-2 text-3xl">📈</div>
      <p className="text-sm text-gray-500">Chart placeholder</p>
      <p className="mt-1 text-xs text-gray-400">Integration coming soon</p>
    </div>
  </motion.div>
);

const TasksWidget: React.FC = () => (
  <motion.div
    className="rounded-lg border bg-white p-6 shadow-sm"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
  >
    <h3 className="mb-4 text-lg font-medium text-gray-900">Pending Tasks</h3>
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <input type="checkbox" className="rounded" />
        <span className="text-sm">Confirm venue booking</span>
      </div>
      <div className="flex items-center space-x-2">
        <input type="checkbox" className="rounded" />
        <span className="text-sm">Update client contracts</span>
      </div>
      <div className="flex items-center space-x-2">
        <input type="checkbox" className="rounded" defaultChecked />
        <span className="text-sm text-gray-400 line-through">
          Send invoices
        </span>
      </div>
    </div>
  </motion.div>
);
