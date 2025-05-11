
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

// Check if the model has been compiled already
const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

export default Transaction;
