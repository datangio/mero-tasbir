import { useState, useCallback, useEffect } from "react";
import {
  Wedding,
  CreateWeddingDto,
  UpdateWeddingDto,
  WeddingFilters,
  SortOptions,
} from "../types/admin.types";

interface UseWeddingsState {
  weddings: Wedding[];
  loading: boolean;
  error: string | null;
  filters: WeddingFilters;
  sortOptions: SortOptions;
  selectedWeddings: Set<string>;
}

interface UseWeddingsReturn extends UseWeddingsState {
  // CRUD operations
  createWedding: (wedding: CreateWeddingDto) => Promise<void>;
  updateWedding: (wedding: UpdateWeddingDto) => Promise<void>;
  deleteWedding: (id: string) => Promise<void>;
  deleteWeddings: (ids: string[]) => Promise<void>;

  // Data operations
  refreshWeddings: () => Promise<void>;
  getWeddingById: (id: string) => Wedding | undefined;

  // Filtering and sorting
  setFilters: (filters: Partial<WeddingFilters>) => void;
  setSortOptions: (sort: SortOptions) => void;
  clearFilters: () => void;

  // Selection
  selectWedding: (id: string) => void;
  selectAllWeddings: () => void;
  clearSelection: () => void;

  // Computed values
  filteredWeddings: Wedding[];
  totalRevenue: number;
  totalGuests: number;
  weddingsThisMonth: number;
}

// Mock data for demonstration
const generateMockWeddings = (): Wedding[] => [
  {
    id: "1",
    couple: "Aavas",
    date: new Date("2024-06-15"),
    venue: "Star Banquot",
    status: "planning",
    budget: 50000,
    guests: 150,
    contactEmail: "aa@example.com",
    contactPhone: "+1234567890",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    couple: "Michael & Sarah",
    date: new Date("2024-07-20"),
    venue: "Garden Vista",
    status: "confirmed",
    budget: 75000,
    guests: 200,
    contactEmail: "michael.sarah@example.com",
    contactPhone: "+1234567891",
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    id: "3",
    couple: "David & Lisa",
    date: new Date("2024-08-10"),
    venue: "Seaside Resort",
    status: "planning",
    budget: 60000,
    guests: 180,
    contactEmail: "david.lisa@example.com",
    contactPhone: "+1234567892",
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
  },
];

export const useWeddings = (): UseWeddingsReturn => {
  const [state, setState] = useState<UseWeddingsState>({
    weddings: [],
    loading: false,
    error: null,
    filters: {},
    sortOptions: { field: "date", direction: "asc" },
    selectedWeddings: new Set(),
  });

  // Initialize with mock data
  useEffect(() => {
    setState(prev => ({
      ...prev,
      weddings: generateMockWeddings(),
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  // CRUD Operations
  const createWedding = useCallback(
    async (weddingData: CreateWeddingDto) => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newWedding: Wedding = {
          ...weddingData,
          id: `wedding_${Date.now()}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        setState(prev => ({
          ...prev,
          weddings: [...prev.weddings, newWedding],
        }));
      } catch (error) {
        setError("Failed to create wedding");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError]
  );

  const updateWedding = useCallback(
    async (weddingData: UpdateWeddingDto) => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        setState(prev => ({
          ...prev,
          weddings: prev.weddings.map(wedding =>
            wedding.id === weddingData.id
              ? { ...wedding, ...weddingData, updatedAt: new Date() }
              : wedding
          ),
        }));
      } catch (error) {
        setError("Failed to update wedding");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError]
  );

  const deleteWedding = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        setState(prev => ({
          ...prev,
          weddings: prev.weddings.filter(wedding => wedding.id !== id),
          selectedWeddings: new Set(
            [...prev.selectedWeddings].filter(selectedId => selectedId !== id)
          ),
        }));
      } catch (error) {
        setError("Failed to delete wedding");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError]
  );

  const deleteWeddings = useCallback(
    async (ids: string[]) => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setState(prev => ({
          ...prev,
          weddings: prev.weddings.filter(wedding => !ids.includes(wedding.id)),
          selectedWeddings: new Set(),
        }));
      } catch (error) {
        setError("Failed to delete weddings");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError]
  );

  const refreshWeddings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setState(prev => ({
        ...prev,
        weddings: generateMockWeddings(),
      }));
    } catch {
      setError("Failed to refresh weddings");
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const getWeddingById = useCallback(
    (id: string) => {
      return state.weddings.find(wedding => wedding.id === id);
    },
    [state.weddings]
  );

  // Filtering and Sorting
  const setFilters = useCallback((filters: Partial<WeddingFilters>) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...filters },
    }));
  }, []);

  const setSortOptions = useCallback((sortOptions: SortOptions) => {
    setState(prev => ({ ...prev, sortOptions }));
  }, []);

  const clearFilters = useCallback(() => {
    setState(prev => ({ ...prev, filters: {} }));
  }, []);

  // Selection
  const selectWedding = useCallback((id: string) => {
    setState(prev => {
      const newSelection = new Set(prev.selectedWeddings);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return { ...prev, selectedWeddings: newSelection };
    });
  }, []);

  const selectAllWeddings = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedWeddings: new Set(prev.weddings.map(w => w.id)),
    }));
  }, []);

  const clearSelection = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedWeddings: new Set(),
    }));
  }, []);

  // Computed values
  const filteredWeddings = state.weddings
    .filter(wedding => {
      const { status, dateRange, budgetRange, venue, search } = state.filters;

      if (status && status.length > 0 && !status.includes(wedding.status)) {
        return false;
      }

      if (dateRange) {
        const weddingDate = new Date(wedding.date);
        if (weddingDate < dateRange.start || weddingDate > dateRange.end) {
          return false;
        }
      }

      if (budgetRange) {
        if (
          wedding.budget < budgetRange.min ||
          wedding.budget > budgetRange.max
        ) {
          return false;
        }
      }

      if (venue && !wedding.venue.toLowerCase().includes(venue.toLowerCase())) {
        return false;
      }

      if (search) {
        const searchLower = search.toLowerCase();
        return (
          wedding.couple.toLowerCase().includes(searchLower) ||
          wedding.venue.toLowerCase().includes(searchLower) ||
          wedding.status.toLowerCase().includes(searchLower)
        );
      }

      return true;
    })
    .sort((a, b) => {
      const { field, direction } = state.sortOptions;
      const aValue = a[field];
      const bValue = b[field];

      // Handle undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return direction === "asc" ? 1 : -1;
      if (bValue == null) return direction === "asc" ? -1 : 1;

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

  const totalRevenue = state.weddings.reduce(
    (sum, wedding) => sum + wedding.budget,
    0
  );
  const totalGuests = state.weddings.reduce(
    (sum, wedding) => sum + wedding.guests,
    0
  );
  const weddingsThisMonth = state.weddings.filter(
    wedding => new Date(wedding.date).getMonth() === new Date().getMonth()
  ).length;

  return {
    ...state,
    createWedding,
    updateWedding,
    deleteWedding,
    deleteWeddings,
    refreshWeddings,
    getWeddingById,
    setFilters,
    setSortOptions,
    clearFilters,
    selectWedding,
    selectAllWeddings,
    clearSelection,
    filteredWeddings,
    totalRevenue,
    totalGuests,
    weddingsThisMonth,
  };
};
