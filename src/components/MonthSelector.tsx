'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { dateUtils } from '@/lib/dateUtils';

interface MonthSelectorProps {
  currentMonth: string;
  onMonthChange: (month: string) => void;
}

export default function MonthSelector({ currentMonth, onMonthChange }: MonthSelectorProps) {
  const handlePreviousMonth = () => {
    const previousMonth = dateUtils.getPreviousMonth(currentMonth);
    onMonthChange(previousMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = dateUtils.getNextMonth(currentMonth);
    onMonthChange(nextMonth);
  };

  const handleCurrentMonth = () => {
    const currentMonthNow = dateUtils.getCurrentMonth();
    onMonthChange(currentMonthNow);
  };

  const isCurrentMonth = currentMonth === dateUtils.getCurrentMonth();

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousMonth}
            className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            ← Previous
          </Button>

          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold text-white">
              {dateUtils.formatMonthDisplay(currentMonth)}
            </h2>
            {!isCurrentMonth && (
              <Button
                variant="link"
                size="sm"
                onClick={handleCurrentMonth}
                className="text-blue-400 hover:text-blue-300 text-xs p-0 h-auto"
              >
                Go to current month
              </Button>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNextMonth}
            className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Next →
          </Button>
        </div>

        {!isCurrentMonth && (
          <div className="mt-3 text-center">
            <span className="text-sm text-gray-500">
              Viewing historical data for {dateUtils.formatMonthDisplay(currentMonth)}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}