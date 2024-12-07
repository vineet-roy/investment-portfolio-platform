import axiosInstance from "./axiosInstance";

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/users/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Registration failed!";
  }
};


export const getUserDetails = async (userId) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to fetch user details!";
    }
  };

  export const getWalletHoldings = async () => {
    try {
      const response = await axiosInstance.get("/portfolio/holdings");
      return response.data;
    } catch (error) {
      throw error.response?.data || "Error fetching holdings!";
    }
  };
  
  // Create or Update Portfolio
  export const createOrUpdatePortfolio = async (data) => {
    try {
      const response = await axiosInstance.post("/portfolio/holdings", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Error updating portfolio!";
    }
  };