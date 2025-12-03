"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/features/booking/hooks/useBooking";
import { Button } from "@/components/ui/Button/Button";
import { SummaryCard } from "@/components/booking/SummaryCard/SummaryCard";
import { getDestinationById } from "@/features/booking/services/bookingApi";
import {
  validateDates,
  validateTravelers,
  validateTripDurationWithDestination,
} from "@/features/booking/utils/validation";
import type { Destination } from "@/types/booking";
import { fetchJson } from "@/lib/fetchJson";
import styles from "./page.module.scss";
import { FaCheckCircle } from "react-icons/fa";

export default function ReviewPage() {
  const router = useRouter();
  const { state, resetBooking } = useBooking();
  const [dest, setDest] = useState<Destination | null>(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!state.destinationId) return;
    getDestinationById(state.destinationId).then(setDest);
  }, [state.destinationId]);

  const handleSubmit = async () => {
    setSubmitError(null);

    const error =
      validateDates(state.dates.departureDate, state.dates.returnDate) ||
      validateTravelers(state.travelers) ||
      validateTripDurationWithDestination(
        state.dates.departureDate,
        state.dates.returnDate,
        dest
      );

    if (error) {
      setSubmitError(error);
      return;
    }

    setLoadingSubmit(true);

    try {
      const response = await fetchJson<{ success: boolean; bookingId: string }>(
        "/api/bookings",
        {
          method: "POST",
          body: JSON.stringify({
            destinationId: state.destinationId,
            departureDate: state.dates.departureDate,
            returnDate: state.dates.returnDate,
            travelers: state.travelers.map(({ fullName, age }) => ({
              fullName,
              age,
            })),
          }),
        }
      );

      if (response.success) {
        resetBooking();
        router.push(`/booking/review/success?bookingId=${response.bookingId}`);
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong.";
      setSubmitError(errorMessage);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleBack = () => router.push("/booking/travelers");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaCheckCircle className={styles.icon} />
        <h2>Almost ready!</h2>
        <p>Review your choices before takeoff.</p>
      </div>

      <SummaryCard
        destination={dest}
        dates={state.dates}
        travelers={state.travelers}
      />

      {submitError && <p className={styles.error}>{submitError}</p>}

      <div className={styles.actions}>
        <Button variant="secondary" onClick={handleBack}>
          Edit Travelers
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          isLoading={loadingSubmit}
        >
          Confirm & Launch
        </Button>
      </div>
    </div>
  );
}
