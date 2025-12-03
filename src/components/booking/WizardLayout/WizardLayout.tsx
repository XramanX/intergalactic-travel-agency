"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/Card/Card";
import { Stepper, Step } from "@/components/ui/Stepper/Stepper";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher/ThemeSwitcher";
import { useBooking } from "@/features/booking/hooks/useBooking";
import {
  validateDates,
  validateTravelers,
  validateTripDurationWithDestinationId,
} from "@/features/booking/utils/validation";
import styles from "./WizardLayout.module.scss";

const steps: Step[] = [
  { label: "Destination", href: "/booking/destination" },
  { label: "Travelers", href: "/booking/travelers" },
  { label: "Review & Confirm", href: "/booking/review" },
];

interface WizardLayoutProps {
  children: React.ReactNode;
}

export const WizardLayout: React.FC<WizardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const {
    state: { destinationId, dates, travelers },
  } = useBooking();

  const currentIndex = steps.findIndex((step) =>
    pathname.startsWith(step.href)
  );

  const baseDatesValid =
    !!destinationId && !validateDates(dates.departureDate, dates.returnDate);

  const durationError = validateTripDurationWithDestinationId(
    dates.departureDate,
    dates.returnDate,
    destinationId
  );

  const datesValid = baseDatesValid && !durationError;
  const travelersValid = !validateTravelers(travelers);

  let maxAllowedIndex = 0;

  if (datesValid) {
    maxAllowedIndex = 1;
  }

  if (datesValid && travelersValid) {
    maxAllowedIndex = 2;
  }

  if (currentIndex > maxAllowedIndex) {
    maxAllowedIndex = currentIndex;
  }

  return (
    <div className={styles.shell}>
      <div className={styles.shell__gradient} />
      <main className={styles.shell__content}>
        <div className={styles.shell__heading}>
          <div>
            <h1 className={styles.title}>Intergalactic Travel Agency</h1>
            <p className={styles.subtitle}>
              Book your budget-friendly space adventure across the solar system.
            </p>
          </div>
          <ThemeSwitcher />
        </div>

        <section className={styles.shell__cardArea}>
          <Card>
            <div className={styles.wizard}>
              <div className={styles.wizard__top}>
                <Stepper
                  steps={steps}
                  currentHref={pathname}
                  maxAllowedIndex={maxAllowedIndex}
                />
              </div>
              <div className={styles.wizard__body}>{children}</div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
};
