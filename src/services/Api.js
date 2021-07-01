import axios from "axios";

export default () => {
  return axios.create({
    baseURL: "http://198.199.74.179:4000/api/v1",
    // withCredentials: true,
    headers: {
      Authorization: 'Bearer '+window.localStorage.getItem("token"),
      'Access-Control-Allow-Origin': '*',
      'Accept': '*/*'
    }   
  });
};
