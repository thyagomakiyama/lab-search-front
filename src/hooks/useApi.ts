
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios'
import Item from '../types/Item'
import LoginResponse from '../types/LoginResponse'

const api = axios.create({
  baseURL: process.env.REACT_APP_SEARCH_API
})

export const useApi = () => ({
  validateToken: async (token: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/validate-token', { token })
    return response.data
  },
  signin: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/login', { email, password })
    return response.data
  },
  logout: async (token: string): Promise<void> => {
    await api.post<null>('/logout', { token })
  },
  getItems: async (brand: string, search: string): Promise<Item[]> => {
    let url = 'items?limit=50'
    if (brand !== '') {
      url = url + '&brand=' + brand
    }
    if (search !== '') {
      url = url + '&search=' + search
    }
    const response = await api.get<Item[]>(url)
    return response.data
  }
})
