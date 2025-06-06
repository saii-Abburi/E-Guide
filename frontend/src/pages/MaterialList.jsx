import axios from "axios";
import { useState, useEffect } from "react";
import SkeletonCard from "../components/SkeletonCard";

const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL || "https://e-guide.vercel.app";

const MaterialList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/materials`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching materials", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 text-center text-indigo-700 drop-shadow-sm">
        📚 Study Materials
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : data.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No materials found.
          </p>
        ) : (
          data.map((material) => (
            <div
              key={material._id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100 hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-indigo-700 mb-2 flex items-center gap-2">
                  {material.title}
                </h3>
                <p className="text-gray-700 mb-3 text-base line-clamp-3">
                  {material.description}
                </p>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  📄 {material.type.toUpperCase()}
                </span>
              </div>
              <div className="flex gap-3 mt-4">
                <a
                  href={`${BASE_URL}/view${material.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition"
                >
                  View
                </a>
                <a
                  href={`${BASE_URL}/downloads/download${material.link}`}
                  download
                  className="flex-1 text-center px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition"
                >
                  Download
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MaterialList;
