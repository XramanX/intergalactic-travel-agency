"use client";

import React from "react";
import Link from "next/link";
import classNames from "classnames";
import styles from "./Stepper.module.scss";

export interface Step {
  label: string;
  href: string;
}

interface StepperProps {
  steps: Step[];
  currentHref: string;
  maxAllowedIndex: number;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentHref,
  maxAllowedIndex,
}) => {
  const currentIndex = steps.findIndex((step) =>
    currentHref.startsWith(step.href)
  );

  return (
    <nav className={styles.stepper} aria-label="Booking steps">
      {steps.map((step, index) => {
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;
        const isDisabled = index > maxAllowedIndex;

        const wrapperClass = classNames(styles.step, {
          [styles["step--active"]]: isActive,
          [styles["step--completed"]]: isCompleted,
          [styles["step--disabled"]]: isDisabled,
        });

        const content = (
          <>
            <span className={styles.step__index}>{index + 1}</span>
            <span className={styles.step__label}>{step.label}</span>
          </>
        );

        return (
          <div key={step.href} className={wrapperClass}>
            {isDisabled ? (
              <div
                className={classNames(
                  styles.step__link,
                  styles["step__link--disabled"]
                )}
                aria-disabled="true"
              >
                {content}
              </div>
            ) : (
              <Link
                href={step.href}
                className={styles.step__link}
                aria-current={isActive ? "step" : undefined}
              >
                {content}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};
