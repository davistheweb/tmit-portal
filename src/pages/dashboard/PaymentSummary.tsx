"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample payment items - you can replace with actual data
const paymentItems = [
  { id: 1, description: "Tuition Fee", amount: 45000 },
  { id: 2, description: "Library Fee", amount: 5000 },
  { id: 3, description: "Laboratory Fee", amount: 8000 },
  { id: 4, description: "Sports Fee", amount: 3000 },
  { id: 5, description: "Development Levy", amount: 10000 },
  { id: 6, description: "Medical Fee", amount: 4000 },
];

export default function PaymentSummary() {
  const totalAmount = paymentItems.reduce((sum, item) => sum + item.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const handleProceedToPayment = () => {
    // Handle payment logic here
    console.log("Proceeding to payment...");
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Payment Summary</h1>
          <p className="text-sm text-gray-600">
            Review your payment details below
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">S/N</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentItems.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.amount)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t-2 border-gray-300 bg-gray-50 font-semibold">
                  <TableCell colSpan={2} className="text-right text-base">
                    Total Amount:
                  </TableCell>
                  <TableCell className="text-right text-base">
                    {formatCurrency(totalAmount)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="mt-6 flex justify-end">
              <Button
                onClick={handleProceedToPayment}
                className="bg-green-500 px-8 hover:bg-green-600"
              >
                Proceed to Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
