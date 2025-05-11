
import { Transaction } from '@/types/transaction';

// Mock transaction data with proper types
export const mockTransactions: Transaction[] = [
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
