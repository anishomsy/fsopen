import axios from "axios";

const baseUrl = "/api/login";
const loginUser = async (loginFormObject) => {
  const response = await axios.post(baseUrl, loginFormObject);
  return response.data;
};

export { loginUser };
