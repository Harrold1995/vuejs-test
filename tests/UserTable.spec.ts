import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserTable from '../src/components/UserTable.vue'
import UserRow from '../src/components/UserRow.vue'
import { mockUsers } from './fixtures'

describe('UserTable', () => {
  it('renders one row per user with name, email, city, and company', () => {
    const wrapper = mount(UserTable, {
      props: { users: mockUsers },
    })

    const rows = wrapper.findAllComponents(UserRow)
    expect(rows).toHaveLength(mockUsers.length)

    const text = wrapper.text()
    expect(text).toContain('Leanne Graham')
    expect(text).toContain('leanne@example.com')
    expect(text).toContain('Gwenborough')
    expect(text).toContain('Romaguera-Crona')
    expect(text).toContain('Ervin Howell')
    expect(text).toContain('Wisokyburgh')
  })

  it('emits a select event with the clicked user', async () => {
    const wrapper = mount(UserTable, {
      props: { users: mockUsers },
    })

    await wrapper.findAllComponents(UserRow)[0].trigger('click')

    const emitted = wrapper.emitted('select')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toEqual(mockUsers[0])
  })

  it('shows an empty-state row when no users are passed', () => {
    const wrapper = mount(UserTable, {
      props: { users: [] },
    })
    expect(wrapper.text()).toContain('No users match')
  })
})
