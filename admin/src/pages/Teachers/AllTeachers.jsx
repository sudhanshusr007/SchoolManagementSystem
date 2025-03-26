import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { User, Book, Users, LogOut } from 'lucide-react';
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../components/Sidebar";
import { checkAuth } from "../../utils/auth";

const AllTeachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    checkAuth();
    // Fetch all teachers when the component mounts
    const getAllTeachers = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:8000/api/admin/get-all-teachers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeachers(response.data);
      } catch (error) {
        toast.error("Failed to fetch teachers.");
      }
    };
    getAllTeachers();
  }, []);

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-semibold">All Teachers</span>
          </div>
        </div>

        {/* Table of Teachers */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Employee ID</th>
                <th className="px-6 py-3 text-left">Classes Assigned</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">{teacher.name}</td>
                  <td className="px-6 py-4">{teacher.email}</td>
                  <td className="px-6 py-4">{teacher.phone}</td>
                  <td className="px-6 py-4">{teacher.employee_id}</td>
                  <td className="px-6 py-4">{teacher.classes_assigned?.join(', ') || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AllTeachers;
