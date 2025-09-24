
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { NavigationItem } from "../types/admin.types";
import {
  NAVIGATION_ITEMS,
  ANIMATION_VARIANTS,
} from "../constants/admin.constants";
import { useSidebar } from "../hooks/useSidebar";
import { ErrorBoundary } from "../components/ErrorBoundary";

interface AdminSidebarProps {
  className?: string;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  className = "",
}) => {
  const {
    isCollapsed,
    expandedItem,
    activePage,
    toggleSidebar,
    toggleMenuItem,
    navigateToPage,
  } = useSidebar();

  return (
    <ErrorBoundary>
      <motion.aside
        variants={ANIMATION_VARIANTS.sidebar}
        animate={isCollapsed ? "collapsed" : "expanded"}
        className={`
          flex min-h-screen flex-col overflow-hidden border-r 
          border-gray-200 bg-white shadow-lg
          ${className}
        `}
      >
        <SidebarHeader isCollapsed={isCollapsed} onToggle={toggleSidebar} />

        <SidebarNavigation
          items={NAVIGATION_ITEMS}
          isCollapsed={isCollapsed}
          expandedItem={expandedItem}
          activePage={activePage}
          onToggleItem={toggleMenuItem}
          onNavigate={navigateToPage}
        />

        <SidebarFooter isCollapsed={isCollapsed} />
      </motion.aside>
    </ErrorBoundary>
  );
};

