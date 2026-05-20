import axios from 'axios'
import type { Post, User } from './types'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export async function fetchUsers(): Promise<User[]> {
  const { data } = await axios.get<User[]>(`${BASE_URL}/users`)
  return data
}

export async function fetchPostsByUser(userId: number): Promise<Post[]> {
  const { data } = await axios.get<Post[]>(`${BASE_URL}/posts`, {
    params: { userId },
  })
  return data
}
