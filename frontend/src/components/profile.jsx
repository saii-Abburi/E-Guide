import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import auth , {db} from "./firebase";
import { signOut } from "firebase/auth";
import  { toast, Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';


const AdminProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "Users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          console.log("No such user document!");
        }
      }
    });

    return () => unsubscribe(); 
  }, []);


  const handleLogOut = async () => {
  try {
    await signOut(auth);
    toast.success("Successfully Logged Out", {
      position: "top-right",
    });
    navigate('/')
    
  } catch (err) {
    toast.error(err.message, {
      position: "top-right",
    });
  }
};
  if (!userData) return <div>Loading profile...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
      <FaUserCircle size={32} className="text-indigo-600" />
      <div>
        <p className="font-semibold text-gray-800">{userData.username}</p>
        <p className="text-sm text-gray-600">Regd No: {userData.regdNo}</p>
      </div>
      <button
        onClick={handleLogOut}
        className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-1"
      >
        <FaSignOutAlt /> Logout
      </button>
      <Toaster></Toaster>
      
    </div>
  );
};

export default AdminProfile;
