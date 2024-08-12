"use client";
import { useState, useEffect } from "react";

export const useUserTimezone = () => {
  const [timezone, setTimezone] = useState<string | null>(null);

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(tz);
  }, []);

  return { timezone };
};
