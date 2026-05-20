<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import SearchFilter from '../components/SearchFilter.vue'
import UserTable from '../components/UserTable.vue'
import PostList from '../components/PostList.vue'
import { useUsersStore } from '../stores/users'
import { usePostsStore } from '../stores/posts'
import type { User } from '../types'

const usersStore = useUsersStore()
const postsStore = usePostsStore()

const { filteredUsers, loading, error, filter } = storeToRefs(usersStore)
const { posts, selectedUser, loading: postsLoading } = storeToRefs(postsStore)

const filterValue = computed({
  get: () => filter.value,
  set: (v: string) => usersStore.setFilter(v),
})

const postsTitle = computed(() =>
  selectedUser.value ? `Posts by ${selectedUser.value.name}` : 'Posts',
)

onMounted(() => {
  if (usersStore.users.length === 0) {
    usersStore.loadUsers()
  }
})

function handleSelect(user: User) {
  postsStore.loadPostsForUser(user)
}
</script>

<template>
  <main class="users-view">
    <h1>Users</h1>
    <SearchFilter v-model="filterValue" />
    <p v-if="loading" class="status">Loading users...</p>
    <p v-else-if="error" class="status error">{{ error }}</p>
    <UserTable v-else :users="filteredUsers" @select="handleSelect" />
    <PostList :posts="posts" :loading="postsLoading" :title="postsTitle" />
  </main>
</template>

<style scoped>
.users-view {
  max-width: 960px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
h1 {
  margin-top: 0;
  color: #2c3e50;
}
.status {
  color: #666;
  font-style: italic;
}
.status.error {
  color: #c0392b;
}
</style>
