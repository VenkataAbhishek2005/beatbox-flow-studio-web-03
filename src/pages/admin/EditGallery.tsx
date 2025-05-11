
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/admin/SearchBar';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash, Image } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Mock gallery data
const mockGallery = [
  {
    id: '1',
    photoUrl: '/placeholder.svg',
    caption: 'Annual Dance Show 2023',
    category: 'Events'
  },
  {
    id: '2',
    photoUrl: '/placeholder.svg',
    caption: 'Hip-Hop Workshop',
    category: 'Workshops'
  },
  {
    id: '3',
    photoUrl: '/placeholder.svg',
    caption: 'Classical Dance Competition',
    category: 'Competitions'
  },
  {
    id: '4',
    photoUrl: '/placeholder.svg',
    caption: 'Student Performance',
    category: 'Performances'
  },
  {
    id: '5',
    photoUrl: '/placeholder.svg',
    caption: 'Studio Instructors',
    category: 'Team'
  },
  {
    id: '6',
    photoUrl: '/placeholder.svg',
    caption: 'Beginners Class',
    category: 'Classes'
  }
];

const EditGallery: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState(mockGallery);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<any>(null);
  const { toast } = useToast();

  // Filter gallery based on search query
  const filteredGallery = gallery.filter(photo => 
    photo.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
    photo.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open dialog for adding a new photo
  const handleAddPhoto = () => {
    setCurrentPhoto({
      photoUrl: '',
      caption: '',
      category: ''
    });
    setIsDialogOpen(true);
  };

  // Handle photo deletion
  const handleDeletePhoto = (id: string) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      // This would connect to the backend API
      const updatedGallery = gallery.filter(photo => photo.id !== id);
      setGallery(updatedGallery);
      
      toast({
        title: "Photo Deleted",
        description: "The photo has been successfully deleted from the gallery.",
      });
    }
  };

  // Handle form submission for adding a new photo
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add new photo
    const newPhoto = {
      id: Date.now().toString(),
      ...currentPhoto,
      photoUrl: currentPhoto.photoUrl || '/placeholder.svg'
    };
    setGallery([...gallery, newPhoto]);
    
    toast({
      title: "Photo Added",
      description: "The photo has been successfully added to the gallery.",
    });
    
    setIsDialogOpen(false);
  };

  // Update current photo state when form fields change
  const handleInputChange = (field: string, value: string) => {
    setCurrentPhoto({
      ...currentPhoto,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
        <SearchBar 
          placeholder="Search by caption or category..." 
          value={searchQuery} 
          onChange={setSearchQuery} 
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleAddPhoto} className="flex items-center gap-2">
          <Image className="h-4 w-4" />
          Add Photo
        </Button>
      </div>
      
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredGallery.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No photos found
          </div>
        ) : (
          filteredGallery.map((photo) => (
            <div 
              key={photo.id} 
              className="group relative rounded-lg overflow-hidden border"
            >
              <div className="aspect-[4/3] bg-gray-100">
                <img 
                  src={photo.photoUrl} 
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeletePhoto(photo.id)}
                  className="flex items-center gap-1"
                >
                  <Trash className="h-4 w-4" />
                  Delete
                </Button>
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-medium">{photo.caption}</h3>
                <p className="text-sm text-muted-foreground">{photo.category}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Photo Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Photo</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Upload Photo*</Label>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50">
                  <Image className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-center text-muted-foreground mb-2">
                    Drag and drop an image, or click to browse
                  </p>
                  <Button type="button" variant="outline" size="sm">
                    Choose File
                  </Button>
                  <Input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={() => {
                      // Placeholder for file handling
                      handleInputChange('photoUrl', '/placeholder.svg');
                    }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="caption">Caption*</Label>
                <Input
                  id="caption"
                  value={currentPhoto?.caption || ''}
                  onChange={(e) => handleInputChange('caption', e.target.value)}
                  placeholder="Enter photo caption"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category*</Label>
                <Input
                  id="category"
                  value={currentPhoto?.category || ''}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  placeholder="E.g. Events, Performances, Classes"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Add to Gallery
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditGallery;
