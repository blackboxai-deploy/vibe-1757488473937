'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Transaction } from '@/types';
import { dateUtils } from '@/lib/dateUtils';

interface TransactionListProps {
  transactions: Transaction[];
  onRemoveTransaction: (id: string) => void;
}

export default function TransactionList({ transactions, onRemoveTransaction }: TransactionListProps) {
  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (transactions.length === 0) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg text-white">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-gray-500 text-lg mb-2">No transactions yet</div>
            <p className="text-gray-600 text-sm">
              Start by adding your first expense or income transaction
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-lg text-white">
          Recent Transactions ({transactions.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sortedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-750 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                {/* Transaction Type Indicator */}
                <div className={`w-3 h-3 rounded-full ${
                  transaction.type === 'expense' ? 'bg-red-500' : 'bg-green-500'
                }`} />
                
                {/* Transaction Details */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white">
                      {transaction.reason}
                    </h3>
                    <span className={`font-bold text-lg ${
                      transaction.type === 'expense' ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {transaction.type === 'expense' ? '-' : '+'}${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-gray-400 text-sm">
                      {transaction.description}
                    </p>
                    <span className="text-gray-500 text-sm">
                      {dateUtils.formatTransactionDate(transaction.date)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveTransaction(transaction.id)}
              className="ml-3 text-gray-400 hover:text-red-400 hover:bg-red-950/20"
            >
              Remove
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}