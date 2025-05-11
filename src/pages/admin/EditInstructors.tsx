
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/admin/SearchBar';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock instructor data
const mockInstructors = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    photo: '/placeholder.svg',
    danceTypes: ['Hip-Hop', 'Contemporary'],
    bio: 'Professional dancer with 10 years of experience in Hip-Hop and Contemporary dance styles.',
    contact: {
      email: 'rajesh@example.com',
      phone: '+91 98765 43210'
    }
  },
  {
    id: '2',
    name: 'Meera Sharma',
    photo: '/placeholder.svg',
    danceTypes: ['Bharatanatyam', 'Kathak'],
    bio: 'Classical dance expert specializing in Bharatanatyam and Kathak with over 15 years of experience.',
    contact: {
      email: 'meera@example.com',
      phone: '+91 87654 32109'
    }
  },
  {
    id: '3',
    name: 'Arjun Singh',
    photo: '/placeholder.svg',
    danceTypes: ['Breaking', 'Popping'],
    bio: 'Specialized in street dance styles including Breaking and Popping. Has won multiple national competitions.',
    contact: {
      email: 'arjun@example.com',
      phone: '+91 76543 21098'
    }
  },
];

// Available dance types for selection
const availableDanceTypes = [
  'Hip-Hop', 'Contemporary', 'Bharatanatyam', 'Kathak', 
  'Breaking', 'Popping', 'Ballet', 'Jazz', 'Salsa'
];

const EditInstructors: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [instructors, setInstructors] = useState(mockInstructors);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentInstructor, setCurrentInstructor] = useState<any>(null);
  const [selectedDanceTypes, setSelectedDanceTypes] = useState<string[]>([]);
  const { toast } = useToast();

  // Filter instructors based on search query
  const filteredInstructors = instructors.filter(instructor => 
    instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    instructor.danceTypes.some(type => type.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Open dialog for adding a new instructor
  const handleAddInstructor = () => {
    setCurrentInstructor({
      name: '',
      photo: '/placeholder.svg',
      danceTypes: [],
      bio: '',
      contact: { email: '', phone: '' }
    });
    setSelectedDanceTypes([]);
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  // Open dialog for editing an existing instructor
  const handleEditInstructor = (instructor: any) => {
    setCurrentInstructor({ ...instructor });
    setSelectedDanceTypes([...instructor.danceTypes]);
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
        description: "The instructor has been successfully removed.",
      });
    }
  };

  // Handle form submission for adding/editing instructor
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedInstructor = {
      ...currentInstructor,
      danceTypes: selectedDanceTypes
    };
    
    if (isEditMode) {
      // Update existing instructor
      const updatedInstructors = instructors.map(instructor => 
        instructor.id === currentInstructor.id 
          ? updatedInstructor 
          : instructor
      );
      setInstructors(updatedInstructors);
      
      toast({
        title: "Instructor Updated",
        description: `Instructor "${currentInstructor.name}" has been updated.`,
      });
    } else {
      // Add new instructor
      const newInstructor = {
        id: Date.now().toString(),
        ...updatedInstructor,
      };
      setInstructors([...instructors, newInstructor]);
      
      toast({
        title: "Instructor Added",
        description: `Instructor "${currentInstructor.name}" has been added.`,
      });
    }
    
    setIsDialogOpen(false);
  };

  // Update current instructor state when form fields change
  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      // Handle nested fields like 'contact.email'
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

  // Toggle dance type selection
  const toggleDanceType = (type: string) => {
    if (selectedDanceTypes.includes(type)) {
      setSelectedDanceTypes(selectedDanceTypes.filter(t => t !== type));
    } else {
      setSelectedDanceTypes([...selectedDanceTypes, type]);
    }
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
          <Plus className="h-4 w-4" />
          Add Instructor
        </Button>
      </div>
      
      {/* Instructors Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Photo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Dance Types</TableHead>
              <TableHead>Contact Information</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInstructors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No instructors found
                </TableCell>
              </TableRow>
            ) : (
              filteredInstructors.map((instructor) => (
                <TableRow key={instructor.id}>
                  <TableCell>
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                      <img 
                        src={instructor.photo} 
                        alt={instructor.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{instructor.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {instructor.danceTypes.map((type, index) => (
                        <span 
                          key={index}
                          className="bg-studio-blue bg-opacity-10 text-studio-blue text-xs px-2 py-1 rounded-full"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{instructor.contact.email}</p>
                      <p>{instructor.contact.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
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
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Instructor Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Instructor" : "Add New Instructor"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Instructor Photo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100">
                    <img 
                      src={currentInstructor?.photo || '/placeholder.svg'} 
                      alt="Instructor"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <Button type="button" variant="outline" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Photo
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name*</Label>
                <Input
                  id="name"
                  value={currentInstructor?.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter instructor's full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Dance Types*</Label>
                <div className="grid grid-cols-3 gap-2">
                  {availableDanceTypes.map((type, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`dance-type-${index}`}
                        checked={selectedDanceTypes.includes(type)}
                        onChange={() => toggleDanceType(type)}
                        className="mr-2"
                      />
                      <Label htmlFor={`dance-type-${index}`} className="cursor-pointer text-sm">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  value={currentInstructor?.bio || ''}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Enter instructor's bio and experience"
                  className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={currentInstructor?.contact?.email || ''}
                    onChange={(e) => handleInputChange('contact.email', e.target.value)}
                    placeholder="Email address"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number*</Label>
                  <Input
                    id="phone"
                    value={currentInstructor?.contact?.phone || ''}
                    onChange={(e) => handleInputChange('contact.phone', e.target.value)}
                    placeholder="Phone number with country code"
                    required
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
