import { defineStore } from 'pinia'
import { fetchPostsByUser } from '../api'
import type { Post, User } from '../types'

interface PostsState {
  posts: Post[]
  selectedUser: User | null
  loading: boolean
  error: string | null
}

export const usePostsStore = defineStore('posts', {
  state: (): PostsState => ({
    posts: [],
    selectedUser: null,
    loading: false,
    error: null,
  }),
  actions: {
    clear() {
      this.posts = []
      this.selectedUser = null
      this.error = null
    },
    async loadPostsForUser(user: User) {
      this.selectedUser = user
      this.loading = true
      this.error = null
      try {
        this.posts = await fetchPostsByUser(user.id)
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to load posts'
      } finally {
        this.loading = false
      }
    },
  },
})
