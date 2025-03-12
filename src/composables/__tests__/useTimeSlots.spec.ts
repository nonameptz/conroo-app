import { describe, it, expect, vi } from 'vitest'
import { useTimeSlots } from '@/composables/useTimeSlots'
import { fetchTimeSlots } from '@/services/apiService'
import { connectSSE } from '@/services/sseService'

vi.mock('@/services/apiService', () => ({
  fetchTimeSlots: vi.fn(),
}))

vi.mock('@/services/sseService', () => ({
  connectSSE: vi.fn(),
}))

describe('useTimeSlots composable', () => {
  it('load time slots using fetchTimeSlots', async () => {
    const mockSlots = [
        { id: 1, start_time: '2024-12-01T15:00:00Z', capacity: { current_capacity: 5 } },
        { id: 2, start_time: '2024-12-01T16:00:00Z', capacity: { current_capacity: 10 } },
      ]
    ;(fetchTimeSlots as vi.Mock).mockResolvedValue(mockSlots)
    const { timeSlots, loadTimeSlots } = useTimeSlots()

    expect(timeSlots.value).toEqual([])

    await loadTimeSlots()

    expect(fetchTimeSlots).toHaveBeenCalled()
    expect(timeSlots.value).toEqual(mockSlots)
  })

  it('connect to SSE and update the data', () => {
    const { timeSlots, startSSE, updateTimeSlot } = useTimeSlots()

    timeSlots.value = [
      { id: 1, start_time: '2024-12-01T15:00:00Z', capacity: { current_capacity: 5 } },
    ]

    startSSE()
    expect(connectSSE).toHaveBeenCalled()

    const mockUpdate = { id: 1, currentCapacity: 7, category: 'red' }
    updateTimeSlot(mockUpdate)

    expect(timeSlots.value[0].capacity.current_capacity).toBe(7)
    expect(timeSlots.value[0].category).toBe('red')
  })
})
