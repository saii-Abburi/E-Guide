import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaTrash, FaEdit, FaTimes, FaUserPlus } from "react-icons/fa";
import AdminProfile from "../components/profile";
import useProfile from "../hooks/useProfile";
import { Navigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL || "";

const AdminDashBoard = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isMaterialModalOpen, setMaterialModalOpen] = useState(false);
  const [isAdminModalOpen, setAdminModalOpen] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [materialForm, setMaterialForm] = useState({
    title: "",
    description: "",
    type: "pdf",
    file: null,
  });

  const [adminForm, setAdminForm] = useState({
    email: "",
    password: "",
    username: "",
    regdNo: "",
  });

  // Dummy admin profile (replace with your auth logic)

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/materials`);
      setMaterials(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };
  const { user, loader } = useProfile();
  if (!user) {
    Navigate("/");
  }
  useEffect(() => {
    fetchMaterials();
  }, [user]);

  const openAddMaterialModal = () => {
    setEditingId(null);
    setMaterialForm({ title: "", description: "", type: "pdf", file: null });
    setMaterialModalOpen(true);
  };

  const openEditMaterialModal = (material) => {
    setEditingId(material._id);
    setMaterialForm({
      title: material.title,
      description: material.description,
      type: material.type,
      file: null,
    });
    setMaterialModalOpen(true);
  };

  const closeMaterialModal = () => setMaterialModalOpen(false);

  const handleMaterialChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setMaterialForm({ ...materialForm, file: files[0] });
    } else {
      setMaterialForm({ ...materialForm, [name]: value });
    }
  };

  const submitMaterialForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", materialForm.title);
    formData.append("description", materialForm.description);
    formData.append("type", materialForm.type);
    if (materialForm.file) formData.append("file", materialForm.file);

    try {
      if (editingId) {
        await axios.put(
          `${BASE_URL}/api/materials/${editingId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(`${BASE_URL}/api/materials`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      closeMaterialModal();
      fetchMaterials();
    } catch (error) {
      console.error("Material submit error:", error);
    }
  };

  const openAdminModal = () => setAdminModalOpen(true);
  const closeAdminModal = () => setAdminModalOpen(false);

  const handleAdminChange = (e) => {
    setAdminForm({ ...adminForm, [e.target.name]: e.target.value });
  };

  const submitAdminForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/admins`, adminForm);
      alert("Admin created successfully!");
      setAdminForm({ email: "", password: "", username: "", regdNo: "" });
      closeAdminModal();
    } catch (error) {
      console.error("Admin submit error:", error);
    }
  };

  const deleteMaterial = async (id) => {
    if (!window.confirm("Are you sure to delete this material?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/materials/${id}`);
      fetchMaterials();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 p-6 md:p-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 tracking-tight drop-shadow-sm">Admin Dashboard</h1>
          <p className="text-gray-500 text-lg">Manage study materials and admin users with ease.</p>
        </div>
        {/* Use AdminProfile component */}
        <AdminProfile />
      </header>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-start gap-4 mb-8">
        <button
          onClick={openAddMaterialModal}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700   font-semibold text-base"
        >
          <FaPlus /> Add Material
        </button>
        <button
          onClick={openAdminModal}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700  font-semibold text-base"
        >
          <FaUserPlus /> Create Admin
        </button>
      </div>

      {/* Materials Grid */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <span className="w-8 h-8 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin"></span>
          <span className="ml-3 text-indigo-600 font-medium">Loading materials...</span>
        </div>
      ) : materials.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No materials found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {materials.map((m) => (
            <div
              key={m._id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-transform duration-300 hover:scale-[1.03] border border-indigo-100"
            >
              <div>
                <h3 className="text-xl font-bold text-indigo-700 mb-2 flex items-center gap-2">
                  {m.title}
                </h3>
                <p className="text-gray-700 mb-3 text-base">
                  {m.description}
                </p>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {m.type.toUpperCase()}
                </span>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <a
                  href={`${BASE_URL}/view${m.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline font-semibold"
                >
                  View
                </a>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditMaterialModal(m)}
                    className="bg-yellow-400 p-2 rounded hover:bg-yellow-500 transition text-white shadow"
                    title="Edit Material"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteMaterial(m._id)}
                    className="bg-red-600 p-2 rounded hover:bg-red-700 transition text-white shadow"
                    title="Delete Material"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Material Modal */}
      {isMaterialModalOpen && (
        <Modal
          onClose={closeMaterialModal}
          title={editingId ? "Edit Material" : "Add Material"}
        >
          <form
            onSubmit={submitMaterialForm}
            className="space-y-4"
            encType="multipart/form-data"
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={materialForm.title}
              onChange={handleMaterialChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={materialForm.description}
              onChange={handleMaterialChange}
              required
              rows={3}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              name="type"
              value={materialForm.type}
              onChange={handleMaterialChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="pdf">PDF</option>
              <option value="ppt">PPT</option>
              <option value="notes">Notes</option>
              <option value="doc">DOC</option>
            </select>
            <input
              type="file"
              name="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
              onChange={handleMaterialChange}
              className="w-full"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition font-semibold shadow"
            >
              {editingId ? "Update Material" : "Create Material"}
            </button>
          </form>
        </Modal>
      )}

      {/* Admin Modal */}
      {isAdminModalOpen && (
        <Modal onClose={closeAdminModal} title="Create Admin Account">
          <form onSubmit={submitAdminForm} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={adminForm.email}
              onChange={handleAdminChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={adminForm.password}
              onChange={handleAdminChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={adminForm.username}
              onChange={handleAdminChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="regdNo"
              placeholder="Registration Number"
              value={adminForm.regdNo}
              onChange={handleAdminChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-semibold shadow"
            >
              Create Admin
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

// Reusable Modal Component
const Modal = ({ onClose, title, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative border border-indigo-100">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          aria-label="Close modal"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700 drop-shadow-sm">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default AdminDashBoard;
