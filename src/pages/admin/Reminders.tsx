
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/admin/SearchBar';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import { getUnpaidStudents, sendReminder } from '@/api/reminders';

const Reminders: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  // Fetch unpaid students on component mount
  useEffect(() => {
    const fetchUnpaidStudents = async () => {
      try {
        setLoading(true);
        const data = await getUnpaidStudents();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching unpaid students:', error);
        toast({
          title: "Error",
          description: "Failed to load students with unpaid fees. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUnpaidStudents();
  }, [toast]);

  // Filter students based on search query
  const filteredStudents = students.filter(student => 
    student.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Send reminder to a single student
  const handleSendReminder = async (student: any) => {
    // Set sending state for this student
    setSending(prev => ({ ...prev, [student.id]: true }));
    
    try {
      const result = await sendReminder(student.id);
      
      // Update student's reminder status
      const updatedStudents = students.map(s => 
        s.id === student.id ? { ...s, reminderSent: true } : s
      );
      setStudents(updatedStudents);
      
      toast({
        title: "Reminder Sent",
        description: `Reminder sent to ${student.studentName} via WhatsApp`,
      });
    } catch (error) {
      console.error('Error sending reminder:', error);
      toast({
        title: "Error",
        description: "Failed to send reminder",
        variant: "destructive"
      });
    } finally {
      setSending(prev => ({ ...prev, [student.id]: false }));
    }
  };

  // Send reminders to all students
  const sendAllReminders = async () => {
    // Set all students to sending state
    const allSending: Record<string, boolean> = {};
    students.forEach(student => {
      if (!student.reminderSent) {
        allSending[student.id] = true;
      }
    });
    setSending(allSending);
    
    try {
      // Send reminders one by one
      for (const student of students) {
        if (!student.reminderSent) {
          await sendReminder(student.id);
        }
      }
      
      // Update all students' reminder status
      const updatedStudents = students.map(student => ({ 
        ...student, 
        reminderSent: true 
      }));
      setStudents(updatedStudents);
      
      toast({
        title: "All Reminders Sent",
        description: `Reminders sent to all students with unpaid fees`,
      });
    } catch (error) {
      console.error('Error sending reminders to all students:', error);
      toast({
        title: "Error",
        description: "Failed to send reminders to all students",
        variant: "destructive"
      });
    } finally {
      setSending({});
    }
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
          disabled={Object.keys(sending).length > 0 || loading}
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Loading students with unpaid fees...
                </TableCell>
              </TableRow>
            ) : filteredStudents.length === 0 ? (
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
                      onClick={() => handleSendReminder(student)}
                      disabled={student.reminderSent || sending[student.id]}
                      className={!student.reminderSent ? "bg-blue-500 hover:bg-blue-600" : ""}
                    >
                      {sending[student.id] ? (
                        "Sending..."
                      ) : (
                        <><Send className="h-4 w-4 mr-1" />
                        Send Reminder</>
                      )}
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
