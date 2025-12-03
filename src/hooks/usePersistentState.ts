"use client";

import { useEffect, useState } from "react";

type Deserializer<T> = (value: string) => T;
type Serializer<T> = (value: T) => string;

interface Options<T> {
  deserialize?: Deserializer<T>;
  serialize?: Serializer<T>;
}

export function usePersistentState<T>(
  key: string,
  initialValue: T,
  options?: Options<T>
) {
  const { deserialize = JSON.parse, serialize = JSON.stringify } =
    options || {};

  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return;

      const parsed = deserialize(raw) as T;
      setState(parsed);
    } catch {}
  }, [key]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const serialized = serialize(state);
      window.localStorage.setItem(key, serialized);
    } catch {}
  }, [key, serialize, state]);

  return [state, setState] as const;
}
