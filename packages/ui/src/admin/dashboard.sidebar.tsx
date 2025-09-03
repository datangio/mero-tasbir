"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const AdminDashboardSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [activePage, setActivePage] = useState("Dashboard");

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMenuItem = (itemName: string) => {
    setExpandedItem(expandedItem === itemName ? null : itemName);
  };

  const handlePageChange = (pageName: string, path?: string) => {
    setActivePage(pageName);
    if (path && typeof window !== "undefined") {
      // Navigate to the page
      window.location.href = path;
    }
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: "📊",
      path: "/dashboard",
    },
    {
      name: "Analytics",
      icon: "📈",
      path: "/analytics",
    },
    {
      name: "Workflow",
      icon: "⚡",
      path: "/workflow",
      subItems: [
        { name: "Event", path: "/event" },
        { name: "Wedding", path: "/wedding" },
        { name: "Jobs", path: "/jobs" },
      ],
    },
  ];

  const sidebarVariants = {
    expanded: {
      width: 400,
      transition: {
        duration: 0.6,
        ease: "easeInOut" as const,
      },
    },
    collapsed: {
      width: 100,
      transition: {
        duration: 0.6,
        ease: "easeInOut" as const,
      },
    },
  };

  const contentVariants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        delay: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      x: -10,
      transition: {
        duration: 0.15,
      },
    },
  };

  const iconVariants = {
    expanded: {
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut" as const,
      },
    },
    collapsed: {
      rotate: 180,
      transition: {
        duration: 0.5,
        ease: "easeInOut" as const,
      },
    },
  };

  const submenuVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <motion.div
      variants={sidebarVariants}
      animate={isCollapsed ? "collapsed" : "expanded"}
      className="flex min-h-screen flex-col overflow-hidden border-r border-gray-200 bg-white shadow-lg"
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.h2
              key="title"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="text-xl font-semibold text-gray-800"
            >
              Admin Panel
            </motion.h2>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggleSidebar}
          className="rounded-lg p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.svg
            variants={iconVariants}
            animate={isCollapsed ? "collapsed" : "expanded"}
            className="h-5 w-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </motion.svg>
        </motion.button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          <AnimatePresence mode="wait">
            {!isCollapsed ? (
              <motion.div
                key="nav-expanded"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-1"
              >
                {menuItems.map(item => (
                  <div key={item.name}>
                    {/* Main Menu Item */}
                    <motion.div
                      className={`flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors duration-200 ${
                        item.subItems ? "hover:bg-blue-50" : "hover:bg-gray-100"
                      } ${activePage === item.name ? "border-l-4 border-blue-500 bg-blue-100" : ""}`}
                      onClick={() => {
                        if (item.subItems) {
                          toggleMenuItem(item.name);
                        } else {
                          handlePageChange(item.name, item.path);
                        }
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium text-gray-700">
                          {item.name}
                        </span>
                      </div>
                      {item.subItems && (
                        <motion.svg
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          animate={{
                            rotate: expandedItem === item.name ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </motion.svg>
                      )}
                    </motion.div>

                    {/* Submenu */}
                    {item.subItems && (
                      <motion.div
                        variants={submenuVariants}
                        animate={expandedItem === item.name ? "open" : "closed"}
                        className="overflow-hidden"
                      >
                        <div className="ml-6 mt-1 space-y-1">
                          {item.subItems.map(subItem => (
                            <motion.div
                              key={subItem.name}
                              className={`cursor-pointer rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100 ${
                                activePage === subItem.name
                                  ? "border-l-2 border-blue-400 bg-blue-50"
                                  : ""
                              }`}
                              onClick={() =>
                                handlePageChange(subItem.name, subItem.path)
                              }
                              whileHover={{ scale: 1.02, x: 4 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span className="text-sm text-gray-600">
                                {subItem.name}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="nav-collapsed"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-2"
              >
                {menuItems.map(item => (
                  <motion.div
                    key={item.name}
                    className="flex cursor-pointer items-center justify-center rounded-lg p-3 transition-colors duration-200 hover:bg-gray-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title={item.name}
                  >
                    <span className="text-xl">{item.icon}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="border-t border-gray-200 p-4">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              key="footer-content"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="text-xs text-gray-400"
            >
              Footer content
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
