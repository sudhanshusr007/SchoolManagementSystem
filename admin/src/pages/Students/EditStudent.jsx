import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const EditStudent = () => {
  const { id } = useParams(); // Get student _id from URL
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    enrollment_number: "",
    subjects: "",
  });
  const [loading, setLoading] = useState(true);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:8000/api/admin/get-student/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStudent({
          ...response.data,
          subjects: response.data.subjects.join(", "), // Convert array to comma-separated string
        });
      } catch (error) {
        MySwal.fire("Error", "Failed to fetch student details", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchStudentDetails();
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // Handle Update Student
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:8000/api/admin/update-student/${id}`,
        {
          ...student,
          subjects: student.subjects.split(",").map((s) => s.trim()),
        }, // Convert string to array
        { headers: { Authorization: `Bearer ${token}` } }
      );

      MySwal.fire(
        "Success!",
        "Student details updated successfully.",
        "success"
      ).then(() => {
        navigate(`/students/${id}`);
      });
    } catch (error) {
      MySwal.fire("Error", "Failed to update student details.", "error");
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="h-screen flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Edit Student</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600">Name:</label>
              <input
                type="text"
                name="name"
                value={student.name}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600">Email:</label>
              <input
                type="email"
                name="email"
                value={student.email}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600">Phone:</label>
              <input
                type="tel"
                maxLength={10}
                minLength={10}
                name="phone"
                value={student.phone}
                onChange={handleChange}
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                } // Only allows numbers
                className="w-full p-2 border rounded-md"
                placeholder="Enter Phone Number"
              />
            </div>

            <div>
              <label className="block text-gray-600">Enrollment Number:</label>
              <input
                type="text"
                name="enrollment_number"
                value={student.enrollment_number}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600">
                Subjects (comma-separated):
              </label>
              <input
                type="text"
                name="subjects"
                value={student.subjects}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
                required
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => navigate(`/students/${id}`)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
