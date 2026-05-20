import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useUsersStore } from '../src/stores/users'
import { mockUsers } from './fixtures'

describe('users store filtering', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('returns all users when filter is empty', () => {
    const store = useUsersStore()
    store.users = mockUsers
    expect(store.filteredUsers).toHaveLength(mockUsers.length)
  })

  it('filters by name (case-insensitive, partial match)', () => {
    const store = useUsersStore()
    store.users = mockUsers

    store.setFilter('Lea')
    expect(store.filteredUsers).toHaveLength(1)
    expect(store.filteredUsers[0].name).toBe('Leanne Graham')

    store.setFilter('ervin')
    expect(store.filteredUsers).toHaveLength(1)
    expect(store.filteredUsers[0].name).toBe('Ervin Howell')
  })

  it('returns no users when no name matches the filter', () => {
    const store = useUsersStore()
    store.users = mockUsers
    store.setFilter('zzz-no-match')
    expect(store.filteredUsers).toHaveLength(0)
  })
})
