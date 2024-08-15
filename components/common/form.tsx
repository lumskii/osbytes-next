import { useUserTimezone } from "@/lib/providers/timezone";
import { CheckSquare, Clock, Globe, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../ui/card";

const Scheduler: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("12h");
  const { timezone } = useUserTimezone();
  const [showForm, setShowForm] = useState<boolean>(false);
  const router = useRouter();

  const availableTime = ["9:00 AM", "10:00 AM", "2:00 PM", "4:00 PM"];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    router.push("/success");
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      setShowForm(true);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 p-6 bg-primary-foreground">
      {!showForm ? (
        <>
      <Card className="w-full lg:w-1/3">
        <CardHeader>
          <CardTitle className="text-lg font-bold">OSbytes Inc</CardTitle>
          <CardDescription className="font-semibold text-xl tracking-wider">Introduction Call</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <p className="text-sm flex gap-2 items-center"><CheckSquare size={15} />Requires Confirmation</p>
            <p className="text-sm flex gap-2 items-center"><Clock size={15} />30 minutes</p>
            <p className="text-sm flex gap-2 items-center"><Video size={15} />Mike Video</p>
            <p className="text-sm flex gap-2 items-center"><Globe size={15} />{timezone || "Loading..."}</p>
          </div>
        </CardContent>
      </Card>

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
          />
        </CardContent>
      </Card>
      <Card className="w-full lg:w-1/3">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Select Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Button onClick={() => setTimeFormat("12h")} disabled={timeFormat === "12h"}>
              12h
            </Button>
            <Button onClick={() => setTimeFormat("24h")} disabled={timeFormat === "24h"}>
              24h
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {availableTime.map((time) => (
              <Button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={selectedTime === time ? "bg-primary text-white" : ""}
              >
                {time}
              </Button>
            ))}
          </div>
          <div className="mt-4">
          <Button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            className="w-full"
          >
            Confirm
          </Button>
        </div>
        </CardContent>
      </Card>
      </>
      ) : (
            <Card className="mt-4 w-full">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Meeting Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Name:</label>
                    <input type="text" name="name" required className="w-full p-2 border rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Email:</label>
                    <input type="email" name="email" required className="w-full p-2 border rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Requirements:</label>
                    <textarea name="requirements" className="w-full p-2 border rounded-md"></textarea>
                  </div>
                  <input type="hidden" name="date" value={selectedDate?.toString() || ""} />
                  <input type="hidden" name="time" value={selectedTime || ""} />
                  <Button type="submit" className="w-full">Schedule Meeting</Button>
                </form>
              </CardContent>
            </Card>
        )
      }
    </div>
  );
};

export default Scheduler;
