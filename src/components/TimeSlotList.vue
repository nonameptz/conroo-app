<template>
  <div class="timeline-container">
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

    <div v-if="isLoading">Loading data...</div>

    <v-snackbar v-model="showSseError" color="red" timeout="4000">
      {{ sseErrorMessage }}
    </v-snackbar>

    <div
        v-for="group in groupedSlots"
        :key="group.date"
        class="timeline-day"
    >
      <h2>{{ formatDate(group.date) }}</h2>

      <div class="day-scale">
        <div class="day-scale-content">
          <div
              v-for="slot in group.slots"
              :key="slot.id"
              :class="['time-slot', slot.category + '-bg' || '#f5f5f5']"
              :style="{
              ...getSlotStyle(slot, earliest(group.slots), latest(group.slots)),
            }"
          >
            <div class="slot-content">
              <p>{{ formatRange(slot) }}</p>
              <p class="capacity-text"><b>{{ getCurrentCapacity(slot) }}</b>/50</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTimeSlots } from '@/composables/useTimeSlots'
import { useTimeSlotHelpers } from '@/composables/useTimeSlotHelpers'

const {
  groupedSlots,
  isLoading,
  errorMessage,
  init,
} = useTimeSlots()

const {
  formatDate,
  formatRange,
  getCurrentCapacity,
  getSlotStyle,
  earliest,
  latest
} = useTimeSlotHelpers()

const showSseError = ref(false)
const sseErrorMessage = ref('')

function onSseError(attempt: number) {
  showSseError.value = true
  sseErrorMessage.value = `Connection error (attempt to reconnect #${attempt + 1}). Please wait...`
}

onMounted(() => {
  init(onSseError)
})
</script>

<style scoped>
.error {
  color: red;
}
.green-bg {
  background-color: #c8e6c9;
}
.yellow-bg {
  background-color: #fff9c4;
}
.red-bg {
  background-color: #ffcdd2;
}

.timeline-container {
  padding: 16px;
}
.timeline-day {
  margin-bottom: 15px;
}

.day-scale {
  position: relative;
  height: 80px;
  margin-top: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}

.day-scale-content {
  position: relative;
  display: inline-block;
  width: 1200px;
  height: 100%;
  white-space: normal;
}

.time-slot {
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  border-right: 1px solid #000;
  overflow: hidden;
}
.time-slot:last-child {
  border-right: none;
}
.slot-content {
  font-size: 12px;
  color: #333;
  width: 100%;
  text-align: center;
  padding: 0 4px;
}

.capacity-text {
  font-size: 20px;
}

@media (max-width: 600px) {
  .day-scale {
    height: 100px;
  }
  .slot-content {
    font-size: 16px;
  }
}
</style>
