'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardStats } from '@/types';

interface DashboardProps {
  stats: DashboardStats;
  currentMonth: string;
}

export default function Dashboard({ stats, currentMonth }: DashboardProps) {
  const { totalMoney, totalExpenses, remainingMoney, transactionCount } = stats;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          Personal Expense Tracker
        </h1>
        <p className="text-gray-400">
          Track your finances with ease
        </p>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Money Remaining */}
        <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Money Remaining
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${remainingMoney.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Current balance
            </div>
          </CardContent>
        </Card>

        {/* Total Expenses */}
        <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">
              ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              This month
            </div>
          </CardContent>
        </Card>

        {/* Total Money Added */}
        <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Money Added
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">
              ${totalMoney.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              This month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Card */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg text-white">
            Monthly Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Total Transactions</span>
            <span className="text-white font-medium">{transactionCount}</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Money In</span>
              <span className="text-green-400 font-medium">
                +${totalMoney.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Money Out</span>
              <span className="text-red-400 font-medium">
                -${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="border-t border-gray-700 pt-2 mt-2">
              <div className="flex justify-between items-center font-medium">
                <span className="text-white">Net Change</span>
                <span className={`${remainingMoney >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {remainingMoney >= 0 ? '+' : ''}${remainingMoney.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}