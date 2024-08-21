import axios from "axios";

export function getWeather(name) {
  const req = axios.get(`https://wttr.in/${name}?format=j2`);
  return req.then((resp) => resp.data);
}
