import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppProvider = (props) => {
  const currencySymbol = "₹";
  const backendUrl = https://prescripto-backend-b806.onrender.com;

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || false);
  const [userData, setUserData] = useState(false);

  // ✅ Fetch doctor list with debug log
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);

      if (data.success) {
        console.log("📥 Doctors fetched from backend:", data.doctors); // Debug log
        setDoctors(data.doctors);
      } else {
        toast.error(data.message || "Failed to load doctors");
      }
    } catch (error) {
      console.error("❌ Error fetching doctors:", error.message);
      toast.error("Failed to fetch doctors data. Please try again later.");
    }
  };

  // ✅ Load logged-in user profile
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message || "Failed to load user profile");
      }
    } catch (error) {
      console.error("❌ Error fetching user profile:", error.message);
      toast.error(error.message || "Error loading profile");
    }
  };

  useEffect(() => {
    getDoctorsData(); // Fetch on load
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppProvider;
