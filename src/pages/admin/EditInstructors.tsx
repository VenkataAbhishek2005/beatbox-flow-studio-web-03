
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/admin/SearchBar';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash, Image, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

// Mock instructor data
const mockInstructors = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    photo: '/placeholder.svg',
    danceTypes: ['WESTERN', 'HIP-HOP'],
    bio: 'Experienced hip-hop and western dance instructor with 8+ years of teaching experience.',
    contactInfo: {
      email: 'rajesh@example.com',
      phone: '+91 9876543210'
    }
  },
  {
    id: '2',
    name: 'Meera Sharma',
    photo: '/placeholder.svg',
    danceTypes: ['CLASSICAL', 'BHARATANATYAM'],
    bio: 'Classically trained Bharatanatyam dancer with 12 years of experience and formal certification.',
    contactInfo: {
      email: 'meera@example.com',
      phone: '+91 8765432109'
    }
  },
  {
    id: '3',
    name: 'Arjun Singh',
    photo: '/placeholder.svg',
    danceTypes: ['CONTEMPORARY', 'WESTERN'],
    bio: 'Contemporary dance specialist who has performed internationally and taught students of all ages.',
    contactInfo: {
      email: 'arjun@example.com',
      phone: '+91 7654321098'
    }
  }
];

const EditInstructors: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [instructors, setInstructors] = useState(mockInstructors);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentInstructor, setCurrentInstructor] = useState<any>(null);
  const [danceTypeInput, setDanceTypeInput] = useState('');
  const { toast } = useToast();

  // Filter instructors based on search query
  const filteredInstructors = instructors.filter(instructor => 
    instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    instructor.danceTypes.some(type => 
      type.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Open dialog for adding a new instructor
  const handleAddInstructor = () => {
    setCurrentInstructor({
      name: '',
      photo: '/placeholder.svg',
      danceTypes: [],
      bio: '',
      contactInfo: {
        email: '',
        phone: ''
      }
    });
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  // Open dialog for editing an existing instructor
  const handleEditInstructor = (instructor: any) => {
    setCurrentInstructor({ ...instructor });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  // Handle instructor deletion
  const handleDeleteInstructor = (id: string) => {
    if (window.confirm('Are you sure you want to delete this instructor?')) {
      // This would connect to the backend API
      const updatedInstructors = instructors.filter(instructor => instructor.id !== id);
      setInstructors(updatedInstructors);
      
      toast({
        title: "Instructor Deleted",
        description: "The instructor has been successfully deleted.",
      });
    }
  };

  // Handle form submission for adding/editing instructor
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode) {
      // Update existing instructor
      const updatedInstructors = instructors.map(instructor => 
        instructor.id === currentInstructor.id 
          ? currentInstructor
          : instructor
      );
      setInstructors(updatedInstructors);
      
      toast({
        title: "Instructor Updated",
        description: `${currentInstructor.name}'s information has been updated.`,
      });
    } else {
      // Add new instructor
      const newInstructor = {
        id: Date.now().toString(),
        ...currentInstructor,
      };
      setInstructors([...instructors, newInstructor]);
      
      toast({
        title: "Instructor Added",
        description: `${currentInstructor.name} has been added as an instructor.`,
      });
    }
    
    setIsDialogOpen(false);
  };

  // Update current instructor state when form fields change
  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setCurrentInstructor({
        ...currentInstructor,
        [parent]: {
          ...currentInstructor[parent],
          [child]: value
        }
      });
    } else {
      setCurrentInstructor({
        ...currentInstructor,
        [field]: value,
      });
    }
  };

  // Add dance type to instructor
  const handleAddDanceType = () => {
    if (danceTypeInput && !currentInstructor.danceTypes.includes(danceTypeInput)) {
      setCurrentInstructor({
        ...currentInstructor,
        danceTypes: [...currentInstructor.danceTypes, danceTypeInput]
      });
      setDanceTypeInput('');
    }
  };

  // Remove dance type from instructor
  const handleRemoveDanceType = (type: string) => {
    setCurrentInstructor({
      ...currentInstructor,
      danceTypes: currentInstructor.danceTypes.filter((t: string) => t !== type)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Instructors</h1>
        <SearchBar 
          placeholder="Search instructors..." 
          value={searchQuery} 
          onChange={setSearchQuery} 
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleAddInstructor} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add Instructor
        </Button>
      </div>
      
      {/* Instructors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInstructors.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No instructors found
          </div>
        ) : (
          filteredInstructors.map((instructor) => (
            <Card key={instructor.id} className="overflow-hidden">
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <img 
                  src={instructor.photo} 
                  alt={instructor.name}
                  className="max-h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{instructor.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {instructor.danceTypes.map((type, index) => (
                        <Badge key={index} variant="outline">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditInstructor(instructor)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDeleteInstructor(instructor.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {instructor.bio}
                </p>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Email:</span> {instructor.contactInfo.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {instructor.contactInfo.phone}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add/Edit Instructor Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Instructor" : "Add New Instructor"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Instructor Name*</Label>
                <Input
                  id="name"
                  value={currentInstructor?.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter instructor name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Upload Photo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 border rounded flex items-center justify-center bg-gray-100">
                    {currentInstructor?.photo && (
                      <img 
                        src={currentInstructor.photo} 
                        alt="Instructor" 
                        className="max-h-full max-w-full object-cover"
                      />
                    )}
                  </div>
                  <Button type="button" variant="outline" className="flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    Choose Image
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Recommended size: 300x300 px. Max size: 2MB
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Dance Types*</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {currentInstructor?.danceTypes.map((type: string, index: number) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {type}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1 text-muted-foreground hover:text-foreground"
                        onClick={() => handleRemoveDanceType(type)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add dance type"
                    value={danceTypeInput}
                    onChange={(e) => setDanceTypeInput(e.target.value)}
                  />
                  <Button 
                    type="button" 
                    onClick={handleAddDanceType}
                    variant="outline"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={currentInstructor?.bio || ''}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Enter instructor bio"
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={currentInstructor?.contactInfo?.email || ''}
                    onChange={(e) => handleInputChange('contactInfo.email', e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={currentInstructor?.contactInfo?.phone || ''}
                    onChange={(e) => handleInputChange('contactInfo.phone', e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? "Save Changes" : "Add Instructor"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditInstructors;
