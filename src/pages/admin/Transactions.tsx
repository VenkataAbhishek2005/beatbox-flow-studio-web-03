
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import SearchBar from '@/components/admin/SearchBar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import StudentTransactionsDialog from '@/components/admin/StudentTransactionsDialog';

// Mock transaction data
const mockTransactions = [
  {
    id: '1',
    transactionId: 'TX2023001',
    admissionNumber: 'BB2023001',
    studentName: 'Rahul Sharma',
    amount: 1500,
    status: 'unpaid',
    date: new Date(2023, 4, 15),
    month: 5,
    year: 2023
  },
  {
    id: '2',
    transactionId: 'TX2023002',
    admissionNumber: 'BB2023002',
    studentName: 'Priya Patel',
    amount: 1800,
    status: 'paid',
    date: new Date(2023, 4, 10),
    month: 5,
    year: 2023
  },
  {
    id: '3',
    transactionId: 'TX2023003',
    admissionNumber: 'BB2023001',
    studentName: 'Rahul Sharma',
    amount: 1500,
    status: 'paid',
    date: new Date(2023, 3, 15),
    month: 4,
    year: 2023
  },
  {
    id: '4',
    transactionId: 'TX2023004',
    admissionNumber: 'BB2023003',
    studentName: 'Aryan Singh',
    amount: 1500,
    status: 'unpaid',
    date: new Date(2023, 4, 18),
    month: 5,
    year: 2023
  }
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Transactions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Filter transactions based on search query and filters
  const filteredTransactions = mockTransactions.filter(transaction => {
    // Search filter
    const matchesSearch = 
      transaction.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      months[transaction.month - 1].toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = 
      statusFilter === 'all' || transaction.status === statusFilter;
    
    // Month filter
    const matchesMonth = 
      monthFilter === 'all' || (transaction.month - 1).toString() === monthFilter;
    
    return matchesSearch && matchesStatus && matchesMonth;
  });

  const handleToggleStatus = (transaction: any) => {
    const newStatus = transaction.status === 'paid' ? 'unpaid' : 'paid';
    
    // This would connect to the backend API
    toast({
      title: "Status Updated",
      description: `Transaction ${transaction.transactionId} marked as ${newStatus}`,
    });
  };

  const handleRowClick = (student: any) => {
    setSelectedStudent({
      id: student.id,
      admissionNumber: student.admissionNumber,
      studentName: student.studentName
    });
    setDialogOpen(true);
  };

  // Get all transactions for the selected student
  const selectedStudentTransactions = selectedStudent 
    ? mockTransactions.filter(t => t.admissionNumber === selectedStudent.admissionNumber)
    : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <SearchBar 
          placeholder="Search by admission no, name or month..." 
          value={searchQuery} 
          onChange={setSearchQuery} 
        />
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full sm:w-48">
          <Select value={monthFilter} onValueChange={setMonthFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              {months.map((month, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Transactions Table */}
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
            {filteredTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              filteredTransactions.map((transaction) => (
                <TableRow 
                  key={transaction.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleRowClick(transaction)}
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
