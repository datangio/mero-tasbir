// Base interfaces
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Wedding related types
export type WeddingStatus =
  | "planning"
  | "confirmed"
  | "completed"
  | "cancelled";

export interface Wedding extends BaseEntity {
  couple: string;
  date: Date;
  venue: string;
  status: WeddingStatus;
  budget: number;
  guests: number;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface CreateWeddingDto {
  couple: string;
  date: Date;
  venue: string;
  status: WeddingStatus;
  budget: number;
  guests: number;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface UpdateWeddingDto extends Partial<CreateWeddingDto> {
  id: string;
}

// Navigation types
export interface NavigationItem {
  id: string;
  name: string;
  icon: string;
  path: string;
  subItems?: NavigationSubItem[];
}

export interface NavigationSubItem {
  id: string;
  name: string;
  path: string;
  icon?: string;
  subItems?: NavigationSubItem[];
}

// UI State types
export interface SidebarState {
  isCollapsed: boolean;
  expandedItem: string | null;
  activePage: string;
}

export interface FormState<T> {
  data: T;
  errors: Record<keyof T, string>;
  isLoading: boolean;
  isSubmitting: boolean;
}

// Animation types - imported from wedding.types.ts
export type { AnimationVariants } from "./wedding.types";

// API Response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: Date;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error types
export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

// Component Props types
export interface LayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

// Filter and Search types
export interface WeddingFilters {
  status?: WeddingStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  budgetRange?: {
    min: number;
    max: number;
  };
  venue?: string;
  search?: string;
}

export interface SortOptions {
  field: keyof Wedding;
  direction: "asc" | "desc";
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, item: T) => React.ReactNode;
  width?: string;
}
