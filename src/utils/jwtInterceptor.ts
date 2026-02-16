import axios, { type AxiosError } from "axios";

function jwtInterceptor() {
  axios.interceptors.request.use((request) => {
    const token = window.localStorage.getItem("token");

    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }

    return request;
  });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError<{ message?: string }>) => {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message?.includes("Unauthorized")
      ) {
        window.localStorage.removeItem("token");
        window.location.replace("/");
      }

      return Promise.reject(error);
    }
  );
}

export default jwtInterceptor;
