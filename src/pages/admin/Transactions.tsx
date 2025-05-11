
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Transaction, Student } from '@/types/transaction';
import { getAllTransactions, updateTransactionStatus, getStudentTransactions } from '@/api/transactions';
import TransactionsFilter from '@/components/admin/TransactionsFilter';
import TransactionsTable from '@/components/admin/TransactionsTable';
import StudentTransactionsDialog from '@/components/admin/StudentTransactionsDialog';

const Transactions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedStudentTransactions, setSelectedStudentTransactions] = useState<Transaction[]>([]);
  const [studentTransactionsLoading, setStudentTransactionsLoading] = useState(false);

  // Fetch all transactions on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await getAllTransactions();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        toast({
          title: "Error",
          description: "Failed to load transactions. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [toast]);

  // Filter transactions based on search query and filters
  const filteredTransactions = transactions.filter(transaction => {
    // Search filter
    const matchesSearch = 
      transaction.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.month.toString().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = 
      statusFilter === 'all' || transaction.status === statusFilter;
    
    // Month filter
    const matchesMonth = 
      monthFilter === 'all' || (transaction.month - 1).toString() === monthFilter;
    
    return matchesSearch && matchesStatus && matchesMonth;
  });

  const handleToggleStatus = async (transaction: Transaction) => {
    const newStatus = transaction.status === 'paid' ? 'unpaid' : 'paid';
    
    try {
      const updatedTransaction = await updateTransactionStatus(transaction.id, newStatus);
      
      // Update main transactions list
      setTransactions(prev => 
        prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
      );
      
      // Update selected student transactions if dialog is open
      if (dialogOpen) {
        setSelectedStudentTransactions(prev => 
          prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
        );
      }
      
      toast({
        title: "Status Updated",
        description: `Transaction ${transaction.transactionId} marked as ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating transaction status:', error);
      toast({
        title: "Error",
        description: "Failed to update transaction status. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleRowClick = async (transaction: Transaction) => {
    setSelectedStudent({
      id: transaction.id,
      admissionNumber: transaction.admissionNumber,
      studentName: transaction.studentName
    });
    
    setDialogOpen(true);
    
    try {
      setStudentTransactionsLoading(true);
      const studentTransactions = await getStudentTransactions(transaction.admissionNumber);
      setSelectedStudentTransactions(studentTransactions);
    } catch (error) {
      console.error('Error fetching student transactions:', error);
      toast({
        title: "Error",
        description: "Failed to load student transactions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setStudentTransactionsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <TransactionsFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        monthFilter={monthFilter}
        setMonthFilter={setMonthFilter}
      />
      
      <TransactionsTable
        transactions={filteredTransactions}
        onToggleStatus={handleToggleStatus}
        onRowClick={handleRowClick}
        loading={loading}
      />

      {/* Student Transactions Dialog */}
      <StudentTransactionsDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        student={selectedStudent}
        transactions={selectedStudentTransactions}
        onToggleStatus={handleToggleStatus}
        loading={studentTransactionsLoading}
      />
    </div>
  );
};

export default Transactions;
