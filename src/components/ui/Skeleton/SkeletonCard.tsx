"use client";

import styles from "./SkeletonCard.module.scss";

interface SkeletonCardProps {
  count?: number;
  height?: number;
}

export function SkeletonCard({ count = 4, height = 95 }: SkeletonCardProps) {
  return (
    <div className={styles.skeletonGrid}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={styles.card}
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
}
