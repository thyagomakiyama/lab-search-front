/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios'
import LoginResponse from '../types/LoginResponse'

const api = axios.create({
  baseURL: process.env.REACT_APP_API
})

export const useApi = () => ({
  validateToken: async (token: string) => {
    const response = await api.post('/validate', { token })
    return response.data
  },
  signin: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post('/login', { email, password })
    return response.data
  },
  logout: async () => {
    const response = await api.post('/logout')
    return response.data
  }
})
