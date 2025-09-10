export interface Transaction {
  id: string;
  amount: number;
  type: 'expense' | 'income';
  date: string; // ISO date string
  description: string;
  reason: string;
}

export interface MonthlyData {
  month: string; // Format: "2024-01"
  totalMoney: number;
  totalExpenses: number;
  transactions: Transaction[];
}

export interface ExpenseTrackerState {
  currentMonth: string;
  monthlyData: Record<string, MonthlyData>;
  isLoading: boolean;
}

export type TransactionFormData = Omit<Transaction, 'id'>;

export interface DashboardStats {
  totalMoney: number;
  totalExpenses: number;
  remainingMoney: number;
  transactionCount: number;
}