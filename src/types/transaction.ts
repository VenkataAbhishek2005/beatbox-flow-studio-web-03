
export interface Transaction {
  id: string;
  transactionId: string;
  admissionNumber: string;
  studentName: string;
  amount: number;
  status: 'paid' | 'unpaid';
  date: Date;
  month: number;
  year: number;
}

export interface Student {
  id: string;
  admissionNumber: string;
  studentName: string;
}

export const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];
