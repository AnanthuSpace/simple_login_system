import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { welcome } from "../api/authApi.js";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
};

export default function WelcomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await welcome();
        setUser(res.data.user);
        setLoading(false);
      } catch (error) {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        navigate("/login");
      }
    };

    verifySession();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    toast.success("Logout successful");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard!</h1>
      <p className="mb-8">You are successfully logged in.</p>

      {user && (
        <div className="mb-8 p-6 border rounded shadow bg-white w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">User Profile</h2>
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Member Since:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      )}

      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
