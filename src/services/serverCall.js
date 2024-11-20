import axios from "axios";
import { baseURL } from "./apiCalls";
import { authHeader } from "./authHeader";
export const SC = {
  getCall,
  postCall,
  putCall,
  deleteCall,
};
async function getCall(url, callbackProgressUpload = null) {
  const headers = await authHeader();
  const config = {
    headers,
    onUploadProgress: function (progressEvent) {
      if (callbackProgressUpload) callbackProgressUpload(progressEvent);
    },
  };
  return axios
    .get(`${baseURL}${url}`, config)
    .then((response) => response)
    .catch((error) => Promise.reject(error));
}
async function postCall(
  url,
  data,
  callbackProgressUpload = null,
  source = null
) {
  const headers = await authHeader();
  const config = {
    headers,
    onUploadProgress: function (progressEvent) {
      if (callbackProgressUpload) callbackProgressUpload(progressEvent);
    },
  };

  if (source) {
    config.cancelToken = source.token;
  }
  return axios
    .post(`${baseURL}${url}`, data, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

async function putCall(url, data) {
  const headers = await authHeader();
  return axios
    .put(`${baseURL}${url}`, data, { headers })
    .then((response) => response)
    .catch((error) => Promise.reject(error));
}

async function deleteCall(url) {
  const headers = await authHeader();
  return axios
    .delete(`${baseURL}${url}`, { headers })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
}
