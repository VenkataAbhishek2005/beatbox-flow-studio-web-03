
import { connectToDatabase } from '@/lib/db';
import Transaction from '@/models/Transaction';
import Student from '@/models/Student';
import mongoose from 'mongoose';

/**
 * Get all transactions from the database
 * @returns {Promise<Array>} Array of transactions with student details
 */
export const getAllTransactions = async () => {
  try {
    await connectToDatabase();
    
    const transactions = await Transaction.find()
      .sort({ date: -1 })
      .populate('student', 'admissionNumber firstName lastName');
    
    // Format transactions to match the frontend expected structure
    return transactions.map(transaction => ({
      id: transaction._id.toString(),
      transactionId: transaction._id.toString().substring(0, 8).toUpperCase(),
      admissionNumber: transaction.student.admissionNumber,
      studentName: `${transaction.student.firstName} ${transaction.student.lastName}`,
      amount: transaction.amount,
      status: transaction.status,
      date: transaction.date,
      month: transaction.month,
      year: transaction.year
    }));
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
    
    const transactions = await Transaction.find({ student: student._id }).sort({ date: -1 });
    
    // Format transactions to match the frontend expected structure
    return transactions.map(transaction => ({
      id: transaction._id.toString(),
      transactionId: transaction._id.toString().substring(0, 8).toUpperCase(),
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
    
    // Create new transaction
    const newTransaction = new Transaction({
      student: student._id,
      amount,
      status: 'unpaid',
      date: new Date(),
      month,
      year
    });
    
    await newTransaction.save();
    
    return {
      id: newTransaction._id.toString(),
      transactionId: newTransaction._id.toString().substring(0, 8).toUpperCase(),
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
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid transaction ID');
    }
    
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      throw new Error(`Transaction with ID ${id} not found`);
    }
    
    transaction.status = status;
    await transaction.save();
    
    const student = await Student.findById(transaction.student);
    
    return {
      id: transaction._id.toString(),
      transactionId: transaction._id.toString().substring(0, 8).toUpperCase(),
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
