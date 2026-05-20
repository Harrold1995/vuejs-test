<script setup lang="ts">
import type { Post } from '../types'

defineProps<{
  posts: Post[]
  loading?: boolean
  title?: string
}>()
</script>

<template>
  <section class="post-list">
    <h2 v-if="title">{{ title }}</h2>
    <p v-if="loading" class="status">Loading posts...</p>
    <table v-else-if="posts.length > 0" class="posts-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td class="post-title">{{ post.title }}</td>
          <td>{{ post.body }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else class="status">No posts to display. Click a user to load their posts.</p>
  </section>
</template>

<style scoped>
.post-list {
  margin-top: 2rem;
}
.posts-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
}
.posts-table th {
  text-align: left;
  padding: 0.6rem 0.75rem;
  background: #f0f4fa;
  border-bottom: 2px solid #d8e1ee;
}
.posts-table td {
  padding: 0.6rem 0.75rem;
  border-bottom: 1px solid #eee;
  vertical-align: top;
}
.post-title {
  font-weight: 600;
  width: 30%;
}
.status {
  color: #666;
  font-style: italic;
}
</style>
