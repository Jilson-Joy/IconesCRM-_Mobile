import axios from "axios";
export const login = async (email, password) => {
    try {
        const response = await axios.post(
          "https://dev-api.iconesequipments.org/auth/login",
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