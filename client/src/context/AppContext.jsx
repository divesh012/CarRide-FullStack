import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const navigate = useNavigate();

  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken] = useState(null);

  const [user, setUser] = useState(null);

  const [isOwner, setIsOwner] = useState(false);

  const [showLogin, setShowLogin] = useState(false);

  const [pickupDate, setPickupDate] = useState("");

  const [returnDate, setReturnDate] = useState("");

  const [cars, setCars] = useState([]);

  const [pickupLocation, setPickupLocation] = useState("");



  // =========================
  // FETCH USER
  // =========================
  const fetchUser = async () => {

    try {

      const { data } = await axios.get("/api/user/data");

      if (data.success) {

        setUser(data.user);

        setIsOwner(data.user.role === "owner");

      }

    } catch (error) {

      console.log(error);

      logout();
    }
  };



  // =========================
  // FETCH CARS
  // =========================
  const fetchCars = async () => {

    try {

      const { data } = await axios.get("/api/user/cars");

      if (data.success) {

        setCars(data.cars);

      } else {

        toast.error(data.message);
      }

    } catch (error) {

      console.log(error);

      toast.error(error.message);
    }
  };



  // =========================
  // LOGOUT
  // =========================
  const logout = () => {

    localStorage.removeItem("token");

    setToken(null);

    setUser(null);

    setIsOwner(false);

    delete axios.defaults.headers.common["Authorization"];

    navigate("/");

    toast.success("Logged out successfully");
  };



  // =========================
  // LOAD TOKEN
  // =========================
  useEffect(() => {

    const storedToken = localStorage.getItem("token");

    if (storedToken) {

      setToken(storedToken);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storedToken}`;
    }

    fetchCars();

  }, []);



  // =========================
  // FETCH USER AFTER TOKEN
  // =========================
  useEffect(() => {

    if (token) {

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      fetchUser();
    }

  }, [token]);



  const value = {

    navigate,
    currency,
    axios,

    token,
    setToken,

    user,
    setUser,

    isOwner,
    setIsOwner,

    showLogin,
    setShowLogin,

    pickupLocation,
    setPickupLocation,

    pickupDate,
    setPickupDate,

    returnDate,
    setReturnDate,

    cars,
    setCars,

    fetchCars,
    fetchUser,

    logout
  };



  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};