import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Printer } from "lucide-react";

export default function AcceptanceFeePage() {
  const [isPaid, setIsPaid] = useState(false);
  const acceptanceFee = 25000; // ₦25,000

  const handlePayment = () => {
    // Handle payment logic here
    setIsPaid(true);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  if (isPaid) {
    return (
      <div className="min-h-screen bg-white p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl">
          <Card className="border-green-500">
            <CardHeader className="text-center px-4 sm:px-6">
              <div className="mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-green-500" />
              </div>
              <CardTitle className="text-xl sm:text-2xl text-green-500">
                Payment Successful
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Your acceptance fee has been paid
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-4 sm:px-6">
              <div className="rounded-lg bg-gray-50 p-3 sm:p-4 print:bg-white print:border print:border-gray-300">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                    <span className="text-xs sm:text-sm text-gray-600">
                      Acceptance Fee
                    </span>
                    <span className="text-base sm:text-lg font-semibold">
                      ₦{acceptanceFee.toLocaleString("en-NG")}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                    <span className="text-xs sm:text-sm text-gray-600">
                      Status
                    </span>
                    <span className="rounded-full bg-green-100 px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium text-green-700 w-fit">
                      Paid
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                    <span className="text-xs sm:text-sm text-gray-600">
                      Payment Date
                    </span>
                    <span className="text-xs sm:text-sm font-medium">
                      {new Date().toLocaleDateString("en-NG", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 pt-2 border-t border-gray-200">
                    <span className="text-xs sm:text-sm text-gray-600">
                      Transaction Reference
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-medium">
                      TXN-{Date.now().toString().slice(-10)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs sm:text-sm text-gray-600 print:text-left">
                You can now proceed with your registration process
              </p>

              <Button
                onClick={handlePrintReceipt}
                className="w-full bg-green-500 hover:bg-green-600 print:hidden flex items-center justify-center gap-2 h-10 sm:h-11 text-sm sm:text-base"
                size="lg"
              >
                <Printer className="h-4 w-4 sm:h-5 sm:w-5" />
                Print Receipt
              </Button>
            </CardContent>
          </Card>

          <div className="hidden print:block mt-8 text-center text-xs text-gray-600 border-t pt-4">
            <p className="font-semibold">TMIT Portal</p>
            <p>This is an official payment receipt</p>
            <p className="mt-2">
              Printed on: {new Date().toLocaleString("en-NG")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-xl sm:text-2xl">
              Acceptance Fee
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Complete your acceptance fee payment to proceed with registration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
            <div className="rounded-lg border-2 border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    Acceptance Fee
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    One-time payment required for admission
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    ₦{acceptanceFee.toLocaleString("en-NG")}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3 rounded-lg bg-gray-50 p-3 sm:p-4">
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                Payment Information
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
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
              className="w-full bg-green-500 hover:bg-green-600 h-10 sm:h-11 text-sm sm:text-base"
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
