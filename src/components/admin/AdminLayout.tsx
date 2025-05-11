
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Toaster } from '@/components/ui/toaster';

const AdminLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default AdminLayout;
