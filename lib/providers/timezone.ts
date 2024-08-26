"use client";
import { useState, useEffect } from "react";
import { AvailabilitySlotsMap } from "../types";

export const allowedDurations = [15, 30, 45, 60];

export const defaultDuration = 30;

export const calendarsToCheck = ["primary"];

export const slotPadding = 0;

export const ownerTimezone = "America/Phoenix";

export const leadTime = 0;

const defaultWorkday = [
  {
    start: {
      hour: 9,
    },
    end: {
      hour: 17,
    },
  },
];

export const ownerAvailability: AvailabilitySlotsMap = {
  1: defaultWorkday,
  2: defaultWorkday,
  3: defaultWorkday,
  4: defaultWorkday,
  5: defaultWorkday,
};

export const localDateOptions: Intl.DateTimeFormatOptions = {
  day: "numeric",
  weekday: "long",
  month: "long",
  year: "numeric",
};

export const localTimeOptions: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "numeric",
};

export const useUserTimezone = () => {
  const [timezone, setTimezone] = useState<string | null>(null);

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(tz);
  }, []);

  return { timezone };
};
