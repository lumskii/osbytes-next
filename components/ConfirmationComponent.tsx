import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { CheckCircle } from 'lucide-react';

interface ConfirmationComponentProps {
  name: string;
  email: string;
  selectedDate: string;
  selectedTime: string;
}

export function ConfirmationComponent({ name, email, selectedDate, selectedTime }: ConfirmationComponentProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          <CheckCircle className="inline-block mr-2 text-green-500" size={32} />
          Meeting Scheduled!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center mb-4">
          Thank you, {name}! Your meeting has been scheduled and a confirmation email has been sent to {email}.
        </p>
        <div className="text-center">
          <p><strong>Date:</strong> {selectedDate}</p>
          <p><strong>Time:</strong> {selectedTime}</p>
        </div>
      </CardContent>
    </Card>
  );
}