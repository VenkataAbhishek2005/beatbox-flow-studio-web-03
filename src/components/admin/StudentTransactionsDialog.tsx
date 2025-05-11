
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Check, X, Plus } from 'lucide-react';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Transaction, Student, months } from '@/types/transaction';
import { createTransaction } from '@/api/transactions';

interface StudentTransactionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  transactions: Transaction[];
  onToggleStatus: (transaction: Transaction) => void;
  loading?: boolean;
}

const StudentTransactionsDialog: React.FC<StudentTransactionsDialogProps> = ({
  isOpen,
  onClose,
  student,
  transactions,
  onToggleStatus,
  loading = false
}) => {
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [adding, setAdding] = useState(false);
  
  const handleAddTransaction = async () => {
    if (!student || !amount || !selectedMonth) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    try {
      setAdding(true);
      const currentDate = new Date();
      const newTransaction = await createTransaction({
        admissionNumber: student.admissionNumber,
        amount: parseFloat(amount),
        month: parseInt(selectedMonth),
        year: currentDate.getFullYear()
      });

      toast({
        title: "Transaction Added",
        description: `New transaction created for ${student.studentName}`,
      });

      // Reset form
      setShowAddForm(false);
      setAmount('');
      setSelectedMonth('');
      
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast({
        title: "Error",
        description: "Failed to add transaction. Please try again.",
        variant: "destructive"
      });
    } finally {
      setAdding(false);
    }
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
          <Button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {showAddForm ? 'Cancel' : 'Add Transaction'}
          </Button>
        </div>

        {/* Add Transaction Form */}
        {showAddForm && (
          <div className="mb-6 p-4 border rounded-md bg-muted/50">
            <h3 className="text-lg font-medium mb-4">Add New Transaction</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">
                  Amount (₹)
                </label>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter amount"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="month" className="text-sm font-medium">
                  Month
                </label>
                <select
                  id="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Month</option>
                  {months.map((month, index) => (
                    <option key={index} value={(index + 1).toString()}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={handleAddTransaction} 
                disabled={!amount || !selectedMonth || adding}
                className="bg-green-500 hover:bg-green-600"
              >
                {adding ? 'Adding...' : 'Add Transaction'}
              </Button>
            </div>
          </div>
        )}
        
        {/* Transactions Table */}
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Loading transactions...
                  </TableCell>
                </TableRow>
              ) : transactions.length === 0 ? (
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
      </DialogContent>
    </Dialog>
  );
};

export default StudentTransactionsDialog;
