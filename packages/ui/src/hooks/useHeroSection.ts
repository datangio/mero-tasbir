import { useState, useEffect } from "react";

interface HeroSectionData {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage?: string;
  ctaText?: string;
  rotatingTexts?: string[];
  isActive?: boolean;
}

interface UseHeroSectionReturn {
  heroSection: HeroSectionData | null;
  isLoading: boolean;
  error: string | null;
  createHeroSection: (data: Omit<HeroSectionData, "id">) => Promise<void>;
  updateHeroSection: (id: string, data: Partial<HeroSectionData>) => Promise<void>;
  deleteHeroSection: (id: string) => Promise<void>;
  setActiveHeroSection: (id: string) => Promise<void>;
  refreshHeroSection: () => Promise<void>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const useHeroSection = (): UseHeroSectionReturn => {
  const [heroSection, setHeroSection] = useState<HeroSectionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActiveHeroSection = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/hero/active`);
      
      if (!response.ok) {
        if (response.status === 404) {
          // No active hero section found, this is not an error
          setHeroSection(null);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setHeroSection(result.heroSection);
    } catch (err) {
      console.error("Error fetching hero section:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch hero section");
    } finally {
      setIsLoading(false);
    }
  };

  const createHeroSection = async (data: Omit<HeroSectionData, "id">) => {
    try {
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/hero`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setHeroSection(result.heroSection);
    } catch (err) {
      console.error("Error creating hero section:", err);
      setError(err instanceof Error ? err.message : "Failed to create hero section");
      throw err;
    }
  };

  const updateHeroSection = async (id: string, data: Partial<HeroSectionData>) => {
    try {
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/hero/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setHeroSection(result.heroSection);
    } catch (err) {
      console.error("Error updating hero section:", err);
      setError(err instanceof Error ? err.message : "Failed to update hero section");
      throw err;
    }
  };

  const deleteHeroSection = async (id: string) => {
    try {
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/hero/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // If we deleted the current hero section, clear it
      if (heroSection?.id === id) {
        setHeroSection(null);
      }
    } catch (err) {
      console.error("Error deleting hero section:", err);
      setError(err instanceof Error ? err.message : "Failed to delete hero section");
      throw err;
    }
  };

  const setActiveHeroSection = async (id: string) => {
    try {
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/hero/${id}/activate`, {
        method: "PATCH",
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setHeroSection(result.heroSection);
    } catch (err) {
      console.error("Error setting active hero section:", err);
      setError(err instanceof Error ? err.message : "Failed to set active hero section");
      throw err;
    }
  };

  const refreshHeroSection = async () => {
    await fetchActiveHeroSection();
  };

  useEffect(() => {
    fetchActiveHeroSection();
  }, []);

  return {
    heroSection,
    isLoading,
    error,
    createHeroSection,
    updateHeroSection,
    deleteHeroSection,
    setActiveHeroSection,
    refreshHeroSection,
  };
};
