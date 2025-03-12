import instance from "."; // Import axios instance
import { setToken } from "./storage"; // Import setToken function

const login = async (userInfo) => {
  try {
    const response = await instance.post("/auth/login", userInfo);
    const { token } = response.data;
    await setToken(token);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

const getProfile = async () => {
  try {
    const response = await instance.get("/users/me");
    return response.data;
  } catch (error) {
    console.error("Profile fetch error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

const register = async (userInfo) => {
  try {
    const response = await instance.post("/auth/register", userInfo);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export { login, getProfile, register };