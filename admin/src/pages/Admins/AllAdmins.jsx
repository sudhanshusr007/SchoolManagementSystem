import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { User, Book, Users, LogOut } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../components/Sidebar";
import { checkAuth } from "../../utils/auth";

const AllAdmins = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    checkAuth();
    // Fetch all admins when the component mounts
    const getAllAdmins = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:8000/api/admin/get-all-admins", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmins(response.data);
      } catch (error) {
        toast.error("Failed to fetch admins.");
      }
    };
    getAllAdmins();
  }, []);

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-semibold">All Admins</span>
          </div>
        </div>

        {/* Table of Admins */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">{admin.name}</td>
                  <td className="px-6 py-4">{admin.email}</td>
                  <td className="px-6 py-4">{admin.role}</td>
                  <td className="px-6 py-4">
                    {/* You can add actions here like "Edit" or "Delete" */}
                    <Link to={`/edit-admin/${admin.id}`} className="text-blue-500 hover:underline">
                      Edit
                    </Link>
                  </td>
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

export default AllAdmins;
