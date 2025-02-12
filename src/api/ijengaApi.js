import axios from "axios"
import { constants } from "helpers"

const ijengaApi = axios.create({
  baseURL: constants.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem("refresh_token")
    if (!refresh) throw new Error("No refresh token available")

    const response = await axios.post(
      `${constants.BASE_URL}${constants.endpoints.auth.refresh}`,
      { refresh }
    )

    const newToken = response.data.access
    localStorage.setItem("token", newToken)
    return newToken
  } catch (error) {
    console.error("Refresh token failed. Logging out...")
    localStorage.removeItem("token")
    localStorage.removeItem("refresh_token")
    window.location.href = "/login"
    return null
  }
}

ijengaApi.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

ijengaApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const newToken = await refreshToken()
      if (newToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`
        return ijengaApi(originalRequest)
      }
    }

    return Promise.reject(error)
  }
)

export default ijengaApi
