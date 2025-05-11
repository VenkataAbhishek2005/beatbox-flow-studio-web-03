
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { Transaction, months } from '@/types/transaction';

interface TransactionsTableProps {
  transactions: Transaction[];
  onToggleStatus: (transaction: Transaction) => void;
  onRowClick: (transaction: Transaction) => void;
  loading?: boolean;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  onToggleStatus,
  onRowClick,
  loading = false
}) => {
  if (loading) {
    return (
      <div className="rounded-md border">
        <div className="flex justify-center items-center h-48">
          <div className="text-muted-foreground">Loading transactions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Admission No.</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Amount (₹)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No transactions found
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow 
                key={transaction.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => onRowClick(transaction)}
              >
                <TableCell>{transaction.transactionId}</TableCell>
                <TableCell>{transaction.admissionNumber}</TableCell>
                <TableCell>{transaction.studentName}</TableCell>
                <TableCell>₹{transaction.amount}</TableCell>
                <TableCell>
                  <Badge 
                    variant={transaction.status === 'paid' ? 'default' : 'secondary'}
                    className={transaction.status === 'paid' ? 'bg-green-500' : 'bg-yellow-500'}
                  >
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {months[transaction.month - 1]} {transaction.year}
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Button
                    size="sm"
                    variant={transaction.status === 'unpaid' ? 'default' : 'secondary'}
                    className={transaction.status === 'unpaid' ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'}
                    onClick={() => onToggleStatus(transaction)}
                  >
                    {transaction.status === 'unpaid' ? (
                      <><Check className="h-4 w-4 mr-1" /> Mark Paid</>
                    ) : (
                      <><X className="h-4 w-4 mr-1" /> Mark Unpaid</>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsTable;
