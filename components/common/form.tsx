import { useUserTimezone } from "@/lib/providers/timezone";
import { CheckSquare, Clock, Globe, Video, } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";


const Scheduler: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
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

  return (
    <div className="flex space-x-4 p-6 bg-primary-foreground">
        <div className="w-1/3 space-y-4">
            <div className="text-lg font-bold">OSbytes Inc</div>
            <div className="grid gap-2">
                <h1 className="font-semibold text-xl tracking-wider">Introdution Call</h1>
                <p className="text-sm flex gap-2 items-center"><CheckSquare size={15} />Requires Confirmation</p>
                <p className="text-sm flex gap-2 items-center"><Clock size={15} />30 minutes</p>
                <p className="text-sm flex gap-2 items-center"><Video size={15} />Mike Video</p>
                <p className="text-sm flex gap-2 items-center"><Globe size={15} />{timezone || "Loading..."}</p>
            </div>
        </div>
        <div className="w-1/3 items-center">
            <div className="w-full justify-center">
            <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => setSelectedDate(date)}
                className="w-full"
                // disabled={availableTime}
            />
            </div>
        </div>
        <div className="w-1/3 space-y-4">
        <h2 className="text-lg font-bold">Select Time</h2>
        <div>
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
        </div>
        {showForm && selectedDate && (
        <form onSubmit={handleSubmit}>
          <h3>Meeting Details</h3>
          <label>Name:</label>
          <input type="text" name="name" required />
          <label>Email:</label>
          <input type="email" name="email" required />
          <label>Requirements:</label>
          <textarea name="requirements"></textarea>
          <input type="hidden" name="date" value={selectedDate.toString()} />
          <button type="submit">Schedule Meeting</button>
        </form>
      )}
    </div>
  );
};

export default Scheduler;
