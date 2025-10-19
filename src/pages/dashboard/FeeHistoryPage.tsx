// src/pages/dashboard/FeeHistoryPage.tsx
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { paymentService } from "@/api/services/PaymentService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Eye,
  Printer,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface FeeHistory {
  id: number;
  student_id: number;
  fee_structure_id: number;
  reference: string;
  amount: string;
  status: "successful" | "pending" | "failed";
  gateway_response: string | null;
  payment_method: string | null;
  currency: string;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
  session_id: number;
  payment_type: "full" | "installment_first" | "installment_second";
  fee_structure: {
    id: number;
    amount: string;
    description: string;
    session_id: number;
    department_id: number;
    level: number;
    installment_first: string | null;
    installment_second: string | null;
    allow_installment: boolean;
    department: { id: number; name: string };
    session: { id: number; name: string };
  };
  session: { id: number; name: string };
}

interface PaymentStatus extends FeeHistory {
  student?: {
    id: number;
    reg_number: string;
    name: string;
    email: string;
    status: string;
    department_id: number;
    current_level: number | null;
  };
}

// interface FeeHistoryResponse {
//   current_page: number;
//   data: FeeHistory[];
//   last_page: number;
//   total: number;
// }

export default function FeeHistoryPage() {
  const { user } = useAuth();
  const [feeHistory, setFeeHistory] = useState<FeeHistory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentStatus | null>(
    null
  );

  const fetchHistory = useCallback(async () => {
    if (!user?.id) {
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await paymentService.getFeeHistory(user.id, currentPage);
      setFeeHistory(response.data || []); // Fallback to empty array
      setTotalPages(response.last_page || 1); // Fallback to 1
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch fee history";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, currentPage]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleViewStatus = async (reference: string) => {
    if (!user?.id) {
      toast.error("Please log in to view payment status");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const paymentStatus = await paymentService.getPaymentStatus(
        reference,
        user.id
      );
      setSelectedPayment(paymentStatus);
      setStatusDialogOpen(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch payment status";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatCurrency = (amount: string | number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(Number(amount));
  };

  const formatDate = (date: string | null) => {
    if (!date) return "N/A";
    return format(new Date(date), "MMM d, yyyy h:mm a");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "successful":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "failed":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const handlePrint = () => {
    toast.info("Print functionality not implemented yet!");
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Fee Payment History
            </h1>
            <p className="text-sm text-gray-500">
              View your fee payment history and status
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Fee History Display */}
        <Card>
          <CardContent className="p-0 sm:p-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8 gap-2">
                <div className="h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-600">Loading fee history...</p>
              </div>
            ) : feeHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <p>No fee payment history found.</p>
              </div>
            ) : (
              <>
                {/* Mobile: Cards */}
                <div className="block lg:hidden px-4 sm:px-6 pb-6">
                  <div className="space-y-4">
                    {feeHistory.map((payment) => (
                      <Card key={payment.id} className="border shadow-sm">
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">
                                {payment.fee_structure?.description || "N/A"}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleViewStatus(payment.reference)
                                }
                                disabled={isLoading}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="text-sm text-gray-500">
                              Reference: {payment.reference}
                            </div>
                            <div className="text-sm text-gray-500">
                              Session: {payment.session?.name || "N/A"}
                            </div>
                            <div className="text-sm text-gray-500">
                              Department:{" "}
                              {payment.fee_structure?.department?.name || "N/A"}
                            </div>
                            <div className="text-sm text-gray-500">
                              Level: {payment.fee_structure?.level || "N/A"}
                            </div>
                            <div className="text-lg font-bold text-green-600">
                              {formatCurrency(payment.amount)}
                            </div>
                            <div className="text-sm text-gray-500">
                              Status:{" "}
                              <span className={getStatusColor(payment.status)}>
                                {payment.status.charAt(0).toUpperCase() +
                                  payment.status.slice(1)}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500">
                              Paid At: {formatDate(payment.paid_at)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Desktop: Table */}
                <div className="hidden lg:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Reference</TableHead>
                        <TableHead>Session</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Paid At</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {feeHistory.map((payment) => (
                        <TableRow key={payment.id} className="hover:bg-gray-50">
                          <TableCell>
                            {payment.fee_structure?.description || "N/A"}
                          </TableCell>
                          <TableCell>{payment.reference}</TableCell>
                          <TableCell>
                            {payment.session?.name || "N/A"}
                          </TableCell>
                          <TableCell>
                            {payment.fee_structure?.department?.name || "N/A"}
                          </TableCell>
                          <TableCell>
                            {payment.fee_structure?.level || "N/A"}
                          </TableCell>
                          <TableCell className="text-green-600 font-semibold">
                            {formatCurrency(payment.amount)}
                          </TableCell>
                          <TableCell>
                            <span className={getStatusColor(payment.status)}>
                              {payment.status.charAt(0).toUpperCase() +
                                payment.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell>{formatDate(payment.paid_at)}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleViewStatus(payment.reference)
                              }
                              disabled={isLoading}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || isLoading}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <span className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || isLoading}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Payment Status Dialog */}
        <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Payment Status</DialogTitle>
              <DialogDescription>
                Details of the selected payment
              </DialogDescription>
            </DialogHeader>
            {selectedPayment && (
              <div className="space-y-4">
                <div>
                  <span className="font-semibold">Student Name: </span>
                  {selectedPayment.student?.name ?? "Student info unavailable"}
                </div>
                <div>
                  <span className="font-semibold">Registration Number: </span>
                  {selectedPayment.student?.reg_number ?? "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Description: </span>
                  {selectedPayment.fee_structure?.description || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Reference: </span>
                  {selectedPayment.reference}
                </div>
                <div>
                  <span className="font-semibold">Session: </span>
                  {selectedPayment.session?.name || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Department: </span>
                  {selectedPayment.fee_structure?.department?.name || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Level: </span>
                  {selectedPayment.fee_structure?.level || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Amount: </span>
                  <span className="text-green-600 font-semibold">
                    {formatCurrency(selectedPayment.amount)}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Status: </span>
                  <span className={getStatusColor(selectedPayment.status)}>
                    {selectedPayment.status.charAt(0).toUpperCase() +
                      selectedPayment.status.slice(1)}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Paid At: </span>
                  {formatDate(selectedPayment.paid_at)}
                </div>
                {selectedPayment.status === "successful" && (
                  <Button
                    variant="outline"
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                    onClick={handlePrint}
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print Receipt
                  </Button>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
