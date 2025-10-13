import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router";

const sessions = [
  "2022-2024",
  "2023-2025",
  "2024-2026",
  "2025-2027",
  "2026-2028",
  "2027-2029",
];

const levels = ["ND1", "ND2", "ND3"];

const paymentTypes = ["Full", "Installment"];

export default function Sessions() {
  const [academicSession, setAcademicSession] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [level, setLevel] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ academicSession, paymentType, level });
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground">
            Select Session
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-6 text-lg font-medium">Select Session</h2>

            <div className="space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="academic-session">Academic Session</Label>
                <Select
                  value={academicSession}
                  onValueChange={setAcademicSession}
                >
                  <SelectTrigger id="academic-session" className="w-full">
                    <SelectValue placeholder="Select session" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessions.map((session) => (
                      <SelectItem key={session} value={session}>
                        {session}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="payment-type">Payment Type</Label>
                <Select value={paymentType} onValueChange={setPaymentType}>
                  <SelectTrigger id="payment-type" className="w-full">
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="level">Level</Label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger id="level" className="w-full">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((lvl) => (
                      <SelectItem key={lvl} value={lvl}>
                        {lvl}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Link to="/dashboard/fees/pay_fees">
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-8 cursor-pointer"
              >
                {" "}
                Proceed
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
