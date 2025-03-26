// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { logout, checkAuth } from "../utils/auth"; // Import the logout and checkAuth functions
import Sidebar from "../components/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [studentsCount, setStudentsCount] = useState(0);
  const [teachersCount, setTeachersCount] = useState(0);
  const [adminsCount, setAdminsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth(); // Check if the user is authenticated when the page loads

    const fetchData = async () => {
      try {
        const studentResponse = await axios.get(
          "http://localhost:8000/api/admin/get-all-students",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStudentsCount(studentResponse.data.length);

        const teacherResponse = await axios.get(
          "http://localhost:8000/api/admin/get-all-teachers",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTeachersCount(teacherResponse.data.length);

        const adminResponse = await axios.get(
            "http://localhost:8000/api/admin/get-all-admins",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setAdminsCount(adminResponse.data.length);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
        toast.error("Failed to fetch data.");
      }
    };

    fetchData();
  }, []);

 

  return (
    <div className="h-screen flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-semibold">Welcome, Admin</span>
          </div>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Total Students</h3>
              <p className="text-2xl">{studentsCount}</p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Total Teachers</h3>
              <p className="text-2xl">{teachersCount}</p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Total Admins</h3>
              <p className="text-2xl">{adminsCount}</p>
            </div>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Dashboard;
