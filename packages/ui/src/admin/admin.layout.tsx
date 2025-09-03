"use client";
import React from "react";
import { motion } from "framer-motion";
import { LayoutProps, BreadcrumbItem } from "../types/admin.types";
import { AdminSidebar } from "./AdminSidebar";
import { SplitScreenAdmin } from "./splitscree.admin";
import { ErrorBoundary } from "../components/ErrorBoundary";

export const AdminLayout: React.FC<LayoutProps> = ({
  children,
  pageTitle = "Dashboard",
  breadcrumbs = [],
}) => {
  return (
    <ErrorBoundary>
      <SplitScreenAdmin
        containerClassName="flex h-screen bg-gray-50"
        leftClassName=""
        rightClassName="flex-1"
      >
        <AdminSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminHeader title={pageTitle} breadcrumbs={breadcrumbs} />
          <AdminMainContent>{children}</AdminMainContent>
        </div>
      </SplitScreenAdmin>
    </ErrorBoundary>
  );
};

interface AdminHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, breadcrumbs }) => (
  <header className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        {breadcrumbs.length > 0 && (
          <nav className="mt-1 flex items-center space-x-2">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="text-gray-400">/</span>}
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className={`text-sm ${
                      crumb.isActive
                        ? "font-medium text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span
                    className={`text-sm ${
                      crumb.isActive
                        ? "font-medium text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
      </div>

      <HeaderActions />
    </div>
  </header>
);

const HeaderActions: React.FC = () => (
  <div className="flex items-center space-x-4">
    <motion.button
      className="relative rounded-lg p-2 transition-colors hover:bg-gray-100"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="Notifications"
    >
      <span className="text-lg">🔔</span>
      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
        3
      </span>
    </motion.button>

    <motion.button
      className="rounded-lg p-2 transition-colors hover:bg-gray-100"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="Settings"
    >
      <span className="text-lg">⚙️</span>
    </motion.button>

    <div className="h-6 w-px bg-gray-300" />

    <div className="flex items-center space-x-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
        <span className="text-sm font-medium text-white">A</span>
      </div>
      <span className="text-sm font-medium text-gray-700">Admin User</span>
    </div>
  </div>
);

interface AdminMainContentProps {
  children: React.ReactNode;
}

const AdminMainContent: React.FC<AdminMainContentProps> = ({ children }) => (
  <main className="flex-1 overflow-auto bg-gray-50 p-6">
    <div className="mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  </main>
);
