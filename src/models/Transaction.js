
// Mock Transaction model for browser environment
// In a real app with proper backend, this would use actual Mongoose

// Mock data storage
const transactions = [
  {
    _id: '101',
    student: '1',
    amount: 1500,
    status: 'paid',
    date: new Date('2023-05-10'),
    month: 5,
    year: 2023
  },
  {
    _id: '102',
    student: '1',
    amount: 1500,
    status: 'unpaid',
    date: new Date('2023-06-10'),
    month: 6,
    year: 2023
  },
  {
    _id: '103',
    student: '2',
    amount: 1800,
    status: 'paid',
    date: new Date('2023-05-15'),
    month: 5,
    year: 2023
  },
  {
    _id: '104',
    student: '2',
    amount: 1800,
    status: 'unpaid',
    date: new Date('2023-06-15'),
    month: 6,
    year: 2023
  },
  {
    _id: '105',
    student: '3',
    amount: 1500,
    status: 'unpaid',
    date: new Date(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  }
];

// Mock Transaction model
const Transaction = {
  find: async (query = {}) => {
    let result = [...transactions];
    
    if (query.student) {
      result = result.filter(t => t.student === query.student);
    }
    
    if (query.status) {
      result = result.filter(t => t.status === query.status);
    }
    
    if (query.month) {
      result = result.filter(t => t.month === query.month);
    }
    
    if (query.year) {
      result = result.filter(t => t.year === query.year);
    }
    
    return result;
  },
  
  findById: async (id) => {
    return transactions.find(t => t._id === id);
  },
  
  populate: function(items, field) {
    return items.map(item => {
      if (field === 'student') {
        const student = students.find(s => s._id === item.student);
        return {
          ...item,
          student: student || item.student
        };
      }
      return item;
    });
  }
};

// Add populate method to query results
Transaction.find = async function(query) {
  const results = await Object.getPrototypeOf(Transaction).find.call(this, query);
  
  // Add a populate method to the array
  results.populate = function(field) {
    return Transaction.populate(this, field);
  };
  
  // Add a sort method
  results.sort = function(sortQuery) {
    const key = Object.keys(sortQuery)[0];
    const order = sortQuery[key];
    
    return this.sort((a, b) => {
      if (order === -1) {
        return b[key] - a[key];
      } else {
        return a[key] - b[key];
      }
    });
  };
  
  return results;
};

// Mock data for students (to reference in populate)
const students = [
  {
    _id: '1',
    admissionNumber: 'BB2023001',
    firstName: 'Rahul',
    lastName: 'Sharma',
  },
  {
    _id: '2',
    admissionNumber: 'BB2023002',
    firstName: 'Priya',
    lastName: 'Patel',
  },
  {
    _id: '3',
    admissionNumber: 'BB2023003',
    firstName: 'Aryan',
    lastName: 'Singh',
  }
];

export default Transaction;
