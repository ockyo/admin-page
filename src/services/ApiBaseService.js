import axios from "axios";

class ApiService {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    this.api.interceptors.request.use(
      (config) => {
        const token = getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response.data, 
      (error) => {
        console.error("API error:", error);
        return Promise.reject(error);
      }
    );
  }

  get(endpoint, params = {}, headers = {}) {
    return this.api.get(endpoint, { params, headers });
  }

  post(endpoint, data = {}, headers = {}) {
    return this.api.post(endpoint, data, { headers });
  }

  put(endpoint, data = {}, headers = {}) {
    return this.api.put(endpoint, data, { headers });
  }

  patch(endpoint, data = {}, headers = {}) {
    return this.api.patch(endpoint, data, { headers });
  }

  delete(endpoint, headers = {}) {
    return this.api.delete(endpoint, { headers });
  }
}

const apiService = new ApiService(process.env.REACT_APP_API_URL);
const getToken = () => {
  return sessionStorage.getItem("token") || localStorage.getItem("token");
};

export default apiService;
