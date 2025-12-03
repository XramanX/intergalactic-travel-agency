"use client";

import { usePersistentState } from "@/hooks/usePersistentState";
import { INITIAL_BOOKING_STATE, LOCAL_STORAGE_BOOKING_KEY } from "../constants";
import type { BookingState } from "@/types/booking";

export function useBookingPersistence() {
  const [bookingState, setBookingState] = usePersistentState<BookingState>(
    LOCAL_STORAGE_BOOKING_KEY,
    INITIAL_BOOKING_STATE
  );

  return { bookingState, setBookingState };
}
