
import mongoose from 'mongoose';

const InstructorSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  photo: { 
    type: String 
  },
  danceTypes: { 
    type: [String], 
    required: true 
  },
  bio: String,
  contactInfo: {
    email: String,
    phone: String
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Check if the model has been compiled already
const Instructor = mongoose.models.Instructor || mongoose.model('Instructor', InstructorSchema);

export default Instructor;
