
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/admin/SearchBar';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock class data
const mockClasses = [
  {
    id: '1',
    className: 'Hip-Hop Beginners',
    danceType: 'WESTERN',
    instructor: 'Rajesh Kumar',
    instructorId: '1',
    batchNo: 1,
    timings: 'Mon, Wed, Fri 4:00 PM - 5:30 PM',
  },
  {
    id: '2',
    className: 'Bharatanatyam Advanced',
    danceType: 'CLASSICAL',
    instructor: 'Meera Sharma',
    instructorId: '2',
    batchNo: 2,
    timings: 'Tue, Thu, Sat 5:00 PM - 6:30 PM',
  },
  {
    id: '3',
    className: 'Contemporary Dance',
    danceType: 'WESTERN',
    instructor: 'Arjun Singh',
    instructorId: '3',
    batchNo: 3,
    timings: 'Mon, Thu 6:00 PM - 7:30 PM',
  },
];

// Mock instructors for dropdown
const mockInstructors = [
  { id: '1', name: 'Rajesh Kumar' },
  { id: '2', name: 'Meera Sharma' },
  { id: '3', name: 'Arjun Singh' },
  { id: '4', name: 'Priya Patel' },
];

const EditClasses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [classes, setClasses] = useState(mockClasses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentClass, setCurrentClass] = useState<any>(null);
  const { toast } = useToast();

  // Filter classes based on search query
  const filteredClasses = classes.filter(classItem => 
    classItem.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
    classItem.danceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    classItem.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open dialog for adding a new class
  const handleAddClass = () => {
    setCurrentClass({
      className: '',
      danceType: '',
      instructorId: '',
      batchNo: 1,
      timings: '',
    });
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  // Open dialog for editing an existing class
  const handleEditClass = (classItem: any) => {
    setCurrentClass({ ...classItem });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  // Handle class deletion
  const handleDeleteClass = (id: string) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      // This would connect to the backend API
      const updatedClasses = classes.filter(classItem => classItem.id !== id);
      setClasses(updatedClasses);
      
      toast({
        title: "Class Deleted",
        description: "The class has been successfully deleted.",
      });
    }
  };

  // Handle form submission for adding/editing class
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Find instructor name based on ID
    const instructor = mockInstructors.find(i => i.id === currentClass.instructorId)?.name || '';
    
    if (isEditMode) {
      // Update existing class
      const updatedClasses = classes.map(classItem => 
        classItem.id === currentClass.id 
          ? { ...currentClass, instructor } 
          : classItem
      );
      setClasses(updatedClasses);
      
      toast({
        title: "Class Updated",
        description: `Class "${currentClass.className}" has been updated.`,
      });
    } else {
      // Add new class
      const newClass = {
        id: Date.now().toString(),
        ...currentClass,
        instructor,
      };
      setClasses([...classes, newClass]);
      
      toast({
        title: "Class Added",
        description: `Class "${currentClass.className}" has been created.`,
      });
    }
    
    setIsDialogOpen(false);
  };

  // Update current class state when form fields change
  const handleInputChange = (field: string, value: string | number) => {
    setCurrentClass({
      ...currentClass,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Classes</h1>
        <SearchBar 
          placeholder="Search classes..." 
          value={searchQuery} 
          onChange={setSearchQuery} 
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleAddClass} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Class
        </Button>
      </div>
      
      {/* Classes Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class Name</TableHead>
              <TableHead>Dance Type</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Timings</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClasses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No classes found
                </TableCell>
              </TableRow>
            ) : (
              filteredClasses.map((classItem) => (
                <TableRow key={classItem.id}>
                  <TableCell className="font-medium">{classItem.className}</TableCell>
                  <TableCell>{classItem.danceType}</TableCell>
                  <TableCell>{classItem.instructor}</TableCell>
                  <TableCell>Batch {classItem.batchNo}</TableCell>
                  <TableCell>{classItem.timings}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditClass(classItem)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteClass(classItem.id)}
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

      {/* Add/Edit Class Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Class" : "Add New Class"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="className">Class Name*</Label>
                <Input
                  id="className"
                  value={currentClass?.className || ''}
                  onChange={(e) => handleInputChange('className', e.target.value)}
                  placeholder="Enter class name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="danceType">Dance Type*</Label>
                <Select 
                  value={currentClass?.danceType || ''} 
                  onValueChange={(value) => handleInputChange('danceType', value)}
                  required
                >
                  <SelectTrigger id="danceType">
                    <SelectValue placeholder="Select dance type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WESTERN">WESTERN</SelectItem>
                    <SelectItem value="CLASSICAL">CLASSICAL</SelectItem>
                    <SelectItem value="HIP-HOP">HIP-HOP</SelectItem>
                    <SelectItem value="CONTEMPORARY">CONTEMPORARY</SelectItem>
                    <SelectItem value="BHARATANATYAM">BHARATANATYAM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor*</Label>
                <Select 
                  value={currentClass?.instructorId || ''} 
                  onValueChange={(value) => handleInputChange('instructorId', value)}
                  required
                >
                  <SelectTrigger id="instructor">
                    <SelectValue placeholder="Select instructor" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockInstructors.map(instructor => (
                      <SelectItem key={instructor.id} value={instructor.id}>
                        {instructor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="batchNo">Batch Number*</Label>
                <Input
                  id="batchNo"
                  type="number"
                  min="1"
                  value={currentClass?.batchNo || 1}
                  onChange={(e) => handleInputChange('batchNo', parseInt(e.target.value))}
                  required
                />
              </div>
              
              <div className="col-span-2 space-y-2">
                <Label htmlFor="timings">Timings*</Label>
                <Input
                  id="timings"
                  value={currentClass?.timings || ''}
                  onChange={(e) => handleInputChange('timings', e.target.value)}
                  placeholder="E.g. Mon, Wed, Fri 4:00 PM - 5:30 PM"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? "Save Changes" : "Add Class"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditClasses;
