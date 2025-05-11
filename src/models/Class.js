
import mongoose from 'mongoose';

const ClassSchema = new mongoose.Schema({
  className: { 
    type: String, 
    required: true 
  },
  danceType: { 
    type: String, 
    required: true 
  },
  instructor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Instructor', 
    required: true 
  },
  batchNo: { 
    type: Number, 
    required: true 
  },
  timings: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Check if the model has been compiled already
const Class = mongoose.models.Class || mongoose.model('Class', ClassSchema);

export default Class;
