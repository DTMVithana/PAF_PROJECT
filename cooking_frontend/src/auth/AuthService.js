import axiosInstance from "../api/axiosInstance";

export const loginUser = async (credentials) => {
  const res = await axiosInstance.post("/auth/login", credentials);
  const token = res.data.token;
  localStorage.setItem("token", token);
  return token;
};
