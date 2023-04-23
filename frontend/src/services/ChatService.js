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

  getChannelsData = (token, signal) => {
    // disable caching
    return this.service.get(`/data?timestamp=${Date.now()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal,
    })
  }
}

export default new ChatService()
