import { ref, computed } from 'vue'
import type { TimeSlot } from '@/services/apiService'
import { fetchTimeSlots } from '@/services/apiService'
import { connectSSE } from '@/services/sseService'
import type { SSEUpdate } from '@/services/sseService'

export function useTimeSlots() {
  const timeSlots = ref<TimeSlot[]>([])
  const isLoading = ref(false)
  const errorMessage = ref<string | null>(null)

  async function loadTimeSlots() {
    isLoading.value = true
    errorMessage.value = null
    try {
      const slots = await fetchTimeSlots()
      timeSlots.value = slots
    } catch (error) {
      console.error('Time slot loading error', error)
      errorMessage.value = 'Could\'t load time slots'
    } finally {
      isLoading.value = false
    }
  }

  function updateTimeSlot(update: SSEUpdate) {
    timeSlots.value = timeSlots.value.map(slot => {
      if (slot.id === update.id) {
        return {
          ...slot,
          capacity: {
            current_capacity: update.currentCapacity,
            max_capacity: 50,
          },
          category: update.category,
        }
      }
      return slot
    })
  }

  function startSSE(onError?: (attempt: number) => void) {
    connectSSE(updateTimeSlot, onError || (() => {}))
  }

  const groupedSlots = computed(() => {
    const groups: Record<string, TimeSlot[]> = {}
    timeSlots.value.forEach(slot => {
      const start = slot.start_time || slot.startTime
      if (!start) return
      const datePart = start.split('T')[0]
      if (!groups[datePart]) {
        groups[datePart] = []
      }
      groups[datePart].push(slot)
    })
    return Object.keys(groups).map(date => ({
      date,
      slots: groups[date],
    }))
  })

  async function init(onError?: (attempt: number) => void) {
    await loadTimeSlots()
    startSSE(onError)
  }

  return {
    timeSlots,
    groupedSlots,
    isLoading,
    errorMessage,
    loadTimeSlots,
    updateTimeSlot,
    startSSE,
    init,
  }
}
