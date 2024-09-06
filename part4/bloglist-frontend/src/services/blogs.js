import axios from "axios";
const baseUrl = "/api/blogs";

let token;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (id, newBlog) => {
  const url = `${baseUrl}/${id}`;
  try {
    const response = await axios.put(url, newBlog);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};
const remove = async (id) => {
  const url = `${baseUrl}/${id}`;
  try {
    const config = { headers: { Authorization: token } };
    const response = await axios.delete(url, config);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export default { getAll, create, setToken, update, remove };
