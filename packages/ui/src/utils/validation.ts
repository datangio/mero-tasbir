import { CreateWeddingDto, WeddingStatus } from "../types/admin.types";
import { VALIDATION_MESSAGES } from "../constants/admin.constants";

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface ValidationRule<T> {
  field: keyof T;
  validator: (value: unknown, data: T) => string | null;
}

// Generic validation function
export function validateData<T>(
  data: T,
  rules: ValidationRule<T>[]
): ValidationResult {
  const errors: Record<string, string> = {};

  for (const rule of rules) {
    const value = data[rule.field];
    const error = rule.validator(value, data);
    if (error) {
      errors[rule.field as string] = error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Common validators
export const validators = {
  required: (fieldName: string) => (value: unknown) => {
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return VALIDATION_MESSAGES.required(fieldName);
    }
    return null;
  },

  email: (value: string) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : VALIDATION_MESSAGES.email;
  },

  phone: (value: string) => {
    if (!value) return null;
    const phoneRegex = /^\+?[\d\s\-()]+$/;
    return phoneRegex.test(value) ? null : VALIDATION_MESSAGES.phone;
  },

  minLength: (min: number, fieldName: string) => (value: string) => {
    if (!value) return null;
    return value.length >= min
      ? null
      : VALIDATION_MESSAGES.minLength(fieldName, min);
  },

  maxLength: (max: number, fieldName: string) => (value: string) => {
    if (!value) return null;
    return value.length <= max
      ? null
      : VALIDATION_MESSAGES.maxLength(fieldName, max);
  },

  positive: (fieldName: string) => (value: number) => {
    if (value === null || value === undefined) return null;
    return value > 0 ? null : VALIDATION_MESSAGES.positive(fieldName);
  },

  dateRange: (startDate: Date, endDate: Date) => {
    if (!startDate || !endDate) return null;
    return endDate > startDate ? null : VALIDATION_MESSAGES.dateRange;
  },

  validStatus: (value: string) => {
    const validStatuses: WeddingStatus[] = [
      "planning",
      "confirmed",
      "completed",
      "cancelled",
    ];
    return validStatuses.includes(value as WeddingStatus)
      ? null
      : "Invalid status";
  },
};

// Wedding-specific validation rules
export const weddingValidationRules: ValidationRule<CreateWeddingDto>[] = [
  {
    field: "couple",
    validator: validators.required("Couple names"),
  },
  {
    field: "couple",
    validator: (value: unknown) =>
      validators.minLength(2, "Couple names")(value as string),
  },
  {
    field: "couple",
    validator: (value: unknown) =>
      validators.maxLength(100, "Couple names")(value as string),
  },
  {
    field: "date",
    validator: validators.required("Wedding date"),
  },
  {
    field: "venue",
    validator: validators.required("Venue"),
  },
  {
    field: "venue",
    validator: (value: unknown) =>
      validators.minLength(2, "Venue")(value as string),
  },
  {
    field: "venue",
    validator: (value: unknown) =>
      validators.maxLength(100, "Venue")(value as string),
  },
  {
    field: "status",
    validator: (value: unknown) => validators.validStatus(value as string),
  },
  {
    field: "budget",
    validator: (value: unknown) =>
      validators.positive("Budget")(value as number),
  },
  {
    field: "guests",
    validator: (value: unknown) =>
      validators.positive("Number of guests")(value as number),
  },
  {
    field: "contactEmail",
    validator: (value: unknown) => validators.email(value as string),
  },
  {
    field: "contactPhone",
    validator: (value: unknown) => validators.phone(value as string),
  },
];

// Validate wedding data
export function validateWedding(data: CreateWeddingDto): ValidationResult {
  return validateData(data, weddingValidationRules);
}

// Real-time field validation
export function validateField<T>(
  field: keyof T,
  value: unknown,
  data: T,
  rules: ValidationRule<T>[]
): string | null {
  const fieldRules = rules.filter(rule => rule.field === field);

  for (const rule of fieldRules) {
    const error = rule.validator(value, data);
    if (error) return error;
  }

  return null;
}

// Sanitize input data
export function sanitizeInput(input: string): string {
  return input.trim().replace(/\s+/g, " ");
}

// Format data for API
export function formatWeddingForApi(data: CreateWeddingDto): CreateWeddingDto {
  return {
    ...data,
    couple: sanitizeInput(data.couple),
    venue: sanitizeInput(data.venue),
    description: data.description ? sanitizeInput(data.description) : undefined,
    contactEmail: data.contactEmail
      ? data.contactEmail.toLowerCase().trim()
      : undefined,
    contactPhone: data.contactPhone
      ? data.contactPhone.replace(/\s/g, "")
      : undefined,
  };
}
