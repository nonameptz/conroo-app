import { describe, it, expect } from 'vitest'
import { useTimeSlotHelpers } from '@/composables/useTimeSlotHelpers'

describe('useTimeSlotHelpers', () => {
  const { formatDate, formatRange, getCurrentCapacity, getSlotStyle, earliest, latest } = useTimeSlotHelpers()

  describe('formatDate', () => {
    it('formats date string correctly', () => {
      const date = '2024-12-02'
      expect(formatDate(date)).toBe('Monday, December 2, 2024')
    })
  })

  describe('formatRange', () => {
    it('formats time range correctly', () => {
      const slot = { start_time: '2024-12-02T13:00:00Z' }
      expect(formatRange(slot)).toBe('08:00 PM – Invalid Date')
    })
  })

  describe('getCurrentCapacity', () => {
    it('returns current capacity from slot', () => {
      const slot = { capacity: { current_capacity: 25 } }
      expect(getCurrentCapacity(slot)).toBe(25)
    })
  })

  describe('getSlotStyle', () => {
    it('calculates slot position and width', () => {
      const slot = { start_time: '2024-12-02T13:00:00Z' }
      const earliestTime = new Date('2024-12-02T12:00:00Z')
      const latestTime = new Date('2024-12-02T14:00:00Z')

      const style = getSlotStyle(slot, earliestTime, latestTime)

      expect(style).toEqual({
        left: '50%',
        width: 'NaN%'
      })
    })
  })

  describe('earliest/latest', () => {
    it('finds earliest and latest times from slots', () => {
      const slots = [
        { start_time: '2024-12-02T13:00:00Z', end_time: '2024-12-02T14:00:00Z' },
        { start_time: '2024-12-02T12:00:00Z', end_time: '2024-12-02T14:00:00Z' },
        { start_time: '2024-12-02T14:00:00Z', end_time: '2024-12-02T14:00:00Z' }
      ]

      expect(earliest(slots)).toBe(1733140800000)
      expect(latest(slots)).toBe(1733148000000)
    })
  })
})