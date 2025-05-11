
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Check, X, Plus } from 'lucide-react';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Transaction, Student, months } from '@/types/transaction';

interface StudentTransactionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  transactions: Transaction[];
}

const StudentTransactionsDialog: React.FC<StudentTransactionsDialogProps> = ({
  isOpen,
  onClose,
  student,
  transactions
}) => {
  const { toast } = useToast();
  
  const handleToggleStatus = (transaction: Transaction) => {
    const newStatus = transaction.status === 'paid' ? 'unpaid' : 'paid';
    
    // This would connect to the backend API
    toast({
      title: "Status Updated",
      description: `Transaction ${transaction.transactionId} marked as ${newStatus}`,
    });
  };

  const handleAddTransaction = () => {
    // This would open a form to add a new transaction
    toast({
      title: "Add Transaction",
      description: "Add transaction functionality will be implemented soon.",
    });
  };

  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Transactions for {student.studentName}</DialogTitle>
          <DialogDescription>
            Admission Number: {student.admissionNumber}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-end mb-4">
          <Button onClick={handleAddTransaction} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Transaction
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Amount (₹)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.transactionId}</TableCell>
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
                    <TableCell>
                      <Button
                        size="sm"
                        variant={transaction.status === 'unpaid' ? 'default' : 'secondary'}
                        className={transaction.status === 'unpaid' ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'}
                        onClick={() => handleToggleStatus(transaction)}
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
      </DialogContent>
    </Dialog>
  );
};

export default StudentTransactionsDialog;
