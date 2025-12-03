import type { BookingState } from "@/types/booking";

export const LOCAL_STORAGE_BOOKING_KEY = "intergalactic-booking-state";

export const MIN_TRAVELERS = 1;
export const MAX_TRAVELERS = 5;

export const INITIAL_BOOKING_STATE: BookingState = {
  destinationId: null,
  dates: {
    departureDate: null,
    returnDate: null,
  },
  travelers: [
    {
      id: "t-1",
      fullName: "",
      age: "",
    },
  ],
};
