import { useUserTimezone } from "@/lib/providers/timezone";
import {
  CheckSquare,
  Clock,
  Globe,
  Video,
  Calendar as CalendarIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "./ui/card";
import IntroForm from "./common/form";

const Scheduler: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("12h");
  const { timezone } = useUserTimezone();
  const [showForm, setShowForm] = useState<boolean>(false);

  const availableTime = timeFormat === "12h"
    ? ["9:00 AM", "10:00 AM", "2:00 PM", "4:00 PM"]
    : ["9:00", "10:00", "14:00", "16:00"];

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      setShowForm(true);
    }
  };

  const handleBack = () => {
    setSelectedDate(undefined);
    setSelectedTime(null);
    setShowForm(false);
  };

  const formattedDate = selectedDate?.toLocaleDateString("en-US", {
    day: "numeric",
    weekday: "long",
    month: "long",
    year: "numeric",
  });

  const formattedMonth = selectedDate?.toLocaleDateString("en-US", {
    month: "short",
  });

  const formattedDay = selectedDate?.toLocaleDateString("en-US", {
    day: "numeric",
  });

  return (
    <div className="flex flex-col lg:flex-row space-y-1 lg:space-y-0 lg:space-x-1 p-6 bg-primary-foreground">
      <Card className="w-full lg:w-1/3">
        <CardHeader>
          <CardTitle className="text-lg font-bold">OSbytes Inc</CardTitle>
          <CardDescription className="font-semibold text-xl tracking-wider">
            Introduction Call
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {showForm ? (
              <p className="text-sm font-semibold flex gap-2 items-center">
                <CalendarIcon size={15} />
                {formattedDate} : {selectedTime}{" "}
              </p>
            ) : (
              ""
            )}
            <p className="text-sm flex gap-2 items-center">
              <CheckSquare size={15} />
              Requires Confirmation
            </p>
            <p className="text-sm flex gap-2 items-center">
              <Clock size={15} />
              30 minutes
            </p>
            <p className="text-sm flex gap-2 items-center">
              <Video size={15} />
              Mike Video
            </p>
            <p className="text-sm flex gap-2 items-center">
              <Globe size={15} />
              {timezone || "Loading..."}
            </p>
          </div>
        </CardContent>
      </Card>
      {!showForm ? (
        <>
          <Card className="w-full lg:w-1/3">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Select Date</CardTitle>
            </CardHeader>
            <CardContent className="w-full">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => setSelectedDate(date)}
                className="w-full"
                disabled={{ dayOfWeek: [0, 6] }}
              />
            </CardContent>
          </Card>
          <Card className="w-full lg:w-1/3">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Select Time</CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <div className="flex space-x-2 mb-4 justify-between items-center">
                <p className="text-xl">
                  {selectedDate ? (
                    <>
                      <span className="font-bold">{formattedMonth}</span>{" "}
                      {formattedDay}
                    </>
                  ) : (
                    ""
                  )}
                </p>
                <div className="border-2 rounded-md p-1 space-x-1">
                  <Button
                    onClick={() => setTimeFormat("12h")}
                    disabled={timeFormat === "12h"}
                  >
                    12h
                  </Button>
                  <Button
                    onClick={() => setTimeFormat("24h")}
                    disabled={timeFormat === "24h"}
                  >
                    24h
                  </Button>
                </div>
              </div>
              <div className="grid gap-2 mt-4">
                {availableTime.map((time) => (
                  <div
                    key={time}
                    className="relative w-full flex gap-2 justify-between items-center"
                  >
                    <Button
                      onClick={() => setSelectedTime(time)}
                      className={`${
                        selectedTime === time
                          ? "bg-primary text-muted-foreground"
                          : ""
                      } w-full`}
                    >
                      {time}
                    </Button>
                    {selectedTime === time && (
                      <Button
                        onClick={handleConfirm}
                        disabled={!selectedDate || !selectedTime}
                        className="w-full"
                      >
                        Next
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="mt-4 w-full lg:w-2/3 ">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Meeting Details</CardTitle>
          </CardHeader>
          <CardContent>
            <IntroForm
              onClick={handleBack}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Scheduler;
