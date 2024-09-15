import React, { useState, useEffect } from "react";
import { FiUser, FiMail, FiEdit2 } from "react-icons/fi";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({ username: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      console.log("Fetching profile with token:", token); // Debugging line

      try {
        const response = await fetch("http://localhost:5000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserDetails({ username: data.username, email: data.email });
        } else if (response.status === 401) {
          // Unauthorized
          console.log(
            "Unauthorized while fetching profile, redirecting to login"
          );
          localStorage.removeItem("token");
          window.location.href = "/"; // Redirect to login
        } else if (response.status === 403) {
          // Forbidden
          console.log("Forbidden access while fetching profile");
        } else {
          const errorText = await response.text();
          console.error("Error fetching profile:", errorText);
        }
      } catch (error) {
        console.error("Server error:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userDetails),
      });

      if (response.ok) {
        alert("Profile updated successfully");
        setIsEditing(false);
      } else if (response.status === 401) {
        // Unauthorized
        console.log(
          "Unauthorized while updating profile, redirecting to login"
        );
        localStorage.removeItem("token");
        window.location.href = "/"; // Redirect to login
      } else if (response.status === 403) {
        // Forbidden
        console.log("Forbidden access while updating profile");
      } else {
        const errorText = await response.text();
        console.error("Error saving profile:", errorText);
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Server error:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Profile</h1>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700 flex items-center gap-2">
            <FiUser className="text-gray-500" />
            Username
          </label>
          <input
            type="text"
            name="username"
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
            value={userDetails.username}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700 flex items-center gap-2">
            <FiMail className="text-gray-500" />
            Email
          </label>
          <input
            type="email"
            name="email"
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
            value={userDetails.email}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="flex justify-between items-center mt-6">
          {isEditing ? (
            <>
              <button
                type="submit"
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-teal-600 text-white font-bold rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-600 text-white font-bold rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600">
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-teal-600 text-white font-bold rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 flex justify-end gap-2">
              <FiEdit2 className="text-white" />
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
