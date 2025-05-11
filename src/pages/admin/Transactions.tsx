
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Transaction, Student } from '@/types/transaction';
import { mockTransactions } from '@/data/mockTransactions';
import TransactionsFilter from '@/components/admin/TransactionsFilter';
import TransactionsTable from '@/components/admin/TransactionsTable';
import StudentTransactionsDialog from '@/components/admin/StudentTransactionsDialog';

const Transactions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Filter transactions based on search query and filters
  const filteredTransactions = mockTransactions.filter(transaction => {
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

  const handleToggleStatus = (transaction: Transaction) => {
    const newStatus = transaction.status === 'paid' ? 'unpaid' : 'paid';
    
    // This would connect to the backend API
    toast({
      title: "Status Updated",
      description: `Transaction ${transaction.transactionId} marked as ${newStatus}`,
    });
  };

  const handleRowClick = (transaction: Transaction) => {
    setSelectedStudent({
      id: transaction.id,
      admissionNumber: transaction.admissionNumber,
      studentName: transaction.studentName
    });
    setDialogOpen(true);
  };

  // Get all transactions for the selected student
  const selectedStudentTransactions = selectedStudent 
    ? mockTransactions.filter(t => t.admissionNumber === selectedStudent.admissionNumber)
    : [];

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
      />

      {/* Student Transactions Dialog */}
      <StudentTransactionsDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        student={selectedStudent}
        transactions={selectedStudentTransactions}
      />
    </div>
  );
};

export default Transactions;
