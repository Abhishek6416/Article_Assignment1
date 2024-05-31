import axios from "axios";
const URL = "http://localhost:8000/api/v1";
const REGISTER_USER = async (data) => {
    console.log("user data",data)
  return axios
    .post(`${URL}/user/register`, data)
    .then((res) => res)
    .catch((er) => er);
};

const LOGIN_USER = async (data) => {
  return axios
    .post(`${URL}/user/login`, data)
    .then((res) => res)
    .catch((er) => er);
};
export { REGISTER_USER, LOGIN_USER };
