// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { User, Book, FileText, Settings, LogOut } from "lucide-react";  // Added new icons for courses, assignments, and settings
import { logout } from "../utils/auth";

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-800 text-white p-6 flex flex-col h-full">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Student Panel</h2>
        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="flex items-center text-lg hover:text-blue-400"
          >
            <User className="mr-3" /> Dashboard
          </Link>
          <Link
            to="/courses"
            className="flex items-center text-lg hover:text-blue-400"
          >
            <Book className="mr-3" /> Courses
          </Link>
          <Link
            to="/assignments"
            className="flex items-center text-lg hover:text-blue-400"
          >
            <FileText className="mr-3" /> Assignments
          </Link>
          
          <Link
            to="/settings"
            className="flex items-center text-lg hover:text-blue-400"
          >
            <Settings className="mr-3" /> Settings
          </Link>
        </div>
      </div>

      
      {/* Logout Button at the bottom styled as a button */}
            <div className="mt-auto">
              <button
                onClick={logout}  // Call the logout function on click
                className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
              >
                <LogOut className="mr-2" /> LogOut
              </button>
            </div>
    </div>
  );
};

export default Sidebar;
