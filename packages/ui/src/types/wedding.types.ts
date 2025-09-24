export interface CarouselImage {
  src: string;
  title: string;
  subtitle: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: number;
  features: {
    icon: string;
    text: string;
  }[];
  badge?: {
    text: string;
    color: "red" | "blue";
  } | null;
}

export interface ShootType {
  id: string;
  name: string;
  image: string;
}

export interface BookingFormData {
  bookingType: "business" | "personal" | null;
  businessType: string | null;
  personalType: string | null;
  fullName: string;
  email: string;
  phone: string;
}

export type BookingStep = 1 | 2.5 | 2.7 | 3;

export interface AnimationVariants {
  [key: string]: {
    initial?: any;
    animate?: any;
    exit?: any;
    whileHover?: any;
    whileTap?: any;
    transition?: any;
  };
}
