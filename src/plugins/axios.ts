import { suffixDomain } from '@/helpers'
import router from '@/router'
import axios from 'axios'
import { useCookies } from 'vue3-cookies'
import { useAuthStore } from '@/stores/auth';

const { cookies } = useCookies()

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND
})

axiosClient.interceptors.request.use(
  (config) => {
    const token = cookies.get(`auth${suffixDomain()}`)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
      router.push({ name: 'Login' })
    }
    return Promise.reject(error)
  }
)

export default axiosClient
