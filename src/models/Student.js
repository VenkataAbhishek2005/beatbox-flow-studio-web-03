
// Mock Student model for browser environment
// In a real app with proper backend, this would use actual Mongoose

// Mock data storage
const students = [
  {
    _id: '1',
    admissionNumber: 'BB2023001',
    firstName: 'Rahul',
    lastName: 'Sharma',
    dob: new Date('2005-05-15'),
    gender: 'male',
    danceTypes: ['WESTERN', 'HIP-HOP'],
    batchNo: 2,
    colony: 'Green Park',
    area: 'South Delhi',
    city: 'Delhi',
    postalCode: 110016,
    parentName: 'Suresh Sharma',
    mobileNumber: { countryCode: '+91', number: '9876543210' },
    designation: 'Student',
    email: 'rahul.sharma@example.com',
    classFee: 1500,
    costumeFee: 2000,
    isActive: true,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    _id: '2',
    admissionNumber: 'BB2023002',
    firstName: 'Priya',
    lastName: 'Patel',
    dob: new Date('2006-07-25'),
    gender: 'female',
    danceTypes: ['CLASSICAL', 'BHARATANATYAM'],
    batchNo: 1,
    colony: 'Vasant Kunj',
    area: 'South West Delhi',
    city: 'Delhi',
    postalCode: 110070,
    parentName: 'Amit Patel',
    mobileNumber: { countryCode: '+91', number: '8765432109' },
    designation: 'Student',
    email: 'priya.patel@example.com',
    classFee: 1800,
    costumeFee: 2500,
    isActive: true,
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-02-10')
  },
  {
    _id: '3',
    admissionNumber: 'BB2023003',
    firstName: 'Aryan',
    lastName: 'Singh',
    dob: new Date('2007-03-12'),
    gender: 'male',
    danceTypes: ['WESTERN'],
    batchNo: 3,
    colony: 'Dwarka',
    area: 'West Delhi',
    city: 'Delhi',
    postalCode: 110075,
    parentName: 'Rajesh Singh',
    mobileNumber: { countryCode: '+91', number: '7654321098' },
    designation: 'Student',
    email: 'aryan.singh@example.com',
    classFee: 1500,
    costumeFee: 2000,
    isActive: false,
    createdAt: new Date('2023-03-05'),
    updatedAt: new Date('2023-04-15')
  }
];

// Mock Student model
const Student = {
  findById: async (id) => {
    return students.find(student => student._id === id);
  },
  findOne: async (query) => {
    if (query.admissionNumber) {
      return students.find(student => student.admissionNumber === query.admissionNumber);
    }
    return null;
  },
  find: async () => {
    return [...students];
  }
};

export default Student;
