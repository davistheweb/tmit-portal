import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router";

interface HostelRecord {
  id: number;
  hostelName: string;
  room: string;
  amount: string;
  session: string;
  status: string;
  paymentDate: string;
}

export default function Hostel() {
  const navigate = useNavigate();

  const [hostelRecords] = useState<HostelRecord[]>([
    {
      id: 1,
      hostelName: "HOSTEL A",
      room: "A-205",
      amount: "₦40,000",
      session: "2024/2025",
      status: "Paid",
      paymentDate: "2024-09-15",
    },
    {
      id: 2,
      hostelName: "HOSTEL B",
      room: "B-112",
      amount: "₦40,000",
      session: "2023/2024",
      status: "Paid",
      paymentDate: "2023-10-20",
    },
    {
      id: 3,
      hostelName: "HOSTEL A",
      room: "A-308",
      amount: "₦40,000",
      session: "2022/2023",
      status: "Paid",
      paymentDate: "2022-11-05",
    },
  ]);

  const handlePrintReceipt = (record: HostelRecord) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const receiptHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Hostel Payment Receipt</title>
          <style>
            @media print {
              body { margin: 0; padding: 20px; }
              .no-print { display: none; }
            }
            body {
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #10b981;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              color: #10b981;
              margin: 10px 0;
              font-size: 24px;
            }
            .header p {
              margin: 5px 0;
              color: #666;
            }
            .receipt-details {
              margin: 20px 0;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              padding: 12px;
              border-bottom: 1px solid #e5e7eb;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: 600;
              color: #374151;
            }
            .value {
              color: #6b7280;
            }
            .amount-row {
              background-color: #f0fdf4;
              font-size: 18px;
              font-weight: bold;
              color: #10b981;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 2px solid #10b981;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
            .print-button {
              display: block;
              margin: 20px auto;
              padding: 10px 30px;
              background-color: #10b981;
              color: white;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              font-size: 16px;
            }
            .print-button:hover {
              background-color: #059669;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>TMIT    </h1>
            <p>Hostel Payment Receipt</p>
          </div>
          
          <div class="receipt-details">
            <div class="detail-row">
              <span class="label">Receipt Date:</span>
              <span class="value">${new Date().toLocaleDateString()}</span>
            </div>
            <div class="detail-row">
              <span class="label">Hostel Name:</span>
              <span class="value">${record.hostelName}</span>
            </div>
            <div class="detail-row">
              <span class="label">Academic Session:</span>
              <span class="value">${record.session}</span>
            </div>
            <div class="detail-row">
              <span class="label">Payment Date:</span>
              <span class="value">${new Date(
                record.paymentDate
              ).toLocaleDateString()}</span>
            </div>
            <div class="detail-row">
              <span class="label">Payment Status:</span>
              <span class="value">${record.status}</span>
            </div>
            <div class="detail-row amount-row">
              <span class="label">Amount Paid:</span>
              <span class="value">${record.amount}</span>
            </div>
          </div>

          <button class="print-button no-print" onclick="window.print()">Print Receipt</button>

          <div class="footer">
            <p>This is an official receipt from FUTO Hostel Management</p>
            <p>For inquiries, contact the hostel office</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(receiptHTML);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-background">
 

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Hostel Records
          </h1>
          <Button
            onClick={() => navigate("/dashboard/hostels/book-hostel")}
            className="w-full bg-emerald-600 hover:bg-emerald-700 sm:w-auto cursor-pointer"
          >
            Book Hostel
          </Button>
        </div>

        {/* Hostel History Table */}
        <div className="overflow-hidden rounded-lg border bg-white">
          <div className="border-b bg-muted/50 px-4 py-3 sm:px-6">
            <h2 className="text-base font-semibold text-foreground sm:text-lg">
              Hostel History
            </h2>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 whitespace-nowrap">S/N</TableHead>
                  <TableHead className="whitespace-nowrap">
                    Hostel Name
                  </TableHead>
                  <TableHead className="whitespace-nowrap">Amount</TableHead>
                  <TableHead className="whitespace-nowrap">Session</TableHead>
                  <TableHead className="whitespace-nowrap">Status</TableHead>
                  <TableHead className="whitespace-nowrap">
                    Payment date
                  </TableHead>
                  <TableHead className="whitespace-nowrap">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hostelRecords.length > 0 ? (
                  hostelRecords.map((record, index) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{record.hostelName}</TableCell>
                      <TableCell>{record.amount}</TableCell>
                      <TableCell>{record.session}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 sm:px-3 sm:text-sm">
                          {record.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {new Date(record.paymentDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handlePrintReceipt(record)}
                          variant="outline"
                          size="sm"
                          className="whitespace-nowrap text-xs sm:text-sm"
                        >
                          Print Receipt
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-96 text-center">
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="mb-4">
                          <svg
                            width="200"
                            height="200"
                            viewBox="0 0 200 200"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mx-auto h-32 w-32 sm:h-48 sm:w-48"
                          >
                            <ellipse
                              cx="100"
                              cy="180"
                              rx="80"
                              ry="10"
                              fill="#10b981"
                              opacity="0.2"
                            />
                            <rect
                              x="60"
                              y="80"
                              width="80"
                              height="100"
                              rx="4"
                              fill="#10b981"
                              opacity="0.3"
                            />
                            <rect
                              x="70"
                              y="90"
                              width="25"
                              height="30"
                              rx="2"
                              fill="#10b981"
                            />
                            <rect
                              x="105"
                              y="90"
                              width="25"
                              height="30"
                              rx="2"
                              fill="#10b981"
                            />
                            <rect
                              x="70"
                              y="130"
                              width="25"
                              height="30"
                              rx="2"
                              fill="#10b981"
                            />
                            <rect
                              x="105"
                              y="130"
                              width="25"
                              height="30"
                              rx="2"
                              fill="#10b981"
                            />
                            <circle cx="150" cy="60" r="30" fill="#fef3c7" />
                            <circle cx="150" cy="90" r="25" fill="#fde68a" />
                            <circle cx="150" cy="115" r="20" fill="#fcd34d" />
                            <path
                              d="M140 50 Q145 45 150 50 Q155 45 160 50"
                              stroke="#92400e"
                              strokeWidth="2"
                              fill="none"
                            />
                            <circle cx="145" cy="55" r="2" fill="#92400e" />
                            <circle cx="155" cy="55" r="2" fill="#92400e" />
                            <path
                              d="M145 62 Q150 65 155 62"
                              stroke="#92400e"
                              strokeWidth="2"
                              fill="none"
                            />
                            <rect
                              x="30"
                              y="140"
                              width="15"
                              height="40"
                              rx="7.5"
                              fill="#10b981"
                            />
                            <rect
                              x="20"
                              y="150"
                              width="35"
                              height="30"
                              rx="4"
                              fill="#10b981"
                              opacity="0.5"
                            />
                          </svg>
                        </div>
                        <p className="text-sm text-muted-foreground sm:text-base">
                          No hostel records found
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}
