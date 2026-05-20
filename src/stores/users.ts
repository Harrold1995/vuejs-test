import { defineStore } from 'pinia'
import { fetchUsers } from '../api'
import type { User } from '../types'

interface UsersState {
  users: User[]
  filter: string
  loading: boolean
  error: string | null
}

export const useUsersStore = defineStore('users', {
  state: (): UsersState => ({
    users: [],
    filter: '',
    loading: false,
    error: null,
  }),
  getters: {
    filteredUsers(state): User[] {
      const q = state.filter.trim().toLowerCase()
      if (!q) return state.users
      return state.users.filter((u) => u.name.toLowerCase().includes(q))
    },
  },
  actions: {
    setFilter(value: string) {
      this.filter = value
    },
    async loadUsers() {
      this.loading = true
      this.error = null
      try {
        this.users = await fetchUsers()
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to load users'
      } finally {
        this.loading = false
      }
    },
  },
})
