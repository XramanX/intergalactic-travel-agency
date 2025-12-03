"use client";

import React from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "sm";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...rest
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      className={classNames(
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        {
          [styles["button--fullWidth"]]: fullWidth,
        },
        className
      )}
      disabled={isDisabled}
      {...rest}
    >
      <div className={styles.content}>
        {isLoading && <span className={styles.spinner}></span>}

        {!isLoading && leftIcon && (
          <span className={styles.iconSlot}>{leftIcon}</span>
        )}

        {!!children && <span className={styles.label}>{children}</span>}

        {!isLoading && rightIcon && (
          <span className={styles.iconSlot}>{rightIcon}</span>
        )}
      </div>
    </button>
  );
};
