'use client';

import { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import TransactionList from './TransactionList';
import AddTransaction from './AddTransaction';
import MonthSelector from './MonthSelector';
import { Transaction, MonthlyData, DashboardStats } from '@/types';
import { storage } from '@/lib/storage';
import { dateUtils } from '@/lib/dateUtils';

export default function ExpenseTracker() {
  const [currentMonth, setCurrentMonth] = useState<string>(dateUtils.getCurrentMonth());
  const [monthlyData, setMonthlyData] = useState<Record<string, MonthlyData>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadedData = storage.loadData();
    setMonthlyData(loadedData);
    setIsLoading(false);
  }, []);

  // Save data to localStorage whenever monthlyData changes
  useEffect(() => {
    if (!isLoading) {
      storage.saveData(monthlyData);
    }
  }, [monthlyData, isLoading]);

  // Get current month's data
  const currentMonthData = storage.getMonthData(currentMonth, monthlyData);

  // Calculate dashboard stats
  const calculateStats = (): DashboardStats => {
    const transactions = currentMonthData.transactions;
    let totalMoney = 0;
    let totalExpenses = 0;

    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalMoney += transaction.amount;
      } else if (transaction.type === 'expense') {
        totalExpenses += transaction.amount;
      }
    });

    const remainingMoney = totalMoney - totalExpenses;

    return {
      totalMoney,
      totalExpenses,
      remainingMoney,
      transactionCount: transactions.length
    };
  };

  const stats = calculateStats();

  // Handle adding new transaction
  const handleAddTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: dateUtils.generateTransactionId()
    };

    const updatedData = storage.addTransaction(monthlyData, currentMonth, newTransaction);
    setMonthlyData(updatedData);
  };

  // Handle removing transaction
  const handleRemoveTransaction = (transactionId: string) => {
    if (window.confirm('Are you sure you want to remove this transaction?')) {
      const updatedData = storage.removeTransaction(monthlyData, currentMonth, transactionId);
      setMonthlyData(updatedData);
    }
  };

  // Handle month change
  const handleMonthChange = (month: string) => {
    setCurrentMonth(month);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Month Selector */}
        <MonthSelector
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
        />

        {/* Dashboard */}
        <Dashboard
          stats={stats}
          currentMonth={currentMonth}
        />

        {/* Add Transaction Form */}
        <AddTransaction
          onAddTransaction={handleAddTransaction}
        />

        {/* Transaction List */}
        <TransactionList
          transactions={currentMonthData.transactions}
          onRemoveTransaction={handleRemoveTransaction}
        />
      </div>
    </div>
  );
}