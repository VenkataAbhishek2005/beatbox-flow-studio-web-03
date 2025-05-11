
import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  admissionNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  dob: { 
    type: Date, 
    required: true 
  },
  gender: { 
    type: String, 
    required: true, 
    enum: ['male', 'female'] 
  },
  danceTypes: { 
    type: [String], 
    required: true 
  },
  batchNo: { 
    type: Number, 
    required: true 
  },
  colony: String,
  area: String,
  city: String,
  postalCode: Number,
  parentName: String,
  mobileNumber: {
    countryCode: { 
      type: String, 
      default: '+91' 
    },
    number: { 
      type: String, 
      required: true 
    }
  },
  designation: String,
  email: String,
  classFee: { 
    type: Number, 
    required: true 
  },
  costumeFee: { 
    type: Number, 
    required: true 
  },
  isActive: { 
    type: Boolean, 
    required: true, 
    default: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Check if the model has been compiled already
const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);

export default Student;
