import instance from ".";
import { setToken } from "./storage";

const register = async (userInfo) => {
  try {
    const res = await instance.post("/auth/register", userInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.error("Registration error:", error.response ? error.response.data : error.message);
    throw error;
  }
};
const login = async (userInfo) => {
  try {
    const res = await instance.post("/auth/login", userInfo);
    console.log("LOGIN TOKEN", res.data.token);
    setToken(res.data.token);
    return res.data;
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

const getProfile = async () => {
  try {
    const res = await instance.get("users/me");
    return res.data;
  } catch (error) {
    console.error("Profile fetch error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export { login, register, getProfile };