import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { checkAuth } from "../../utils/auth";

const AllStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    checkAuth();
    // Fetch all students when the component mounts
    const getAllStudents = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:8000/api/admin/get-all-students", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(response.data);
      } catch (error) {
        toast.error("Failed to fetch students.");
      }
    };
    getAllStudents();
  }, []);

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-semibold">All Students</span>
        </div>

        {/* Table of Students */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Enrollment Number</th>
                <th className="px-6 py-3 text-left font-medium">Name</th>
                <th className="px-6 py-3 text-left font-medium">Email</th>
                <th className="px-6 py-3 text-left font-medium">Phone</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr
                    key={student._id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="px-6 py-4">{student.enrollment_number}</td>
                    <td className="px-6 py-4">
                      <Link to={`/students/${student._id}`} className="text-blue-600 hover:underline">
                        {student.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{student.email}</td>
                    <td className="px-6 py-4">{student.phone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AllStudents;
