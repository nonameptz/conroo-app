# Time Slot Management App

A Vue.js application for managing and displaying time slots with capacity indicators. The app shows available time slots organized by date, with visual indicators for different capacity states (green, yellow, red).

## Features

- Display time slots grouped by date
- Real-time capacity updates via SSE (Server-Sent Events)
- Visual capacity indicators (green, yellow, red backgrounds)
- Responsive timeline design with horizontal scrolling
- Error handling with automatic reconnection
- Vuetify UI components integration

## Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- Modern browser with SSE support

## Installation

1. Clone the repository:
```bash
git clone https://github.com/nonameptz/conroo-app.git
cd time-slot-app
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Testing

Run the test suite:
```bash
npm run test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Project Structure

```
src/
├── components/          # Vue components
│   ├── TimeSlotList.vue
│   └── __tests__/      # Component tests
├── composables/         # Reusable logic
│   ├── useTimeSlots.ts
│   ├── useTimeSlotHelpers.ts
│   └── __tests__/      # Composable tests
└── services/           # Services for API calls
    ├── apiService.ts
    ├── sseService.ts
    └── __tests__/      # Service tests
```

## Technologies

- Vue.js 3 with Composition API
- TypeScript with strict mode
- Vitest for unit testing
- Vuetify 3 for UI components
- Server-Sent Events for real-time updates

## Component Features

### TimeSlotList
- Groups time slots by date
- Shows capacity status with color coding
- Responsive timeline view
- Error handling with snackbar notifications
- Auto-reconnection for SSE failures

### TimeSlot Helpers
- Date formatting
- Time range display
- Capacity calculations
- Position and width calculations for timeline display


## License

MIT
```