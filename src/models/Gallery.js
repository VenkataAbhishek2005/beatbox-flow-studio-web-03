
import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  photoUrl: { 
    type: String, 
    required: true 
  },
  caption: String,
  category: String,
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Check if the model has been compiled already
const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);

export default Gallery;
