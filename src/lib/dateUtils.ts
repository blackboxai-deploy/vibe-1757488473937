import { format, parse, addMonths, subMonths } from 'date-fns';

export const dateUtils = {
  // Get current month in YYYY-MM format
  getCurrentMonth: (): string => {
    return format(new Date(), 'yyyy-MM');
  },

  // Get previous month
  getPreviousMonth: (currentMonth: string): string => {
    const date = parse(currentMonth, 'yyyy-MM', new Date());
    return format(subMonths(date, 1), 'yyyy-MM');
  },

  // Get next month
  getNextMonth: (currentMonth: string): string => {
    const date = parse(currentMonth, 'yyyy-MM', new Date());
    return format(addMonths(date, 1), 'yyyy-MM');
  },

  // Format month for display (e.g., "January 2024")
  formatMonthDisplay: (month: string): string => {
    const date = parse(month, 'yyyy-MM', new Date());
    return format(date, 'MMMM yyyy');
  },

  // Format date for display (e.g., "Dec 15, 2024")
  formatDate: (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy');
  },

  // Format date for transaction display (e.g., "15 Dec")
  formatTransactionDate: (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, 'dd MMM');
  },

  // Get today's date in ISO format
  getTodayISO: (): string => {
    return new Date().toISOString().split('T')[0];
  },

  // Check if a date belongs to a specific month
  isDateInMonth: (dateString: string, month: string): boolean => {
    const date = new Date(dateString);
    const monthDate = parse(month, 'yyyy-MM', new Date());
    return format(date, 'yyyy-MM') === format(monthDate, 'yyyy-MM');
  },

  // Generate transaction ID based on timestamp
  generateTransactionId: (): string => {
    return `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
};