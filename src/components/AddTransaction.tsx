'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Transaction } from '@/types';
import { dateUtils } from '@/lib/dateUtils';

interface AddTransactionProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

export default function AddTransaction({ onAddTransaction }: AddTransactionProps) {
  const [expenseForm, setExpenseForm] = useState({
    amount: '',
    reason: '',
    date: dateUtils.getTodayISO(),
    description: ''
  });

  const [incomeForm, setIncomeForm] = useState({
    amount: '',
    reason: '',
    date: dateUtils.getTodayISO(),
    description: ''
  });

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!expenseForm.amount || !expenseForm.reason) {
      alert('Please fill in amount and reason');
      return;
    }

    const amount = parseFloat(expenseForm.amount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    onAddTransaction({
      amount,
      type: 'expense',
      date: expenseForm.date,
      reason: expenseForm.reason.trim(),
      description: expenseForm.description.trim()
    });

    // Reset form
    setExpenseForm({
      amount: '',
      reason: '',
      date: dateUtils.getTodayISO(),
      description: ''
    });
  };

  const handleIncomeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!incomeForm.amount || !incomeForm.reason) {
      alert('Please fill in amount and reason');
      return;
    }

    const amount = parseFloat(incomeForm.amount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    onAddTransaction({
      amount,
      type: 'income',
      date: incomeForm.date,
      reason: incomeForm.reason.trim(),
      description: incomeForm.description.trim()
    });

    // Reset form
    setIncomeForm({
      amount: '',
      reason: '',
      date: dateUtils.getTodayISO(),
      description: ''
    });
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-lg text-white">Add Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="expense" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger 
              value="expense" 
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Add Expense
            </TabsTrigger>
            <TabsTrigger 
              value="income" 
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              Add Money
            </TabsTrigger>
          </TabsList>

          {/* Expense Form */}
          <TabsContent value="expense" className="space-y-4 mt-6">
            <form onSubmit={handleExpenseSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expense-amount" className="text-gray-300">
                    Amount *
                  </Label>
                  <Input
                    id="expense-amount"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={expenseForm.amount}
                    onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expense-date" className="text-gray-300">
                    Date *
                  </Label>
                  <Input
                    id="expense-date"
                    type="date"
                    value={expenseForm.date}
                    onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expense-reason" className="text-gray-300">
                  Reason *
                </Label>
                <Input
                  id="expense-reason"
                  placeholder="e.g., Groceries, Gas, Restaurant"
                  value={expenseForm.reason}
                  onChange={(e) => setExpenseForm({ ...expenseForm, reason: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expense-description" className="text-gray-300">
                  Description
                </Label>
                <Textarea
                  id="expense-description"
                  placeholder="Additional details (optional)"
                  value={expenseForm.description}
                  onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 resize-none"
                  rows={3}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Add Expense
              </Button>
            </form>
          </TabsContent>

          {/* Income Form */}
          <TabsContent value="income" className="space-y-4 mt-6">
            <form onSubmit={handleIncomeSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="income-amount" className="text-gray-300">
                    Amount *
                  </Label>
                  <Input
                    id="income-amount"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={incomeForm.amount}
                    onChange={(e) => setIncomeForm({ ...incomeForm, amount: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="income-date" className="text-gray-300">
                    Date *
                  </Label>
                  <Input
                    id="income-date"
                    type="date"
                    value={incomeForm.date}
                    onChange={(e) => setIncomeForm({ ...incomeForm, date: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="income-reason" className="text-gray-300">
                  Source *
                </Label>
                <Input
                  id="income-reason"
                  placeholder="e.g., Salary, Bonus, Side Hustle"
                  value={incomeForm.reason}
                  onChange={(e) => setIncomeForm({ ...incomeForm, reason: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="income-description" className="text-gray-300">
                  Description
                </Label>
                <Textarea
                  id="income-description"
                  placeholder="Additional details (optional)"
                  value={incomeForm.description}
                  onChange={(e) => setIncomeForm({ ...incomeForm, description: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 resize-none"
                  rows={3}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Add Money
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}