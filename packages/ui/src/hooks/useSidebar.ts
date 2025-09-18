import { useState, useCallback } from "react";
import { SidebarState } from "../types/admin.types";

interface UseSidebarReturn extends SidebarState {
  toggleSidebar: () => void;
  toggleMenuItem: (itemName: string) => void;
  setActivePage: (pageName: string) => void;
  navigateToPage: (pageName: string, path?: string) => void;
}

export const useSidebar = (
  initialActivePage = "Dashboard"
): UseSidebarReturn => {
  const [state, setState] = useState<SidebarState>({
    isCollapsed: false,
    expandedItem: null,
    activePage: initialActivePage,
  });

  const toggleSidebar = useCallback(() => {
    setState(prev => ({
      ...prev,
      isCollapsed: !prev.isCollapsed,
    }));
  }, []);

  const toggleMenuItem = useCallback((itemName: string) => {
    setState(prev => ({
      ...prev,
      expandedItem: prev.expandedItem === itemName ? null : itemName,
    }));
  }, []);

  const setActivePage = useCallback((pageName: string) => {
    setState(prev => ({
      ...prev,
      activePage: pageName,
    }));
  }, []);

  const navigateToPage = useCallback(
    (pageName: string, path?: string) => {
      setActivePage(pageName);

      if (path && typeof window !== "undefined") {
        // Simple navigation fallback
        window.location.href = path;
      }
    },
    [setActivePage]
  );

  return {
    ...state,
    toggleSidebar,
    toggleMenuItem,
    setActivePage,
    navigateToPage,
  };
};
