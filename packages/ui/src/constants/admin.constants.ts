import { NavigationItem, WeddingStatus } from "../types/admin.types";

// Navigation Configuration
export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: "📊",
    path: "/dashboard",
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: "📈",
    path: "/analytics",
  },
  {
    id: "workflow",
    name: "Workflow",
    icon: "⚡",
    path: "/workflow",
    subItems: [
      { id: "event", name: "Event", path: "/event" },
      { id: "wedding", name: "Wedding", path: "/wedding" },
      { id: "jobs", name: "Jobs", path: "/jobs" },
    ],
  },
  {
    id: "courses",
    name: "Courses",
    icon: "🎓",
    path: "/courses",
  },
  {
    id: "content-management",
    name: "Content Management",
    icon: "📝",
    path: "/content-management",
    subItems: [
      { 
        id: "photography", 
        name: "Photography", 
        path: "/photography",
        subItems: [
          { id: "portfolio", name: "Portfolio", path: "/photography/portfolio", icon: "🖼️" },
          { id: "gallery", name: "Gallery", path: "/photography/gallery", icon: "📷" },
          { id: "faq", name: "FAQ", path: "/photography/faq", icon: "❓" },
          { id: "about", name: "About", path: "/photography/about", icon: "ℹ️" },
          { id: "categories", name: "Categories", path: "/photography/categories", icon: "🏷️" },
          { 
            id: "packages", 
            name: "Packages", 
            path: "/photography/packages",
            icon: "📦",
            subItems: [
              { id: "wedding-packages", name: "Wedding", path: "/photography/packages/wedding", icon: "💒" },
              { id: "other-packages", name: "Other", path: "/photography/packages/other", icon: "📸" },
            ]
          },
        ]
      },
      { id: "event", name: "Event", path: "/event", icon: "🎉" },
      { id: "videography", name: "Videography", path: "/videography", icon: "🎥" },
      { id: "blog", name: "Blog", path: "/blog", icon: "📝" },
    ],
  },
  {
    id: "marketplace",
    name: "Marketplace",
    icon: "🛒",
    path: "/marketplace",
  },
];

// Wedding Status Configuration
export const WEDDING_STATUS_CONFIG: Record<
  WeddingStatus,
  {
    label: string;
    color: string;
    bgColor: string;
    icon: string;
  }
> = {
  planning: {
    label: "Planning",
    color: "text-yellow-800",
    bgColor: "bg-yellow-100",
    icon: "📋",
  },
  confirmed: {
    label: "Confirmed",
    color: "text-green-800",
    bgColor: "bg-green-100",
    icon: "✅",
  },
  completed: {
    label: "Completed",
    color: "text-blue-800",
    bgColor: "bg-blue-100",
    icon: "🎉",
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-800",
    bgColor: "bg-red-100",
    icon: "❌",
  },
};

// Animation Configuration
export const ANIMATION_VARIANTS = {
  sidebar: {
    expanded: {
      width: 400,
      transition: { duration: 0.6, ease: "easeInOut" as const },
    },
    collapsed: {
      width: 100,
      transition: { duration: 0.6, ease: "easeInOut" as const },
    },
  },
  content: {
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2, delay: 0.1 },
    },
    hidden: {
      opacity: 0,
      x: -10,
      transition: { duration: 0.15 },
    },
  },
  icon: {
    expanded: {
      rotate: 0,
      transition: { duration: 0.5, ease: "easeInOut" as const },
    },
    collapsed: {
      rotate: 180,
      transition: { duration: 0.5, ease: "easeInOut" as const },
    },
  },
  submenu: {
    open: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" as const },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" as const },
    },
  },
  page: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  },
};

// Form Validation Messages
export const VALIDATION_MESSAGES = {
  required: (field: string) => `${field} is required`,
  email: "Please enter a valid email address",
  phone: "Please enter a valid phone number",
  minLength: (field: string, min: number) =>
    `${field} must be at least ${min} characters`,
  maxLength: (field: string, max: number) =>
    `${field} must not exceed ${max} characters`,
  positive: (field: string) => `${field} must be a positive number`,
  dateRange: "End date must be after start date",
};

// UI Configuration
export const UI_CONFIG = {
  sidebar: {
    expandedWidth: 400,
    collapsedWidth: 100,
    animationDuration: 0.6,
  },
  table: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50],
  },
  form: {
    debounceDelay: 300,
    autoSaveDelay: 2000,
  },
  toast: {
    duration: 4000,
    position: "top-right" as const,
  },
};

// API Configuration
export const API_ENDPOINTS = {
  weddings: {
    list: "/api/weddings",
    create: "/api/weddings",
    update: (id: string) => `/api/weddings/${id}`,
    delete: (id: string) => `/api/weddings/${id}`,
    get: (id: string) => `/api/weddings/${id}`,
  },
  analytics: {
    dashboard: "/api/analytics/dashboard",
    wedding: "/api/analytics/wedding",
  },
};

// Default Values
export const DEFAULT_VALUES = {
  wedding: {
    status: "planning" as WeddingStatus,
    budget: 0,
    guests: 0,
  },
  pagination: {
    page: 1,
    limit: 10,
  },
};

