import axios from "axios";

const baseUrl = "/api/login";
const loginUser = async (loginFormObject) => {
  try {
    const response = await axios.post(baseUrl, loginFormObject);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { loginUser };