interface SidebarHeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  isCollapsed,
  onToggle,
}) => (
  <header className="flex items-center justify-between border-b border-gray-200 p-4">
    <AnimatePresence mode="wait">
      {!isCollapsed && (
        <motion.h2
          key="title"
          variants={ANIMATION_VARIANTS.content}
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
      onClick={onToggle}
      className="rounded-lg p-2 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.svg
        variants={ANIMATION_VARIANTS.icon}
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
  </header>
);

interface SidebarNavigationProps {
  items: NavigationItem[];
  isCollapsed: boolean;
  expandedItem: string | null;
  activePage: string;
  onToggleItem: (itemName: string) => void;
  onNavigate: (pageName: string, path?: string) => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  items,
  isCollapsed,
  expandedItem,
  activePage,
  onToggleItem,
  onNavigate,
}) => (
  <nav className="flex-1 overflow-y-auto p-4">
    <div className="space-y-1">
      <AnimatePresence mode="wait">
        {!isCollapsed ? (
          <ExpandedNavigation
            items={items}
            expandedItem={expandedItem}
            activePage={activePage}
            onToggleItem={onToggleItem}
            onNavigate={onNavigate}
          />
        ) : (
          <CollapsedNavigation items={items} onNavigate={onNavigate} />
        )}
      </AnimatePresence>
    </div>
  </nav>
);

type ExpandedNavigationProps = Omit<SidebarNavigationProps, "isCollapsed">;

const ExpandedNavigation: React.FC<ExpandedNavigationProps> = ({
  items,
  expandedItem,
  activePage,
  onToggleItem,
  onNavigate,
}) => (
  <motion.div
    key="nav-expanded"
    variants={ANIMATION_VARIANTS.content}
    initial="hidden"
    animate="visible"
    exit="hidden"
    className="space-y-1"
  >
    {items.map(item => (
      <NavigationItem
        key={item.id}
        item={item}
        isExpanded={expandedItem === item.name}
        isActive={activePage === item.name}
        onToggle={() => onToggleItem(item.name)}
        onNavigate={onNavigate}
      />
    ))}
  </motion.div>
);

interface CollapsedNavigationProps {
  items: NavigationItem[];
  onNavigate: (pageName: string, path?: string) => void;
}

const CollapsedNavigation: React.FC<CollapsedNavigationProps> = ({
  items,
  onNavigate,
}) => (
  <motion.div
    key="nav-collapsed"
    variants={ANIMATION_VARIANTS.content}
    initial="hidden"
    animate="visible"
    exit="hidden"
    className="space-y-2"
  >
    {items.map(item => (
      <motion.button
        key={item.id}
        onClick={() => !item.subItems && onNavigate(item.name, item.path)}
        className="flex w-full cursor-pointer items-center justify-center rounded-lg p-3 
                  transition-colors duration-200 hover:bg-gray-100"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={item.name}
      >
        <span className="text-xl">{item.icon}</span>
      </motion.button>
    ))}
  </motion.div>
);

interface NavigationItemProps {
  item: NavigationItem;
  isExpanded: boolean;
  isActive: boolean;
  onToggle: () => void;
  onNavigate: (pageName: string, path?: string) => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  item,
  isExpanded,
  isActive,
  onToggle,
  onNavigate,
}) => (
  <div>
    <motion.button
      className={`
        flex w-full cursor-pointer items-center justify-between rounded-lg p-3 
        transition-colors duration-200
        ${item.subItems ? "hover:bg-blue-50" : "hover:bg-gray-100"}
        ${isActive ? "border-l-4 border-blue-500 bg-blue-100" : ""}
      `}
      onClick={() => {
        if (item.subItems) {
          onToggle();
        } else {
          onNavigate(item.name, item.path);
        }
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center space-x-3">
        <span className="text-lg">{item.icon}</span>
        <span className="font-medium text-gray-700">{item.name}</span>
      </div>

      {item.subItems && (
        <motion.svg
          className="h-4 w-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isExpanded ? 180 : 0 }}
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
    </motion.button>

    {item.subItems && (
      <motion.div
        variants={ANIMATION_VARIANTS.submenu}
        animate={isExpanded ? "open" : "closed"}
        className="overflow-hidden"
      >
        <div className="ml-6 mt-1 space-y-1">
          {item.subItems.map(subItem => (
            <NavigationSubItem
              key={subItem.id}
              item={subItem}
              isActive={isActive}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </motion.div>
    )}
  </div>
);

interface NavigationSubItemProps {
  item: import('../types/admin.types').NavigationSubItem;
  isActive: boolean;
  onNavigate: (pageName: string, path?: string) => void;
}

const NavigationSubItem: React.FC<NavigationSubItemProps> = ({
  item,
  isActive,
  onNavigate,
}) => {
  const [isSubExpanded, setIsSubExpanded] = useState(false);

  return (
    <div>
      <motion.button
        className={`
          flex w-full cursor-pointer items-center justify-between rounded-lg p-2 
          transition-colors duration-200 hover:bg-gray-100
          ${isActive ? "border-l-2 border-blue-400 bg-blue-50" : ""}
        `}
        onClick={() => {
          if (item.subItems) {
            setIsSubExpanded(!isSubExpanded);
          } else {
            onNavigate(item.name, item.path);
          }
        }}
        whileHover={{ scale: 1.02, x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center space-x-2">
          {item.icon && <span className="text-sm">{item.icon}</span>}
          <span className="text-sm text-gray-600">{item.name}</span>
        </div>

        {item.subItems && (
          <motion.svg
            className="h-3 w-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ rotate: isSubExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </motion.svg>
        )}
      </motion.button>

      {item.subItems && (
        <motion.div
          variants={ANIMATION_VARIANTS.submenu}
          animate={isSubExpanded ? "open" : "closed"}
          className="overflow-hidden"
        >
          <div className="ml-4 mt-1 space-y-1">
            {item.subItems.map((subSubItem: import('../types/admin.types').NavigationSubItem) => (
              <motion.button
                key={subSubItem.id}
                className={`
                  flex w-full cursor-pointer items-center space-x-2 rounded-lg p-2 text-left 
                  transition-colors duration-200 hover:bg-gray-100
                  ${isActive ? "border-l-2 border-blue-300 bg-blue-25" : ""}
                `}
                onClick={() => onNavigate(subSubItem.name, subSubItem.path)}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                {subSubItem.icon && <span className="text-xs">{subSubItem.icon}</span>}
                <span className="text-xs text-gray-500">{subSubItem.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

interface SidebarFooterProps {
  isCollapsed: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isCollapsed }) => (
  <footer className="border-t border-gray-200 p-4">
    <AnimatePresence mode="wait">
      {!isCollapsed && (
        <motion.div
          key="footer-content"
          variants={ANIMATION_VARIANTS.content}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="text-xs text-gray-400"
        >
          <div className="flex items-center space-x-2">
            <span>v1.0.0</span>
            <span>•</span>
            <span>Admin Dashboard</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </footer>
);
