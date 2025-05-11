
import { connectToDatabase } from '@/lib/db';
import Transaction from '@/models/Transaction';
import Student from '@/models/Student';

/**
 * Get all transactions from the database
 * @returns {Promise<Array>} Array of transactions with student details
 */
export const getAllTransactions = async () => {
  try {
    await connectToDatabase();
    
    // Get all transactions
    const transactions = await Transaction.find();
    
    // Populate student data
    const populatedTransactions = await Transaction.populate(transactions, 'student');
    
    // Format transactions to match the frontend expected structure
    return populatedTransactions.map(transaction => {
      const student = transaction.student;
      return {
        id: transaction._id,
        transactionId: transaction._id.substring(0, 8).toUpperCase(),
        admissionNumber: student.admissionNumber,
        studentName: `${student.firstName} ${student.lastName}`,
        amount: transaction.amount,
        status: transaction.status,
        date: transaction.date,
        month: transaction.month,
        year: transaction.year
      };
    });
  } catch (error) {
    console.error('Error getting transactions:', error);
    throw error;
  }
};

/**
 * Get transactions for a specific student
 * @param {string} admissionNumber - Student admission number
 * @returns {Promise<Array>} Array of transactions for the student
 */
export const getStudentTransactions = async (admissionNumber) => {
  try {
    await connectToDatabase();
    
    const student = await Student.findOne({ admissionNumber });
    if (!student) {
      throw new Error(`Student with admission number ${admissionNumber} not found`);
    }
    
    const transactions = await Transaction.find({ student: student._id });
    
    // Format transactions to match the frontend expected structure
    return transactions.map(transaction => ({
      id: transaction._id,
      transactionId: transaction._id.substring(0, 8).toUpperCase(),
      admissionNumber: student.admissionNumber,
      studentName: `${student.firstName} ${student.lastName}`,
      amount: transaction.amount,
      status: transaction.status,
      date: transaction.date,
      month: transaction.month,
      year: transaction.year
    }));
  } catch (error) {
    console.error('Error getting student transactions:', error);
    throw error;
  }
};

// Mock transaction storage for newly created transactions
const newTransactions = [];

/**
 * Create a new transaction
 * @param {Object} transactionData - Transaction data
 * @returns {Promise<Object>} Created transaction
 */
export const createTransaction = async (transactionData) => {
  try {
    await connectToDatabase();
    
    const { admissionNumber, amount, month, year } = transactionData;
    
    // Find student by admission number
    const student = await Student.findOne({ admissionNumber });
    if (!student) {
      throw new Error(`Student with admission number ${admissionNumber} not found`);
    }
    
    // Create new transaction (mock implementation)
    const newTransactionId = 'TR' + Date.now().toString().substring(7);
    const newTransaction = {
      _id: newTransactionId,
      student: student._id,
      amount,
      status: 'unpaid',
      date: new Date(),
      month,
      year
    };
    
    // Add to our mock storage
    newTransactions.push(newTransaction);
    
    return {
      id: newTransaction._id,
      transactionId: newTransaction._id.substring(0, 8).toUpperCase(),
      admissionNumber,
      studentName: `${student.firstName} ${student.lastName}`,
      amount,
      status: 'unpaid',
      date: newTransaction.date,
      month,
      year
    };
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

/**
 * Update transaction status
 * @param {string} id - Transaction ID
 * @param {string} status - New status ('paid' or 'unpaid')
 * @returns {Promise<Object>} Updated transaction
 */
export const updateTransactionStatus = async (id, status) => {
  try {
    await connectToDatabase();
    
    // Find in main transactions
    let transaction = await Transaction.findById(id);
    let isNewTransaction = false;
    
    // If not found in main transactions, check new transactions
    if (!transaction) {
      transaction = newTransactions.find(t => t._id === id);
      isNewTransaction = true;
      
      if (!transaction) {
        throw new Error(`Transaction with ID ${id} not found`);
      }
    }
    
    // Update status
    if (isNewTransaction) {
      // Update in new transactions array
      const index = newTransactions.findIndex(t => t._id === id);
      newTransactions[index] = { ...newTransactions[index], status };
      transaction = newTransactions[index];
    } else {
      // Update mock transaction (this is just for the browser environment)
      transaction.status = status;
    }
    
    const student = await Student.findById(transaction.student);
    
    return {
      id: transaction._id,
      transactionId: transaction._id.substring(0, 8).toUpperCase(),
      admissionNumber: student.admissionNumber,
      studentName: `${student.firstName} ${student.lastName}`,
      amount: transaction.amount,
      status: transaction.status,
      date: transaction.date,
      month: transaction.month,
      year: transaction.year
    };
  } catch (error) {
    console.error('Error updating transaction status:', error);
    throw error;
  }
};

// Get all transactions (including new ones) - for debugging
export const getAllTransactionsRaw = () => {
  return { 
    main: Transaction.transactions,
    new: newTransactions
  };
};
