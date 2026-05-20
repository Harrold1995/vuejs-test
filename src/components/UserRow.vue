<script setup lang="ts">
import type { User } from '../types'

defineProps<{
  user: User
}>()

defineEmits<{
  (e: 'select', user: User): void
}>()
</script>

<template>
  <tr class="user-row" @click="$emit('select', user)">
    <td>{{ user.name }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.address.city }}</td>
    <td>{{ user.company.name }}</td>
  </tr>
</template>

<style scoped>
.user-row {
  cursor: pointer;
}
.user-row:hover {
  background-color: #f5f8ff;
}
.user-row td {
  padding: 0.6rem 0.75rem;
  border-bottom: 1px solid #eee;
}
</style>
