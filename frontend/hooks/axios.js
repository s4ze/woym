import axios from "axios";

const headers = new Headers();
headers.set("Content-Type", "application/json");

export default axios.create({
  baseURL: "http://localhost:5149/api",
  headers: headers,
});
