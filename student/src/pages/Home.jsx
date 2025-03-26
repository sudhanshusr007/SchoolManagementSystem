import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import SubjectCard from "../components/SubjectCard";

const subjects = [
  { name: "Mathematics", teacher: "John Doe" },
  { name: "Science", teacher: "Jane Smith" },
];

const Dashboard = () => {
  const [firstName, setFirstName] = useState("Student"); // Default value

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const fetchStudentDetails = async () => {
        try {
          const response = await fetch("http://localhost:8000/api/student/profile", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!response.ok) throw new Error("Failed to fetch student details");

          const data = await response.json();
          setFirstName(data.name.split(" ")[0]); // Extract first name
        } catch (error) {
          console.error(error);
        }
      };

      fetchStudentDetails();
    }
  }, [token]);

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-8 bg-gray-100">
        {/* Greeting */}
        <h1 className="text-3xl font-semibold mb-4">Hi, {firstName} 👋</h1>

        {/* Enrolled Subjects */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-semibold">Enrolled Subjects</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <SubjectCard key={index} subject={subject} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
