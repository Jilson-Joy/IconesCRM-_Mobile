import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
export const login = async (email, password) => {
    try {
        const response = await axios.post(
          `${API_URL}/auth/login`,
          {
            email,
            password,
          }
        );
        return response.data.token;
    } catch (error) {
        console.error("Error while logging in:", error);
    }
};