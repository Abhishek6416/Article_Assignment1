import axios from "axios";

const URL = "http://localhost:8000/api/v1";
const GET_ALL_ARTICLES = async () => {
  return axios
    .get(
      `${URL}/all-article`
    )
    .then((res) => res)
    .catch((er) => er);
};


const ADD_ARTICLES = async (data) => {

  return axios
    .post(`${URL}/add-article`, data,)
    .then((res) => res)
    .catch((er) => er);
};

// get user article
const SINGLE_ARTICLES = async (id) => {
  return axios
    .get(`${URL}/view-article/${id}`)
    .then((res) => res)
    .catch((er) => er);
};


const UPDATE_ARTICLES = async (data, id) => {

  try {

    return await axios.patch(`${URL}/update-article/${id}`, data)

  }
  catch (error) {
    console.log(error.message)
  }
}

// delete article
const DELETE_ARTICLES = async (id) => {
  return axios
    .delete(`${URL}/delete-article/${id}`)
    .then((res) => res)
    .catch((er) => er);
};
export { GET_ALL_ARTICLES, ADD_ARTICLES, SINGLE_ARTICLES, UPDATE_ARTICLES, DELETE_ARTICLES };
