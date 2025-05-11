
import { connectToDatabase } from '@/lib/db';
import Student from '@/models/Student';
import Transaction from '@/models/Transaction';
import { sendWhatsAppReminder } from '@/api/sendReminder';
import { generateReminderMessage, formatPhoneForWhatsApp, getCurrentMonthYear } from '@/utils/reminderUtils';

// Track which students have had reminders sent
const reminderStatus = new Map();

/**
 * Get all students with unpaid transactions for the current month
 * @returns {Promise<Array>} Array of students with unpaid transactions
 */
export const getUnpaidStudents = async () => {
  try {
    await connectToDatabase();
    
    const { month, year } = getCurrentMonthYear();
    
    // Find all unpaid transactions for the current month
    const unpaidTransactions = await Transaction.find({
      status: 'unpaid',
      month,
      year
    });
    
    const populatedTransactions = await Transaction.populate(unpaidTransactions, 'student');
    
    // Group by student and format response
    const studentsMap = new Map();
    
    for (const transaction of populatedTransactions) {
      const student = transaction.student;
      const studentId = student._id;
      
      if (!studentsMap.has(studentId)) {
        studentsMap.set(studentId, {
          id: studentId,
          admissionNumber: student.admissionNumber,
          studentName: `${student.firstName} ${student.lastName}`,
          mobileNumber: { 
            countryCode: '+91', 
            number: '9876543210' // Mock number since our mock data doesn't have this
          },
          amountDue: transaction.amount,
          reminderSent: reminderStatus.has(studentId) // Check if reminder was sent
        });
      } else {
        // Add up the amounts if there are multiple unpaid transactions
        const existingStudent = studentsMap.get(studentId);
        existingStudent.amountDue += transaction.amount;
      }
    }
    
    return Array.from(studentsMap.values());
  } catch (error) {
    console.error('Error getting unpaid students:', error);
    throw error;
  }
};

/**
 * Send a reminder to a student
 * @param {string} studentId - Student ID
 * @returns {Promise<Object>} Result of sending reminder
 */
export const sendReminder = async (studentId) => {
  try {
    await connectToDatabase();
    
    // Find student
    const student = await Student.findById(studentId);
    if (!student) {
      throw new Error(`Student with ID ${studentId} not found`);
    }
    
    const { month, year } = getCurrentMonthYear();
    
    // Calculate total amount due
    const unpaidTransactions = await Transaction.find({
      student: studentId,
      status: 'unpaid',
      month,
      year
    });
    
    const totalAmountDue = unpaidTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    
    if (totalAmountDue <= 0) {
      return { success: false, message: 'No unpaid transactions found for this student' };
    }
    
    // Format student data for message
    const studentData = {
      studentName: `${student.firstName} ${student.lastName}`,
      amountDue: totalAmountDue
    };
    
    // Generate reminder message
    const message = generateReminderMessage(studentData);
    
    // Format phone number for WhatsApp
    const mobileNumber = student.mobileNumber || { countryCode: '+91', number: '9876543210' };
    const formattedPhone = formatPhoneForWhatsApp(mobileNumber);
    
    // Send WhatsApp reminder
    const result = await sendWhatsAppReminder(formattedPhone, message);
    
    // Mark reminder as sent for this student
    reminderStatus.set(studentId, {
      sent: true,
      timestamp: new Date(),
      messageId: result.sid
    });
    
    return {
      success: true,
      student: {
        id: student._id,
        admissionNumber: student.admissionNumber,
        studentName: `${student.firstName} ${student.lastName}`,
        mobileNumber: mobileNumber,
        amountDue: totalAmountDue,
        reminderSent: true
      },
      messageId: result.sid
    };
  } catch (error) {
    console.error('Error sending reminder:', error);
    throw error;
  }
};

// Get reminder status for a student
export const getReminderStatus = (studentId) => {
  return reminderStatus.get(studentId) || { sent: false };
};

// Clear reminder status (for testing)
export const clearReminderStatus = () => {
  reminderStatus.clear();
};
