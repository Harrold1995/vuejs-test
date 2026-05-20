<script setup lang="ts">
import type { User } from '../types'
import UserRow from './UserRow.vue'

defineProps<{
  users: User[]
}>()

defineEmits<{
  (e: 'select', user: User): void
}>()
</script>

<template>
  <table class="user-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>City</th>
        <th>Company</th>
      </tr>
    </thead>
    <tbody>
      <UserRow
        v-for="user in users"
        :key="user.id"
        :user="user"
        @select="(u) => $emit('select', u)"
      />
      <tr v-if="users.length === 0">
        <td colspan="4" class="empty">No users match the current filter.</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.user-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.user-table th {
  text-align: left;
  padding: 0.6rem 0.75rem;
  background: #f0f4fa;
  border-bottom: 2px solid #d8e1ee;
  font-weight: 600;
}
.empty {
  padding: 1rem;
  text-align: center;
  color: #888;
  font-style: italic;
}
</style>
