"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/features/booking/hooks/useBooking";
import { validateTravelers } from "@/features/booking/utils/validation";
import { TravelerRow } from "@/components/booking/TravelerRow/TravelerRow";
import { Button } from "@/components/ui/Button/Button";
import { MAX_TRAVELERS } from "@/features/booking/constants";
import { FaUserAstronaut, FaPlus } from "react-icons/fa";
import styles from "./page.module.scss";

export default function TravelersPage() {
  const router = useRouter();
  const {
    state: { travelers },
    updateTraveler,
    addTraveler,
    removeTraveler,
  } = useBooking();

  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    const validationError = validateTravelers(travelers);
    if (validationError) {
      setError(validationError);
      return;
    }
    router.push("/booking/review");
  };

  const handleBack = () => {
    router.push("/booking/destination");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <FaUserAstronaut className={styles.icon} />
          <h2>Travelers</h2>
        </div>
        <span className={styles.count}>
          {travelers.length} of {MAX_TRAVELERS}
        </span>
      </header>

      <section className={styles.listCard}>
        <div className={styles.list}>
          {travelers.map((t) => (
            <TravelerRow
              key={t.id}
              index={travelers.findIndex((tr) => tr.id === t.id)}
              fullName={t.fullName}
              age={t.age}
              onChange={(updates) => updateTraveler(t.id, updates)}
              onRemove={() => removeTraveler(t.id)}
              canRemove={travelers.length > 1}
            />
          ))}
        </div>
      </section>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.controls}>
        <Button type="button" variant="secondary" onClick={handleBack}>
          Back
        </Button>

        <div className={styles.rightControls}>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              if (travelers.length < MAX_TRAVELERS) {
                addTraveler();
              }
            }}
            disabled={travelers.length >= MAX_TRAVELERS}
            leftIcon={<FaPlus />}
          >
            Add traveler
          </Button>

          <Button type="button" variant="primary" onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
