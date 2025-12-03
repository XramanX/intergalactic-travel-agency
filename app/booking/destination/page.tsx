"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DestinationCard } from "@/components/booking/DestinationCard/DestinationCard";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { useBooking } from "@/features/booking/hooks/useBooking";
import {
  validateDates,
  validateTripDurationWithDestination,
} from "@/features/booking/utils/validation";
import { fetchJson } from "@/lib/fetchJson";
import type { Destination } from "@/types/booking";
import { FaCalendarAlt, FaGlobeAmericas } from "react-icons/fa";
import styles from "./page.module.scss";
import { SkeletonCard } from "@/components/ui/Skeleton/SkeletonCard";

export default function DestinationPage() {
  const router = useRouter();
  const {
    state: { destinationId, dates },
    setDestination,
    setDates,
  } = useBooking();

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateError, setDateError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson<Destination[]>("/api/destinations")
      .then(setDestinations)
      .finally(() => setLoading(false));
  }, []);

  const handleNext = () => {
    const baseError = validateDates(dates.departureDate, dates.returnDate);
    console.log(baseError);
    if (baseError) {
      setDateError(baseError);
      return;
    }

    const selectedDestination =
      destinations.find((d) => d.id === destinationId) ?? null;

    const durationError = validateTripDurationWithDestination(
      dates.departureDate,
      dates.returnDate,
      selectedDestination
    );

    if (durationError) {
      setDateError(durationError);
      return;
    }

    router.push("/booking/travelers");
  };

  const handleChange = (
    field: "departureDate" | "returnDate",
    value: string
  ) => {
    setDates({ ...dates, [field]: value });
    setDateError(null);
  };

  return (
    <div className={styles.page}>
      <section className={styles.datesPanel}>
        <div className={styles.panelHeader}>
          <FaCalendarAlt className={styles.icon} />
          <h2>Travel details</h2>
        </div>
        <div className={styles.dateGrid}>
          <Input
            type="date"
            label="Departure"
            value={dates.departureDate ?? ""}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => handleChange("departureDate", e.target.value)}
            // error={dateError || undefined}
          />
          <Input
            type="date"
            label="Return"
            value={dates.returnDate ?? ""}
            onChange={(e) => handleChange("returnDate", e.target.value)}
            error={dateError || undefined}
          />
        </div>
      </section>

      <section className={styles.destinationsSection}>
        <div className={styles.sectionHeader}>
          <FaGlobeAmericas className={styles.icon} />
          <h3>Destinations</h3>
        </div>

        {loading ? (
          <SkeletonCard count={4} />
        ) : (
          <div className={styles.destinationsGrid}>
            {destinations.map((d) => (
              <DestinationCard
                key={d.id}
                destination={d}
                selected={d.id === destinationId}
                onSelect={() => setDestination(d.id)}
              />
            ))}
          </div>
        )}
      </section>

      <div className={styles.footer}>
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!destinationId}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
