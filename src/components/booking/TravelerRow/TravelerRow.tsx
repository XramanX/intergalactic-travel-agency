"use client";

import React from "react";
import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import { FaUserAstronaut, FaTrash } from "react-icons/fa";
import styles from "./TravelerRow.module.scss";

interface TravelerRowProps {
  index: number;
  fullName: string;
  age: number | "";
  onChange: (updates: { fullName?: string; age?: number | "" }) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export const TravelerRow: React.FC<TravelerRowProps> = ({
  index,
  fullName,
  age,
  onChange,
  onRemove,
  canRemove,
}) => {
  return (
    <div className={styles.row}>
      <div className={styles.avatarContainer}>
        <FaUserAstronaut className={styles.avatarIcon} />
        <span className={styles.indexBadge}>{index + 1}</span>
      </div>

      <div className={styles.fields}>
        <Input
          label="Full name"
          placeholder="e.g. Jane Doe"
          value={fullName}
          onChange={(e) => onChange({ fullName: e.target.value })}
        />
        <Input
          label="Age"
          type="number"
          min={1}
          value={age === "" ? "" : String(age)}
          onChange={(e) => {
            const value = e.target.value;
            onChange({
              age: value === "" ? "" : Number(value),
            });
          }}
        />
      </div>
      <div className={styles.actions}>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={styles.removeBtn}
          onClick={onRemove}
          disabled={!canRemove}
          leftIcon={<FaTrash />}
        />
      </div>
    </div>
  );
};
