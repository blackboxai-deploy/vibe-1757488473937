import { MonthlyData, Transaction } from '@/types';

const STORAGE_KEY = 'expense-tracker-data';

export interface StoredData {
  monthlyData: Record<string, MonthlyData>;
  lastUpdated: string;
}

export const storage = {
  // Load all data from localStorage
  loadData: (): Record<string, MonthlyData> => {
    if (typeof window === 'undefined') return {};
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return {};
      
      const parsed: StoredData = JSON.parse(stored);
      return parsed.monthlyData || {};
    } catch (error) {
      console.error('Error loading data from storage:', error);
      return {};
    }
  },

  // Save all data to localStorage
  saveData: (monthlyData: Record<string, MonthlyData>): void => {
    if (typeof window === 'undefined') return;
    
    try {
      const dataToStore: StoredData = {
        monthlyData,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
    } catch (error) {
      console.error('Error saving data to storage:', error);
    }
  },

  // Get monthly data, creating empty structure if doesn't exist
  getMonthData: (month: string, allData: Record<string, MonthlyData>): MonthlyData => {
    if (allData[month]) {
      return allData[month];
    }
    
    // Create new month data structure
    return {
      month,
      totalMoney: 0,
      totalExpenses: 0,
      transactions: []
    };
  },

  // Add transaction to monthly data
  addTransaction: (
    monthlyData: Record<string, MonthlyData>, 
    month: string, 
    transaction: Transaction
  ): Record<string, MonthlyData> => {
    const currentMonthData = storage.getMonthData(month, monthlyData);
    
    const updatedTransactions = [...currentMonthData.transactions, transaction];
    
    // Recalculate totals
    const { totalMoney, totalExpenses } = calculateTotals(updatedTransactions);
    
    const updatedMonthData: MonthlyData = {
      ...currentMonthData,
      transactions: updatedTransactions,
      totalMoney,
      totalExpenses
    };
    
    return {
      ...monthlyData,
      [month]: updatedMonthData
    };
  },

  // Remove transaction from monthly data
  removeTransaction: (
    monthlyData: Record<string, MonthlyData>,
    month: string,
    transactionId: string
  ): Record<string, MonthlyData> => {
    const currentMonthData = storage.getMonthData(month, monthlyData);
    
    const updatedTransactions = currentMonthData.transactions.filter(
      t => t.id !== transactionId
    );
    
    // Recalculate totals
    const { totalMoney, totalExpenses } = calculateTotals(updatedTransactions);
    
    const updatedMonthData: MonthlyData = {
      ...currentMonthData,
      transactions: updatedTransactions,
      totalMoney,
      totalExpenses
    };
    
    return {
      ...monthlyData,
      [month]: updatedMonthData
    };
  },

  // Clear all data (for development/testing)
  clearData: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  }
};

// Helper function to calculate totals from transactions
function calculateTotals(transactions: Transaction[]): { totalMoney: number; totalExpenses: number } {
  let totalMoney = 0;
  let totalExpenses = 0;
  
  transactions.forEach(transaction => {
    if (transaction.type === 'income') {
      totalMoney += transaction.amount;
    } else if (transaction.type === 'expense') {
      totalExpenses += transaction.amount;
      totalMoney -= transaction.amount;
    }
  });
  
  return { totalMoney, totalExpenses };
}