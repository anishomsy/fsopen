import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

function getAll() {
  const req = axios.get(baseUrl);

  return req.then((resp) => resp.data);
}

function create(newObject) {
  const req = axios.post(baseUrl, newObject);
  return req.then((resp) => resp.data);
}

function remove(id) {
  const url = `${baseUrl}/${id}`;
  const req = axios.delete(url);

  return req.then((resp) => resp.data);
}
function update(id, newObject) {
  const url = `${baseUrl}/${id}`;
  const req = axios.put(url, newObject);

  return req.then((resp) => resp.data);
}

export default {
  getAll,
  create,
  remove,
  update,
};
