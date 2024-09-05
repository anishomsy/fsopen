import axios from "axios";

const baseUrl = "/api/login";
const loginUser = async (username, password) => {
  const loginForm = {
    username: username,
    password: password,
  };
  const response = await axios.post(baseUrl, loginForm);
  return response.data;
};

export { loginUser };
