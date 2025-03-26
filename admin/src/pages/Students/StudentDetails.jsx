import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentDetails = () => {
  const { id } = useParams(); // Get student _id from URL
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`http://localhost:8000/api/admin/get-student/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudent(response.data);
      } catch (error) {
        toast.error("Failed to fetch student details.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudentDetails();
  }, [id]);

  // Handle Delete Student
  const handleDelete = async () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        try {
          await axios.delete(`http://localhost:8000/api/admin/delete-student/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          MySwal.fire("Deleted!", "The student has been removed.", "success");
          navigate("/students"); // Redirect to all students page after deletion
        } catch (error) {
          MySwal.fire("Error!", "Failed to delete the student.", "error");
        }
      }
    });
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!student) return <div className="h-screen flex items-center justify-center">Student not found</div>;

  return (
    <div className="h-screen flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-semibold">Student Details</span>
          <div className="space-x-4">
            <button
              onClick={() => navigate(`/students/${id}/edit`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <div className="flex items-center space-x-6">
            <img
              src={student.profile_picture || "https://via.placeholder.com/100"}
              alt={student.name}
              className="w-24 h-24 rounded-full border"
            />
            <div>
              <h2 className="text-2xl font-semibold">{student.name}</h2>
              <p className="text-gray-600">{student.email}</p>
              <p className="text-gray-600">{student.phone}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Enrollment Number:</h3>
            <p className="text-gray-700">{student.enrollment_number}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Subjects:</h3>
            {student.subjects.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700">
                {student.subjects.map((subject, index) => (
                  <li key={index}>{subject}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No subjects enrolled.</p>
            )}
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default StudentDetails;
