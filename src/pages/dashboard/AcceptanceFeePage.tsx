"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function AcceptanceFeePage() {
  const [isPaid, setIsPaid] = useState(false);
  const acceptanceFee = 25000; // ₦25,000

  const handlePayment = () => {
    // Handle payment logic here
    setIsPaid(true);
  };

  if (isPaid) {
    return (
      <div className="min-h-screen bg-white p-4 md:p-8">
        <div className="mx-auto max-w-2xl">
          <Card className="border-green-500">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
              <CardTitle className="text-2xl text-green-500">
                Payment Successful
              </CardTitle>
              <CardDescription className="text-base">
                Your acceptance fee has been paid
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Acceptance Fee</span>
                  <span className="text-lg font-semibold">
                    ₦{acceptanceFee.toLocaleString("en-NG")}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Paid
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-gray-600">Payment Date</span>
                  <span className="text-sm font-medium">
                    {new Date().toLocaleDateString("en-NG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <p className="text-center text-sm text-gray-600">
                You can now proceed with your registration process
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Acceptance Fee</CardTitle>
            <CardDescription>
              Complete your acceptance fee payment to proceed with registration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Acceptance Fee
                  </h3>
                  <p className="text-sm text-gray-600">
                    One-time payment required for admission
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">
                    ₦{acceptanceFee.toLocaleString("en-NG")}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 rounded-lg bg-gray-50 p-4">
              <h4 className="font-semibold text-gray-900">
                Payment Information
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500" />
                  <span>This is a one-time non-refundable payment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500" />
                  <span>
                    Payment must be completed before registration deadline
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500" />
                  <span>
                    You will receive a payment confirmation after successful
                    payment
                  </span>
                </li>
              </ul>
            </div>

            <Button
              onClick={handlePayment}
              className="w-full bg-green-500 hover:bg-green-600"
              size="lg"
            >
              Proceed to Payment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
