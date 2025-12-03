"use client";

import React, { createContext, useCallback, useMemo } from "react";
import type { ReactNode } from "react";
import type { BookingState, DestinationId, Traveler } from "@/types/booking";
import { useBookingPersistence } from "../hooks/useBookingPersistence";
import {
  INITIAL_BOOKING_STATE,
  MIN_TRAVELERS,
  MAX_TRAVELERS,
} from "../constants";

interface BookingContextValue {
  state: BookingState;
  setDestination: (id: DestinationId) => void;
  setDates: (args: {
    departureDate: string | null;
    returnDate: string | null;
  }) => void;
  updateTraveler: (id: string, updates: Partial<Omit<Traveler, "id">>) => void;
  addTraveler: () => void;
  removeTraveler: (id: string) => void;
  resetBooking: () => void;
}

export const BookingContext = createContext<BookingContextValue | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export const BookingProvider: React.FC<Props> = ({ children }) => {
  const { bookingState, setBookingState } = useBookingPersistence();

  const setDestination = useCallback(
    (id: DestinationId) => {
      setBookingState((prev) => ({
        ...prev,
        destinationId: id,
      }));
    },
    [setBookingState]
  );

  const setDates = useCallback(
    (dates: { departureDate: string | null; returnDate: string | null }) => {
      setBookingState((prev) => ({
        ...prev,
        dates: dates,
      }));
    },
    [setBookingState]
  );

  const updateTraveler = useCallback(
    (id: string, updates: Partial<Omit<Traveler, "id">>) => {
      setBookingState((prev) => ({
        ...prev,
        travelers: prev.travelers.map((t) =>
          t.id === id ? { ...t, ...updates } : t
        ),
      }));
    },
    [setBookingState]
  );

  const addTraveler = useCallback(() => {
    setBookingState((prev) => {
      if (prev.travelers.length >= MAX_TRAVELERS) return prev;

      const newTraveler: Traveler = {
        id: `t-${Date.now()}-${Math.random()}`,
        fullName: "",
        age: "",
      };

      return {
        ...prev,
        travelers: [...prev.travelers, newTraveler],
      };
    });
  }, [setBookingState]);

  const removeTraveler = useCallback(
    (id: string) => {
      setBookingState((prev) => {
        if (prev.travelers.length <= MIN_TRAVELERS) return prev;

        return {
          ...prev,
          travelers: prev.travelers.filter((t) => t.id !== id),
        };
      });
    },
    [setBookingState]
  );

  const resetBooking = useCallback(() => {
    setBookingState(INITIAL_BOOKING_STATE);
  }, [setBookingState]);

  const value = useMemo<BookingContextValue>(
    () => ({
      state: bookingState,
      setDestination,
      setDates,
      updateTraveler,
      addTraveler,
      removeTraveler,
      resetBooking,
    }),
    [
      bookingState,
      setDestination,
      setDates,
      updateTraveler,
      addTraveler,
      removeTraveler,
      resetBooking,
    ]
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};
