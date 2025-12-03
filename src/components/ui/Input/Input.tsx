"use client";

import React from "react";
import classNames from "classnames";
import styles from "./Input.module.scss";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className,
  id,
  type,
  onFocus,
  onClick,
  ...rest
}) => {
  const inputId = id ?? rest.name ?? undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const helperId = helperText ? `${inputId}-helper` : undefined;

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleClick: React.MouseEventHandler<HTMLInputElement> = (e) => {
    if (type === "date") {
      const input = e.target as HTMLInputElement;
      try {
        input.showPicker?.();
      } catch {
        // ignore NotAllowedError
      }
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={classNames(styles.input, className, {
          [styles["input--error"]]: Boolean(error),
        })}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        onFocus={handleFocus}
        onClick={handleClick}
        {...rest}
      />
      {helperText && !error && (
        <p id={helperId} className={styles.helper}>
          {helperText}
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
};
