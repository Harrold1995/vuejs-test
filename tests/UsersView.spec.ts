import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import { mockUsers, mockPosts } from './fixtures'

vi.mock('../src/api', () => ({
  fetchUsers: vi.fn(() => Promise.resolve(mockUsers)),
  fetchPostsByUser: vi.fn(() => Promise.resolve(mockPosts)),
}))

import UsersView from '../src/views/UsersView.vue'
import UserRow from '../src/components/UserRow.vue'
import { fetchPostsByUser } from '../src/api'

describe('UsersView integration', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('loads users on mount and renders the table', async () => {
    const wrapper = mount(UsersView)
    await flushPromises()

    expect(wrapper.findAllComponents(UserRow)).toHaveLength(mockUsers.length)
    expect(wrapper.text()).toContain('Leanne Graham')
  })

  it('filters rows in real time as the user types', async () => {
    const wrapper = mount(UsersView)
    await flushPromises()

    const input = wrapper.find('input.search-filter')
    await input.setValue('Lea')

    const rows = wrapper.findAllComponents(UserRow)
    expect(rows).toHaveLength(1)
    expect(wrapper.text()).toContain('Leanne Graham')
    expect(wrapper.text()).not.toContain('Ervin Howell')
  })

  it('clicking a row fetches and shows that user\'s posts', async () => {
    const wrapper = mount(UsersView)
    await flushPromises()

    await wrapper.findAllComponents(UserRow)[0].trigger('click')
    await flushPromises()

    expect(fetchPostsByUser).toHaveBeenCalledWith(mockUsers[0].id)
    expect(wrapper.text()).toContain('Posts by Leanne Graham')
    expect(wrapper.text()).toContain('First post')
    expect(wrapper.text()).toContain('Second post')
  })
})
