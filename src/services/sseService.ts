export interface SSEUpdate {
  id: number
  currentCapacity: number
  category: string
}

const SSE_URL = 'https://timeslot-stream-ha2tva3niq-ey.a.run.app/sse'
const MAX_RECONNECT_ATTEMPTS = 5
const RECONNECT_INTERVAL = 50001

let reconnectAttempts = 0

export const connectSSE = (
  onMessage: (data: SSEUpdate) => void,
  onError: (attempt: number) => void
): EventSource => {
  const sse = new EventSource(SSE_URL)

  sse.onopen = () => {
    reconnectAttempts = 0
    console.warn('SSE successfully connected')
  }

  sse.onmessage = (event) => {
    try {
      const data: SSEUpdate = JSON.parse(event.data)
      onMessage(data)
    } catch (error) {
      console.error('SSE Data parsing error', error)
    }
  }

  sse.onerror = () => {
    console.error('SSE Error')
    sse.close()

    onError(reconnectAttempts)

    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      reconnectAttempts++
      setTimeout(() => {
        console.warn(`Trying to reconnect (${reconnectAttempts})`)
        connectSSE(onMessage, onError)
      }, RECONNECT_INTERVAL)
    } else {
      console.error('Limit of SSE connection attempts is reached')
    }
  }

  return sse
}

