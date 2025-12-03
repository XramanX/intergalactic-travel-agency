"use client";

import React from "react";
import {
  FaRocket,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserAstronaut,
} from "react-icons/fa";
import type { Destination } from "@/types/booking";
import type { BookingDates, Traveler } from "@/types/booking";
import styles from "./SummaryCard.module.scss";

interface SummaryCardProps {
  destination: Destination | null;
  dates: BookingDates;
  travelers: Traveler[];
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  destination,
  dates,
  travelers,
}) => {
  return (
    <section className={styles.card} aria-label="Trip summary">
      <header className={styles.header}>
        <div className={styles.headerMain}>
          <FaRocket className={styles.headerIcon} />
          <div>
            <h3>Trip summary</h3>
            {destination && (
              <p>
                {destination.name} · {travelers.length} traveler
                {travelers.length > 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.column}>
          <div className={styles.block}>
            <div className={styles.blockLabel}>
              <FaMapMarkerAlt />
              <span>Destination</span>
            </div>
            {destination ? (
              <p className={styles.blockValue}>
                <span className={styles.destName}>{destination.name}</span>
                <span className={styles.destMeta}>
                  {destination.distance} · {destination.travelTime}
                </span>
              </p>
            ) : (
              <p className={styles.blockValueMuted}>No destination selected.</p>
            )}
          </div>

          <div className={styles.block}>
            <div className={styles.blockLabel}>
              <FaCalendarAlt />
              <span>Dates</span>
            </div>
            <p className={styles.blockValue}>
              {dates.departureDate || "—"}{" "}
              <span className={styles.arrow}>→</span> {dates.returnDate || "—"}
            </p>
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.block}>
            <div className={styles.blockLabel}>
              <FaUserAstronaut />
              <span>Travelers ({travelers.length})</span>
            </div>

            <ul className={styles.travelerList}>
              {travelers.map((t, idx) => (
                <li key={t.id ?? idx} className={styles.travelerItem}>
                  <div className={styles.travelerAvatar}>
                    <span>{idx + 1}</span>
                  </div>
                  <div className={styles.travelerInfo}>
                    <div className={styles.travelerName}>
                      {t.fullName || "Unnamed traveler"}
                    </div>
                    <div className={styles.travelerMeta}>
                      Age {t.age || "—"}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
