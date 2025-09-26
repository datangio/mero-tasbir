/**
 * Currency utility functions for consistent formatting across the application
 * All prices should be displayed in NPR (Nepalese Rupee) format
 */

/**
 * Formats a number as NPR currency
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  options: {
    showSymbol?: boolean;
    showDecimals?: boolean;
    locale?: string;
  } = {}
): string {
  const {
    showSymbol = true,
    showDecimals = false,
    locale = 'en-NP'
  } = options;

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'NPR',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  });

  const formatted = formatter.format(amount);
  
  // Replace the default currency symbol with NPR if needed
  if (showSymbol) {
    return formatted.replace(/NPR\s?/, 'NPR ');
  }
  
  return formatted.replace(/NPR\s?/, '');
}

/**
 * Formats a price range as NPR currency
 * @param min - Minimum amount
 * @param max - Maximum amount
 * @param options - Formatting options
 * @returns Formatted price range string
 */
export function formatPriceRange(
  min: number,
  max: number,
  options: {
    showSymbol?: boolean;
    showDecimals?: boolean;
    separator?: string;
  } = {}
): string {
  const {
    showSymbol = true,
    showDecimals = false,
    separator = ' - '
  } = options;

  const minFormatted = formatCurrency(min, { showSymbol, showDecimals });
  const maxFormatted = formatCurrency(max, { showSymbol, showDecimals });
  
  return `${minFormatted}${separator}${maxFormatted}`;
}

/**
 * Formats a rental price as NPR currency with time period
 * @param amount - The amount to format
 * @param period - Time period (e.g., 'day', 'week', 'month')
 * @param options - Formatting options
 * @returns Formatted rental price string
 */
export function formatRentalPrice(
  amount: number,
  period: string,
  options: {
    showSymbol?: boolean;
    showDecimals?: boolean;
  } = {}
): string {
  const formatted = formatCurrency(amount, options);
  return `${formatted} / ${period}`;
}

/**
 * Parses a currency string and extracts the numeric value
 * @param currencyString - String like "NPR 15,000" or "Rs. 15,000"
 * @returns Numeric value or null if parsing fails
 */
export function parseCurrency(currencyString: string): number | null {
  // Remove common currency symbols and text
  const cleaned = currencyString
    .replace(/[NPRRs\.\s,]/g, '')
    .trim();
  
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? null : parsed;
}

/**
 * Currency constants
 */
export const CURRENCY = {
  SYMBOL: 'NPR',
  CODE: 'NPR',
  LOCALE: 'en-NP',
  DECIMAL_PLACES: 2,
} as const;

/**
 * Common price formatting presets
 */
export const PRICE_FORMATS = {
  // For display in cards and lists
  DISPLAY: (amount: number) => formatCurrency(amount, { showSymbol: true, showDecimals: false }),
  
  // For detailed pricing with decimals
  DETAILED: (amount: number) => formatCurrency(amount, { showSymbol: true, showDecimals: true }),
  
  // For rental prices
  RENTAL: (amount: number, period: string) => formatRentalPrice(amount, period, { showSymbol: true, showDecimals: false }),
  
  // For salary ranges
  SALARY_RANGE: (min: number, max: number) => formatPriceRange(min, max, { showSymbol: true, showDecimals: false }),
} as const;


























