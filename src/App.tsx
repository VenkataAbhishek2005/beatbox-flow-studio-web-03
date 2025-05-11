
import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Classes from './pages/Classes';
import Instructors from './pages/Instructors';
import Gallery from './pages/Gallery';
import NotFound from './pages/NotFound';
import { Toaster } from "sonner";
import { connectToDatabase } from './lib/db';

// Admin Pages
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ViewStudents from './pages/admin/ViewStudents';
import AddStudent from './pages/admin/AddStudent';
import Transactions from './pages/admin/Transactions';
import Reminders from './pages/admin/Reminders';
import EditClasses from './pages/admin/EditClasses';
import EditInstructors from './pages/admin/EditInstructors';
import EditGallery from './pages/admin/EditGallery';

function App() {
  useEffect(() => {
    // Connect to MongoDB when the app starts
    connectToDatabase();
  }, []);

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/instructors" element={<Instructors />} />
        <Route path="/gallery" element={<Gallery />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<ViewStudents />} />
          <Route path="students/add" element={<AddStudent />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="reminders" element={<Reminders />} />
          <Route path="classes" element={<EditClasses />} />
          <Route path="instructors" element={<EditInstructors />} />
          <Route path="gallery" element={<EditGallery />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
