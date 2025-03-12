# Time Slot Management App

A Vue.js application for managing and displaying time slots with capacity indicators. The app shows available time slots organized by date, with visual indicators for different capacity states (green, yellow, red).

![Demo](public/demo.gif)

## Features

- Display time slots grouped by date
- Real-time capacity updates via SSE (Server-Sent Events)
- Visual capacity indicators (green, yellow, red backgrounds)
- Responsive timeline design with horizontal scrolling
- Error handling with automatic reconnection
- Vuetify UI components integration

## Design Choices

### Architecture
- **Composables**: Separated business logic into reusable composables (`useTimeSlots`, `useTimeSlotHelpers`) for better code organization and reusability
- **Services Layer**: Isolated API and SSE communication in dedicated services for better maintainability
- **Type Safety**: Used TypeScript interfaces for API responses and SSE updates to catch potential errors early

### Real-time Updates
- **Server-Sent Events**: Chose SSE over WebSocket for simpler one-way real-time updates
- **Reconnection Logic**: Implemented exponential backoff with max attempts to handle network issues gracefully
- **Error Handling**: Added comprehensive error handling with user feedback via snackbars

### UI/UX
- **Timeline View**: Horizontal timeline for intuitive time slot visualization
- **Capacity Indicators**: Color coding for quick capacity status recognition
- **Responsive Design**: Horizontal scrolling for better mobile experience

### Testing
- **Unit Tests**: Focused on testing business logic in composables
- **Isolated Tests**: Separated test files in `__tests__` directories for better organization
- **Vitest**: Chose Vitest for its Vue.js integration and speed

## Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- Modern browser with SSE support

## Installation

1. Clone the repository:
```bash
git clone https://github.com/nonameptz/conroo-app.git
cd conroo-app
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