
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/admin/SearchBar';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

// Mock data of students with unpaid transactions
const mockUnpaidStudents = [
  {
    id: '1',
    admissionNumber: 'BB2023001',
    studentName: 'Rahul Sharma',
    mobileNumber: { countryCode: '+91', number: '9876543210' },
    amountDue: 1500,
    reminderSent: false,
  },
  {
    id: '2',
    admissionNumber: 'BB2023003',
    studentName: 'Aryan Singh',
    mobileNumber: { countryCode: '+91', number: '7654321098' },
    amountDue: 1500,
    reminderSent: true,
  },
  {
    id: '3',
    admissionNumber: 'BB2023005',
    studentName: 'Sneha Gupta',
    mobileNumber: { countryCode: '+91', number: '8765432101' },
    amountDue: 1800,
    reminderSent: false,
  }
];

const Reminders: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState(mockUnpaidStudents);
  const { toast } = useToast();

  // Filter students based on search query
  const filteredStudents = students.filter(student => 
    student.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Send reminder to a single student
  const sendReminder = (student: any) => {
    // This would connect to the backend API / WhatsApp API
    const updatedStudents = students.map(s => 
      s.id === student.id ? { ...s, reminderSent: true } : s
    );
    setStudents(updatedStudents);
    
    toast({
      title: "Reminder Sent",
      description: `Reminder sent to ${student.studentName}`,
    });
  };

  // Send reminders to all students
  const sendAllReminders = () => {
    // This would connect to the backend API / WhatsApp API
    const updatedStudents = students.map(student => ({ 
      ...student, 
      reminderSent: true 
    }));
    setStudents(updatedStudents);
    
    toast({
      title: "All Reminders Sent",
      description: `Reminders sent to all ${students.length} students`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Reminders</h1>
        <SearchBar 
          placeholder="Search by admission no. or name..." 
          value={searchQuery} 
          onChange={setSearchQuery} 
        />
      </div>
      
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          Students with unpaid fees for the current month
        </p>
        <Button 
          onClick={sendAllReminders}
          className="flex items-center gap-2"
        >
          <Send className="h-4 w-4" />
          Send All Reminders
        </Button>
      </div>
      
      {/* Students Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Admission No.</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Mobile Number</TableHead>
              <TableHead>Amount Due (₹)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No students with unpaid fees
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.admissionNumber}</TableCell>
                  <TableCell>{student.studentName}</TableCell>
                  <TableCell>
                    {student.mobileNumber.countryCode} {student.mobileNumber.number}
                  </TableCell>
                  <TableCell>₹{student.amountDue}</TableCell>
                  <TableCell>
                    {student.reminderSent ? (
                      <span className="text-green-500 font-medium">Reminder Sent</span>
                    ) : (
                      <span className="text-yellow-500 font-medium">Pending</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant={student.reminderSent ? "secondary" : "default"}
                      onClick={() => sendReminder(student)}
                      disabled={student.reminderSent}
                      className={!student.reminderSent ? "bg-blue-500 hover:bg-blue-600" : ""}
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Send Reminder
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Reminders;
