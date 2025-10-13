import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Printer } from "lucide-react";
import { Link } from "react-router";

export default function Fees() {
  const paymentHistory = [
    {
      invoice: "TMIT/1/SCHF100000139844",
      amount: "48,000",
      balance: "60000",
      level: "100 LEVEL",
      paymentType: "Full Payment",
      session: "2021-2022",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">School Fees</h1>
          <Button className="bg-green-500 hover:bg-green-600 text-white cursor-pointer">
            <Link to="sessions">New Payment</Link>
          </Button>
        </div>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-900">
              School Fees History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Invoice #
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Amount ₦
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Level
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Payment Type
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Session
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <div className="text-sm font-medium text-gray-900">
                          {payment.invoice}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm font-medium text-red-600">
                          {payment.amount}
                        </div>
                        <div className="text-xs text-gray-500">
                          Pay balance of {payment.balance}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge
                          variant="secondary"
                          className="bg-gray-100 text-gray-700"
                        >
                          {payment.level}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-900">
                          {payment.paymentType}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-900">
                          {payment.session}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-white text-xs cursor-pointer"
                        >
                          <Printer className="h-3 w-3 mr-1" />
                          Print Receipt
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="block md:hidden space-y-4">
              {paymentHistory.map((payment, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Invoice #</p>
                        <p className="text-sm font-medium text-gray-900 break-all">
                          {payment.invoice}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-700 ml-2"
                      >
                        {payment.level}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Amount</p>
                        <p className="text-sm font-medium text-red-600">
                          ₦{payment.amount}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Balance: ₦{payment.balance}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Session</p>
                        <p className="text-sm text-gray-900">
                          {payment.session}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">Payment Type</p>
                      <p className="text-sm text-gray-900">
                        {payment.paymentType}
                      </p>
                    </div>

                    <Button
                      size="sm"
                      className="w-full bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                    >
                      <Printer className="h-3 w-3 mr-2" />
                      Print Receipt
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
