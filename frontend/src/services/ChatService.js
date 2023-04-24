/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import axios from 'axios'
import { API_URL } from '@/vars/api'

class ChatService {
  constructor() {
    this.service = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  getChannelsData = (token, signal) =>
    // disable caching
    this.service.get(`/data?timestamp=${Date.now()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal,
    })
}

export default new ChatService()
