
import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['paid', 'unpaid'], 
    default: 'unpaid' 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  month: { 
    type: Number, 
    required: true 
  },
  year: { 
    type: Number, 
    required: true 
  }
});

// Fix the model creation to avoid the error with mongoose.models being undefined
let Transaction;
try {
  // Check if model already exists
  Transaction = mongoose.model('Transaction');
} catch (error) {
  // Model doesn't exist, create it
  Transaction = mongoose.model('Transaction', TransactionSchema);
}

export default Transaction;
