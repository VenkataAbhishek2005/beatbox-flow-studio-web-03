
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Receipt, 
  Bell, 
  Pencil, 
  Image, 
  LogOut,
  Search
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  
  // Navigation items
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'View Students', path: '/admin/students', icon: <Users className="h-5 w-5" /> },
    { name: 'Add Student', path: '/admin/students/add', icon: <UserPlus className="h-5 w-5" /> },
    { name: 'Transactions', path: '/admin/transactions', icon: <Receipt className="h-5 w-5" /> },
    { name: 'Reminders', path: '/admin/reminders', icon: <Bell className="h-5 w-5" /> },
    { name: 'Edit Classes', path: '/admin/classes', icon: <Pencil className="h-5 w-5" /> },
    { name: 'Edit Instructors', path: '/admin/instructors', icon: <Users className="h-5 w-5" /> },
    { name: 'Edit Gallery', path: '/admin/gallery', icon: <Image className="h-5 w-5" /> },
  ];

  return (
    <div className="w-64 bg-studio-blue text-white min-h-screen flex flex-col">
      <div className="p-5 border-b border-white/10">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="text-sm opacity-75">Beatbox Dance & Fitness</p>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? "bg-white/20 text-white"
                    : "hover:bg-white/10"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
          
          {/* Logout */}
          <li className="mt-auto pt-4 border-t border-white/10">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-white/10 text-red-300 hover:text-red-200 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
