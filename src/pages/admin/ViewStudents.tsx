
import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/admin/SearchBar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Mock student data (this would come from API in a real app)
const mockStudents = [
  {
    id: '1',
    admissionNumber: 'BB2023001',
    firstName: 'Rahul',
    lastName: 'Sharma',
    status: 'active',
    gender: 'male',
    danceTypes: ['WESTERN', 'HIP-HOP'],
    batchNo: 2,
    colony: 'Green Park',
    area: 'South Delhi',
    city: 'Delhi',
    postalCode: 110016,
    parentName: 'Suresh Sharma',
    mobileNumber: { countryCode: '+91', number: '9876543210' },
    classFee: 1500,
    costumeFee: 2000
  },
  {
    id: '2',
    admissionNumber: 'BB2023002',
    firstName: 'Priya',
    lastName: 'Patel',
    status: 'active',
    gender: 'female',
    danceTypes: ['CLASSICAL', 'BHARATANATYAM'],
    batchNo: 1,
    colony: 'Vasant Kunj',
    area: 'South West Delhi',
    city: 'Delhi',
    postalCode: 110070,
    parentName: 'Amit Patel',
    mobileNumber: { countryCode: '+91', number: '8765432109' },
    classFee: 1800,
    costumeFee: 2500
  },
  {
    id: '3',
    admissionNumber: 'BB2023003',
    firstName: 'Aryan',
    lastName: 'Singh',
    status: 'inactive',
    gender: 'male',
    danceTypes: ['WESTERN'],
    batchNo: 3,
    colony: 'Dwarka',
    area: 'West Delhi',
    city: 'Delhi',
    postalCode: 110075,
    parentName: 'Rajesh Singh',
    mobileNumber: { countryCode: '+91', number: '7654321098' },
    classFee: 1500,
    costumeFee: 2000
  }
];

const ViewStudents: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedStudent, setEditedStudent] = useState<any>(null);
  const { toast } = useToast();

  // Filter students based on search query
  const filteredStudents = students.filter(student => 
    student.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRowClick = (student: any) => {
    setSelectedStudent(student);
    setIsDialogOpen(true);
    setIsEditMode(false);
  };

  const handleEdit = () => {
    setEditedStudent({...selectedStudent});
    setIsEditMode(true);
  };

  const handleSaveEdit = () => {
    // Update the student in the list
    const updatedStudents = students.map(student => 
      student.id === editedStudent.id ? editedStudent : student
    );
    
    setStudents(updatedStudents);
    setSelectedStudent(editedStudent);
    setIsEditMode(false);
    
    toast({
      title: "Success",
      description: "Student information updated successfully",
    });
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedStudent(null);
  };

  const handleRemove = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedStudent.firstName} ${selectedStudent.lastName}?`)) {
      // Remove student from the list
      const updatedStudents = students.filter(student => student.id !== selectedStudent.id);
      setStudents(updatedStudents);
      setIsDialogOpen(false);
      
      toast({
        title: "Success",
        description: "Student removed successfully",
      });
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setEditedStudent({
      ...editedStudent,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Students</h1>
        <SearchBar 
          placeholder="Search by admission no. or name..." 
          value={searchQuery} 
          onChange={setSearchQuery} 
        />
      </div>

      {/* Students Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Admission No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Batch</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No students found
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow 
                  key={student.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(student)}
                >
                  <TableCell>{student.admissionNumber}</TableCell>
                  <TableCell>
                    {student.firstName} {student.lastName}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={student.status === 'active' ? 'default' : 'secondary'}
                      className={student.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>Batch {student.batchNo}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Student Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Student" : "Student Details"}</DialogTitle>
          </DialogHeader>

          {selectedStudent && !isEditMode && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <p className="text-sm text-muted-foreground">Admission No.:</p>
                    <p className="text-sm">{selectedStudent.admissionNumber}</p>
                    <p className="text-sm text-muted-foreground">Name:</p>
                    <p className="text-sm">{selectedStudent.firstName} {selectedStudent.lastName}</p>
                    <p className="text-sm text-muted-foreground">Gender:</p>
                    <p className="text-sm capitalize">{selectedStudent.gender}</p>
                    <p className="text-sm text-muted-foreground">Status:</p>
                    <p className="text-sm">
                      <Badge 
                        variant={selectedStudent.status === 'active' ? 'default' : 'secondary'}
                        className={selectedStudent.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}
                      >
                        {selectedStudent.status}
                      </Badge>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Dance Information</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <p className="text-sm text-muted-foreground">Dance Types:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedStudent.danceTypes.map((type: string, idx: number) => (
                        <Badge key={idx} variant="outline">{type}</Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">Batch Number:</p>
                    <p className="text-sm">{selectedStudent.batchNo}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <p className="text-sm text-muted-foreground">Parent Name:</p>
                    <p className="text-sm">{selectedStudent.parentName}</p>
                    <p className="text-sm text-muted-foreground">Mobile Number:</p>
                    <p className="text-sm">{selectedStudent.mobileNumber.countryCode} {selectedStudent.mobileNumber.number}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Fee Details</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <p className="text-sm text-muted-foreground">Class Fee:</p>
                    <p className="text-sm">₹{selectedStudent.classFee}</p>
                    <p className="text-sm text-muted-foreground">Costume Fee:</p>
                    <p className="text-sm">₹{selectedStudent.costumeFee}</p>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <Button variant="outline" onClick={handleEdit}>
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={handleRemove}>
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Form */}
          {selectedStudent && isEditMode && editedStudent && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  <div className="space-y-2 mt-2">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        value={editedStudent.firstName} 
                        onChange={(e) => handleInputChange('firstName', e.target.value)} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={editedStudent.lastName} 
                        onChange={(e) => handleInputChange('lastName', e.target.value)} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <select 
                        id="status"
                        className="w-full p-2 border rounded"
                        value={editedStudent.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Dance Information</h3>
                  <div className="space-y-2 mt-2">
                    <div>
                      <Label htmlFor="batchNo">Batch Number</Label>
                      <Input 
                        id="batchNo"
                        type="number" 
                        value={editedStudent.batchNo} 
                        onChange={(e) => handleInputChange('batchNo', parseInt(e.target.value))} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                  <div className="space-y-2 mt-2">
                    <div>
                      <Label htmlFor="parentName">Parent Name</Label>
                      <Input 
                        id="parentName" 
                        value={editedStudent.parentName} 
                        onChange={(e) => handleInputChange('parentName', e.target.value)} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="mobileNumber">Mobile Number</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="countryCode"
                          className="w-20"
                          value={editedStudent.mobileNumber.countryCode} 
                          onChange={(e) => handleInputChange('mobileNumber', {...editedStudent.mobileNumber, countryCode: e.target.value})} 
                        />
                        <Input 
                          id="number" 
                          value={editedStudent.mobileNumber.number} 
                          onChange={(e) => handleInputChange('mobileNumber', {...editedStudent.mobileNumber, number: e.target.value})} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Fee Details</h3>
                  <div className="space-y-2 mt-2">
                    <div>
                      <Label htmlFor="classFee">Class Fee (₹)</Label>
                      <Input 
                        id="classFee" 
                        type="number"
                        value={editedStudent.classFee} 
                        onChange={(e) => handleInputChange('classFee', parseInt(e.target.value))} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="costumeFee">Costume Fee (₹)</Label>
                      <Input 
                        id="costumeFee" 
                        type="number"
                        value={editedStudent.costumeFee} 
                        onChange={(e) => handleInputChange('costumeFee', parseInt(e.target.value))} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isEditMode && (
            <DialogFooter className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewStudents;
