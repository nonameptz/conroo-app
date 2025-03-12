import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { computed, ref } from 'vue'
import { flushPromises } from '@vue/test-utils'
import TimeSlotList from '@/components/TimeSlotList.vue'

vi.mock('@/composables/useTimeSlots', () => {
  const timeSlots = ref([
    { id: 1, category: 'green', capacity: { current_capacity: 5 }, start_time: '2024-12-02T13:00:00Z' },
    { id: 2, category: 'yellow', capacity: { current_capacity: 10 }, start_time: '2024-12-02T13:00:00Z' },
  ])

  const groupedSlots = computed(() => {
    const groups: Record<string, any[]> = {}
    timeSlots.value.forEach(slot => {
      const datePart = slot.start_time.split('T')[0]
      if (!groups[datePart]) groups[datePart] = []
      groups[datePart].push(slot)
    })
    return Object.keys(groups).map(date => ({ date, slots: groups[date] }))
  })

  return {
    useTimeSlots: () => ({
      groupedSlots,
      isLoading: ref(false),
      errorMessage: ref(''),
      init: vi.fn(async () => Promise.resolve())
    }),
  }
})

vi.mock('@/composables/useTimeSlotHelpers', () => ({
  useTimeSlotHelpers: () => ({
    formatDate: vi.fn(() => 'Dec 2, 2024'),
    formatRange: vi.fn(() => '13:00'),
    getCurrentCapacity: vi.fn((slot) => slot.capacity.current_capacity),
    getSlotStyle: vi.fn(() => ({})),
    earliest: vi.fn(),
    latest: vi.fn()
  })
}))

it('load and show list of time slots', async () => {
  const wrapper = mount(TimeSlotList)
  await flushPromises()

  const timeSlots = wrapper.findAll('.time-slot')
  expect(timeSlots.length).toBe(2)

  expect(timeSlots[0].text()).toContain('5/50')
  expect(timeSlots[1].text()).toContain('10/50')
})