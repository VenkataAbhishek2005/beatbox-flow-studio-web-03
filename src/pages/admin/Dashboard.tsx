
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/admin/SearchBar';
import { Download } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for dashboard stats
  const stats = [
    { 
      title: 'Current Students',
      value: '145',
      description: 'Active students',
      trend: '+5% from last month'
    },
    { 
      title: 'Amount to be Received (Month)',
      value: '₹45,000',
      description: 'Current month',
      trend: '+12% from last month'
    },
    { 
      title: 'Total Amount to be Received',
      value: '₹120,000',
      description: 'All time',
      trend: '+8% from last quarter'
    },
    { 
      title: 'Amount Received (Month)',
      value: '₹38,500',
      description: 'Current month',
      trend: '+15% from last month'
    }
  ];

  // Function to handle Excel download
  const handleDownloadExcel = () => {
    // This would connect to the backend to generate and download Excel
    console.log('Downloading Excel...');
    alert('Excel download functionality will be implemented with the backend integration');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <SearchBar 
          placeholder="Search dashboard stats..." 
          value={searchQuery} 
          onChange={setSearchQuery} 
        />
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <p className="text-xs text-green-500 mt-2">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Download Button */}
      <div className="mt-8 flex justify-center">
        <Button 
          onClick={handleDownloadExcel}
          className="flex items-center gap-2 bg-studio-blue hover:bg-blue-700"
        >
          <Download className="h-4 w-4" />
          Download Student Details (Excel)
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
