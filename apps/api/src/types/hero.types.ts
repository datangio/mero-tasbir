export interface HeroSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage?: string;
  ctaText: string;
  isActive: boolean;
  rotatingTexts?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateHeroSectionData {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage?: string;
  ctaText?: string;
  rotatingTexts?: string[];
}

export interface UpdateHeroSectionData {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  ctaText?: string;
  rotatingTexts?: string[];
  isActive?: boolean;
}

export interface HeroSectionResponse {
  message: string;
  heroSection: HeroSection;
}

export interface HeroSectionsResponse {
  message: string;
  heroSections: HeroSection[];
  count: number;
}

export interface HeroSectionDeleteResponse {
  message: string;
  heroSectionId: string;
}

