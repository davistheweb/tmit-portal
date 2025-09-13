import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import {
  // Bell, Menu, User, RefreshCw,
  Printer,
} from "lucide-react";

export default function Fees() {
  const feeSchedule = [
    { sn: 1, description: "Acceptance Fees", nd1: "10,000", nd2: "", nd3: "" },
    { sn: 2, description: "Tuition Fees", nd1: "90,000", nd2: "", nd3: "" },
    {
      sn: 3,
      description: "Matriculation Fees",
      nd1: "15,000",
      nd2: "",
      nd3: "",
    },
    { sn: 4, description: "Library", nd1: "10,000", nd2: "", nd3: "" },
    {
      sn: 5,
      description: "Lab/Studio/Workshop Fees",
      nd1: "10,000",
      nd2: "",
      nd3: "",
    },
    { sn: 6, description: "Examination Fees", nd1: "20,000", nd2: "", nd3: "" },
    { sn: 7, description: "Sports Fees", nd1: "5,000", nd2: "", nd3: "" },
    { sn: 8, description: "Medical Fees", nd1: "10,000", nd2: "", nd3: "" },
    { sn: 9, description: "Development Levy", nd1: "5,000", nd2: "", nd3: "" },
    { sn: 10, description: "SUG Dues", nd1: "1,000", nd2: "", nd3: "" },
    {
      sn: 11,
      description: "Departmental Dues",
      nd1: "5,000",
      nd2: "",
      nd3: "",
    },
    { sn: 12, description: "Portal Access", nd1: "20,000", nd2: "", nd3: "" },
    {
      sn: 13,
      description: "Entrepreneurship",
      nd1: "20,000",
      nd2: "",
      nd3: "",
    },
    {
      sn: 14,
      description: "Sub-Total (Other Departments)",
      nd1: "211,000",
      nd2: "",
      nd3: "",
    },
    {
      sn: 15,
      description: "General Nursing Tuition Differentia",
      nd1: "120,000",
      nd2: "",
      nd3: "",
    },
    {
      sn: 16,
      description: "Total (Nursing Department)",
      nd1: "331,000",
      nd2: "",
      nd3: "",
    },
    {
      sn: 17,
      description: "Hostel Accommodation Fees (Optional)",
      nd1: "40,000",
      nd2: "",
      nd3: "",
    },
    { sn: 18, description: "Grand Total", nd1: "381,000", nd2: "", nd3: "" },
  ];

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
      {/* Header */}
      {/* <header className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">FUTO</span>
              </div>
              <div className="hidden md:block">
                <h1 className="font-semibold text-gray-900">
                  Federal University of Technology, Owerri
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <h2 className="text-lg font-medium text-gray-900 hidden md:block">
              School Fees
            </h2>
            <Button variant="ghost" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header> */}

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">School Fees</h1>
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            New Invoice
          </Button>
        </div>

        {/* Fee Schedule Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-900">
              Fee Schedule for All Departments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700 bg-gray-50">
                      S/N
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 bg-gray-50">
                      Description
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 bg-gray-50">
                      ND1
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 bg-gray-50">
                      ND2
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 bg-gray-50">
                      ND3
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 bg-gray-50">
                      Payment
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {feeSchedule.map((fee) => (
                    <tr
                      key={fee.sn}
                      className={`border-b border-gray-100 hover:bg-gray-50 ${
                        fee.description.includes("Total") ||
                        fee.description.includes("Sub-Total")
                          ? "bg-green-50 font-medium"
                          : ""
                      }`}
                    >
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {fee.sn}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {fee.description}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                        {fee.nd1 && `₦${fee.nd1}`}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                        {fee.nd2 && `₦${fee.nd2}`}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                        {fee.nd3 && `₦${fee.nd3}`}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        <Button className="bg-green-500 cursor-pointer hover:bg-green-500/100">Pay</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-900">
              School Fees History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
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
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white text-xs"
                          >
                            Generate Balance Invoice
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs bg-transparent"
                          >
                            <Printer className="h-3 w-3 mr-1" />
                            Print Receipt
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
