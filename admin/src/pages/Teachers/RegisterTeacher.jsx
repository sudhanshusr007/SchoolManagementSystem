import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../components/Sidebar";

const RegisterTeacher = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "123456", // Default password value
    employee_id: "",
    profile_picture: "https://example.com/profile.jpg", // Default value for profile picture URL
    classes_assigned: ["Mathematics", "Physics"], // Default classes assigned
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    // Validate required fields
    if (!formData.name) newErrors.name = "Name is required!";
    if (!formData.email) newErrors.email = "Email is required!";
    if (!formData.phone) newErrors.phone = "Phone is required!";
    if (!formData.employee_id) newErrors.employee_id = "Employee ID is required!";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    // Retrieve token from local storage
    const token = localStorage.getItem("token");

    // Prepare data for submission (sending as JSON)
    const dataToSend = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      employee_id: formData.employee_id,
      classes_assigned: formData.classes_assigned,
      profile_picture: formData.profile_picture,
    };

    // Send data to the backend with Authorization header
    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin/create-teacher",
        dataToSend,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        toast.success(response.data?.message || "Teacher created successfully!"); // Show backend message as toast
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "123456", // Default password value
          employee_id: "",
          profile_picture: "https://example.com/profile.jpg", // Default value
          classes_assigned: ["Mathematics", "Physics"], // Default classes
        });
        setErrors({}); // Clear any previous errors
      } else {
        toast.error(response.data?.message || "Failed to create teacher.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while creating the teacher.");
    } finally {
      setLoading(false);
    }
  };

  // Handle navigating to the All Teachers page (if needed)
  const handleGetAllTeachers = () => {
    navigate("/allteachers"); // Navigate to the All Teachers page
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-semibold">Welcome, Admin</span>
          </div>
        </div>

        {/* Registration Form */}
        <h2 className="text-xl font-semibold mb-6">Register Teacher</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter Name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter Email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="tel"
              maxLength={10}
              minLength={10}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
              } // Only allows numbers
              className="w-full p-2 border rounded-md"
              placeholder="Enter Phone Number"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Employee ID</label>
            <input
              type="text"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter Employee ID"
            />
            {errors.employee_id && (
              <p className="text-red-500 text-sm">{errors.employee_id}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register Teacher"}
          </button>
        </form>

        {/* Get All Teachers Button */}
        <button
          onClick={handleGetAllTeachers}
          className="mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Get All Teachers
        </button>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default RegisterTeacher;
