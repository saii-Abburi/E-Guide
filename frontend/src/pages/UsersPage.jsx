import React from "react";
import MaterialList from "./MaterialList";
import AdminProfile from "../components/profile";

const UsersPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-6 md:p-10">
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 tracking-tight drop-shadow-sm">Dashboard</h1>
          <p className="text-gray-500 text-lg">Browse and download the latest study materials.</p>
        </div>
        <AdminProfile />
      </header>
      <div className="rounded-2xl  p-4 md:p-8">
        <MaterialList />
      </div>
    </div>
  );
};

export default UsersPage;
