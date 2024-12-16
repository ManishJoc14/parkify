"use client";

import { Feather, Mail, Text, User } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FeedbackSubmittedMessage from "./feedbackSubmittedMessage";

interface FormData {
  name: string;
  email: string;
  ratings: number;
  message: string;
}

export default function FeedbackForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    ratings: 1,
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    try {
      setLoading(true);
      // await sumbmitFeedback()
      setIsSubmitted(true);
      setLoading(false);
    } catch (error) {
      setError((error as { message: string }).message);
      console.log((error as { message: string }).message);
    }
  };

  if (isSubmitted) return <FeedbackSubmittedMessage />;
  return (
    <div className="container mx-auto py-12">
      <div className="mx-auto max-w-xl">
        <h2 className="text-2xl flex justify-center font-bold text-gray-800 mb-8 text-center">
          Feedback <Feather className="text-violet-600 ml-2" />
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* NAME */}
          <div className="relative">
            <User
              className="absolute left-3 top-[48%] -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              type="text"
              placeholder="Name"
              value={formData.name}
              name="name"
              onChange={handleChange}
              className="pl-10 flex item-center"
              disabled={loading}
              required
            />
          </div>

          {/* EMAIL */}
          <div className="relative">
            <Mail
              className="absolute left-3 top-[48%] -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              className="pl-10 flex item-center"
              disabled={loading}
              required
            />
          </div>

          {/* Ratings */}
          <div className="relative">
            <span className="absolute left-3 top-[48%] -translate-y-1/2">
              ⭐
            </span>

            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, ratings: parseInt(value) }))
              }
              defaultValue="2"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Ratings" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">⭐</SelectItem>
                <SelectItem value="2">⭐⭐</SelectItem>
                <SelectItem value="3">⭐⭐⭐</SelectItem>
                <SelectItem value="4">⭐⭐⭐⭐</SelectItem>
                <SelectItem value="5">⭐⭐⭐⭐⭐</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="relative">
            <Text
              className="absolute left-3 top-[16%] -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Textarea
              value={formData.message}
              name="message"
              onChange={handleChange}
              rows={5}
              placeholder="Type your message here."
              className="pl-10 flex item-center"
            />
          </div>

          <Button
            type="button"
            size="lg"
            className="h-12 w-full px-8 hover:scale-[0.99] transition-all"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
