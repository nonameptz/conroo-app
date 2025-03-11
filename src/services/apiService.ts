import axios from 'axios';

const API_BASE_URL = 'https://timeslot-stream-ha2tva3niq-ey.a.run.app';

export interface TimeSlot {
  id: number;
  start_time?: string;
  startTime?: string;
  end_time?: string;
  endTime?: string;
  category: string;
  capacity: {
    current_capacity?: number;
    max_capacity?: number;
    current?: number;
    maximum?: number;
  };
}

export const fetchTimeSlots = async (): Promise<TimeSlot[]> => {
  const response = await axios.get(`${API_BASE_URL}/timeSlots`);
  return response.data;
};
