"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { useTheme, ThemeName } from "@/features/theme/ThemeContext";
import styles from "./ThemeSwitcher.module.scss";
import { FaRegMoon, FaRegSun } from "react-icons/fa";
import { MdGradient } from "react-icons/md";
import classNames from "classnames";

const THEME_OPTIONS: { id: ThemeName; label: string; icon: JSX.Element }[] = [
  { id: "classic", label: "Classic", icon: <FaRegMoon /> },
  { id: "light", label: "Light", icon: <FaRegSun /> },
  { id: "midnight", label: "Midnight", icon: <FaRegMoon /> },
  { id: "aurora", label: "Aurora", icon: <MdGradient /> },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  const current = THEME_OPTIONS.find((t) => t.id === theme) ?? THEME_OPTIONS[0];

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.triggerIcon}>{current.icon}</span>
        <span className={styles.triggerLabel}>{current.label}</span>
        <span className={classNames(styles.chevron, { [styles.open]: open })}>
          ▾
        </span>
      </button>

      <div
        className={classNames(styles.menu, {
          [styles.menuOpen]: open,
        })}
      >
        {THEME_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={classNames(styles.item, {
              [styles.active]: opt.id === theme,
            })}
            onClick={() => {
              setTheme(opt.id);
              setOpen(false);
            }}
          >
            <span className={styles.itemIcon}>{opt.icon}</span>
            <span className={styles.itemLabel}>{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
