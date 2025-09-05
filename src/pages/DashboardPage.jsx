import React, { useState, useEffect } from "react";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router";

const BASE_URL = "http://210.79.129.154:8080"; // ✅ change to your backend URL

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch logged-in user details on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/users/me`, {
          method: "GET",
          credentials: "include", // ✅ ensures cookies/session are sent
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await res.json();
        setCurrentUser(data);
      } catch (err) {
        console.error(err);
        alert("Session expired. Please login again.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // Handle logout
  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/users/logout`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      alert("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Error logging out!");
    } finally {
      setLogoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100">
        <p className="text-gray-700 text-lg font-semibold">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome, {currentUser?.name || "User"}!
                </h1>
                <p className="text-gray-600 mt-1">
                  {currentUser?.email}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Role:{" "}
                  <span className="capitalize font-semibold">
                    {currentUser?.role}
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              <LogOut className="w-5 h-5" />
              {logoutLoading ? "Logging out..." : "Logout"}
            </button>
          </div>

          {/* Dashboard Overview */}
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Dashboard Overview</h2>
            <p className="opacity-90">
              You are logged in as{" "}
              <span className="font-semibold">{currentUser?.name}</span>.  
              Manage your account and settings from here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
