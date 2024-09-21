"use client";

import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';

const TestFirebaseForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to submit a message.",
        variant: "destructive",
      });
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "test_messages"), {
        message,
        userId: user.uid,
        createdAt: new Date()
      });
      
      toast({
        title: "Success",
        description: `Message submitted with ID: ${docRef.id}`,
      });
      setMessage('');
    } catch (error) {
      console.error("Error adding document: ", error);
      if (error instanceof Error) {
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      console.error("Full error object:", JSON.stringify(error, null, 2));
      toast({
        title: "Error",
        description: "Failed to submit message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter a test message"
        required
      />
      <Button type="submit">Submit Test Message</Button>
    </form>
  );
};

export default TestFirebaseForm;