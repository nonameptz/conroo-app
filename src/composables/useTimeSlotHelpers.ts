import type { TimeSlot } from '@/services/apiService'

export function useTimeSlotHelpers() {
  function earliest(slots) {
    return getGroupRange(slots).earliest
  }
  function latest(slots) {
    return getGroupRange(slots).latest
  }

  function getGroupRange(slots: TimeSlot[]) {
    let earliest = Infinity
    let latest = -Infinity

    for (const slot of slots) {
      const start = new Date(slot.start_time || slot.startTime).getTime()
      const end = new Date(slot.end_time || slot.endTime).getTime()
      if (start < earliest) earliest = start
      if (end > latest) latest = end
    }

    if (earliest === Infinity) {
      earliest = Date.now()
      latest = Date.now()
    }
    return { earliest, latest }
  }

  function getSlotStyle(slot: TimeSlot, earliest: number, latest: number) {
    const start = new Date(slot.start_time || slot.startTime).getTime()
    const end = new Date(slot.end_time || slot.endTime).getTime()

    const totalDuration = latest - earliest
    const offset = start - earliest
    const duration = end - start

    const leftPercent = (offset / totalDuration) * 100
    const widthPercent = (duration / totalDuration) * 100

    return {
      left: leftPercent + '%',
      width: widthPercent + '%',
    }
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  function formatRange(slot: TimeSlot) {
    const start = new Date(slot.start_time || slot.startTime)
    const end = new Date(slot.end_time || slot.endTime)
    const startStr = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const endStr = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    return `${startStr} – ${endStr}`
  }

  function getCurrentCapacity(slot: TimeSlot) {
    return slot.capacity.current_capacity || slot.capacity.current || 0
  }

  return {
    getGroupRange,
    getSlotStyle,
    formatDate,
    formatRange,
    getCurrentCapacity,
    earliest,
    latest
  }
}
