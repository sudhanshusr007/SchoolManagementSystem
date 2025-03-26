import React, { useState, useEffect } from "react";
import {  ToastContainer,toast } from "react-toastify";
import { Camera, Eye, EyeOff } from "react-feather";
import Sidebar from "../components/Sidebar";

const Settings = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/api/student/profile`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch user details");
          }

          const data = await response.json();
          setUserData(data);
          setEmail(data.email);
          setPhone(data.phone);
          setProfilePicture(data.profilePicture);
          setLoading(false);
        } catch (error) {
          console.error(error);
          toast.error("Failed to fetch user details");
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      toast.error("You must be logged in to access this page.");
    }
  }, [token]);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async () => {
    if (!email || !phone) {
      toast.error("Email and phone number are required");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/student/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email,
            phone,
            password: password || undefined, // Only send password if it's provided
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update profile");
      }

      toast.success("Settings updated successfully!");
      setPassword(""); // Clear password field after update
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error updating settings");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-6">Settings</h2>

        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-12">
          <div className="flex items-center space-x-12">
            <div className="w-1/3">
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <img
                    src={profilePicture || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-40 h-40 rounded-full object-cover border-2 border-blue-600"
                  />
                  <label
                    htmlFor="profile-picture"
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer"
                  >
                    <Camera className="w-6 h-6" />
                    <input
                      type="file"
                      id="profile-picture"
                      className="hidden"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                    />
                  </label>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Name:
                    </span>
                    <span className="text-sm text-gray-500 cursor-not-allowed">
                      {userData?.name || "Loading..."}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      DOB:
                    </span>
                    <span className="text-sm text-gray-500 cursor-not-allowed">
                      {userData?.dob || "Loading..."}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Class:
                    </span>
                    <span className="text-sm text-gray-500 cursor-not-allowed">
                      {userData?.class || "Loading..."}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Enrollment No.:
                    </span>
                    <span className="text-sm text-gray-500 cursor-not-allowed">
                      {userData?.enrollment_number || "Loading..."}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-2/3">
              <form>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full mt-2 p-4 border border-gray-300 rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full mt-2 p-4 border border-gray-300 rounded-md"
                    value={phone}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,10}$/.test(value)) {
                        setPhone(value);
                      }
                    }}
                    placeholder="Enter your phone number"
                    maxLength={10}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full mt-2 p-4 border border-gray-300 rounded-md"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your new password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-blue-500" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full mt-6 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </form>
              {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
