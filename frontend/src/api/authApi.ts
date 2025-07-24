import axios from "axios";
import axiosInstance from "./axios";


export const loginUser = async (data) => {
    const response = await axios.post("http://localhost:5000/auth/login", data);
    const { accessToken, refreshToken } = response.data;

    console.log("Access Token received:", accessToken);
    sessionStorage.setItem("accessToken", accessToken);

    localStorage.setItem("refreshToken", refreshToken);

    return response;
};

export const signupUser = (data) => axios.post("http://localhost:5000/auth/signup", data);
export const welcome = () => axiosInstance.get("/auth/welcome");
