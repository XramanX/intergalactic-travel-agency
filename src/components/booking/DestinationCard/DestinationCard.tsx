"use client";

import React from "react";
import classNames from "classnames";
import styles from "./DestinationCard.module.scss";
import type { Destination } from "@/types/booking";

interface Props {
  destination: Destination;
  selected: boolean;
  onSelect: () => void;
}

export const DestinationCard: React.FC<Props> = ({
  destination,
  selected,
  onSelect,
}) => {
  return (
    <button
      type="button"
      className={classNames(styles.card, {
        [styles["card--selected"]]: selected,
      })}
      onClick={onSelect}
    >
      <div className={styles.name}>{destination.name}</div>
      <div className={styles.info}>
        <span>Distance: {destination.distance}</span>
        <span>Travel time: {destination.travelTime}</span>
      </div>
    </button>
  );
};
