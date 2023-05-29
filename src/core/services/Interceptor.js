import axios from "axios";
import { getItem } from "./LocalStorage";

const MAIN_URL = process.env.REACT_APP_PUBLIC_PATH;
const instance = axios.create({ baseURL: MAIN_URL });

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // check if error is expected from backend
    try {
      const expectedError =
        error.response &&
        error.response.state >= 400 &&
        error.response.status < 500;

      // if error doesnt expected when we log it
      if (!expectedError) {
        // tweak it later
        // get error message from backend (see object of response later... maybe its changed)
        try {
          console.log(error.response.data.message.message[0].message);
        } catch (error) {}
      }
    } catch (error) {}
    return Promise.reject(error);
  }
);

// will send token to headers request ( in x-auth-token body )
instance.interceptors.request.use((config) => {
  config.headers["x-auth-token"] = getItem("token");
  return config;
});
export default instance;
