import { useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { paymentService, dummySessions } from "@/api/services/PaymentService";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ExternalLink } from "lucide-react";
import { toast } from "sonner";
// import { format } from "date-fns";

// interface Session {
//   id: number;
//   name: string;
//   start_date: string;
//   end_date: string;
//   is_active: boolean;
//   created_at: string;
//   updated_at: string;
// }

interface InitiatePaymentRequest {
  student_id: number;
  session_id: number;
  level: number;
  payment_type: "full" | "installment_first" | "installment_second";
}

interface InitiatePaymentResponse {
  message: string;
  payment: {
    id: number;
    student_id: number;
    fee_structure_id: number;
    session_id: number;
    reference: string;
    amount: string;
    payment_type: "full" | "installment_first" | "installment_second";
    status: "pending";
    created_at: string;
    updated_at: string;
    fee_structure?: {
      id: number;
      description: string;
      session: { id: number; name: string };
    };
  };
  paystack: {
    status: boolean;
    message: string;
    data: {
      authorization_url: string;
      access_code: string;
      reference: string;
    };
  };
}

export default function PaymentPage() {
  const { user } = useAuth();
  const [sessionId, setSessionId] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [paymentType, setPaymentType] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paymentResponse, setPaymentResponse] =
    useState<InitiatePaymentResponse | null>(null);

  const sessions = dummySessions.filter((session) => session.is_active);
  const levels = [
    { label: "ND1", value: "100" },
    { label: "ND2", value: "200" },
    { label: "ND3", value: "300" },
  ];
  const paymentTypes = [
    { label: "Full", value: "full" },
    { label: "First Installment", value: "installment_first" },
    { label: "Second Installment", value: "installment_second" },
  ];

  const formatCurrency = (amount: string | number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(Number(amount));
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

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!user?.id) {
        setError("Please log in to initiate payment");
        toast.error("Please log in to initiate payment");
        return;
      }
      if (!sessionId || !level || !paymentType) {
        setError("Please select session, level, and payment type");
        toast.error("Please select session, level, and payment type");
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const payload: InitiatePaymentRequest = {
          student_id: user.id,
          session_id: Number(sessionId),
          level: Number(level),
          payment_type: paymentType as
            | "full"
            | "installment_first"
            | "installment_second",
        };
        const response = await paymentService.initiatePayment(payload);
        setPaymentResponse(response);
        setDialogOpen(true);
        toast.success("Payment initiated successfully");
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to initiate payment";
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    },
    [user?.id, sessionId, level, paymentType]
  );

  const handleProceedToPayment = () => {
    if (paymentResponse?.paystack?.data?.authorization_url) {
      window.open(paymentResponse.paystack.data.authorization_url, "_blank");
    } else {
      toast.error("No payment URL available");
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Initiate Payment
          </h1>
          <p className="text-sm text-gray-500">
            Select session, level, and payment type to start your payment
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Form */}
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="session">Academic Session</Label>
                <Select value={sessionId} onValueChange={setSessionId}>
                  <SelectTrigger id="session" className="w-full">
                    <SelectValue placeholder="Select session" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessions.map((session) => (
                      <SelectItem
                        key={session.id}
                        value={session.id.toString()}
                      >
                        {session.name}
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
                      <SelectItem key={lvl.value} value={lvl.value}>
                        {lvl.label}
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
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Initiate Payment"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Payment Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
              <DialogDescription>
                Review your payment information
              </DialogDescription>
            </DialogHeader>
            {paymentResponse && (
              <div className="space-y-4">
                <div>
                  <span className="font-semibold">Reference: </span>
                  {paymentResponse.payment.reference}
                </div>
                <div>
                  <span className="font-semibold">Description: </span>
                  {paymentResponse.payment.fee_structure?.description || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Session: </span>
                  {paymentResponse.payment.fee_structure?.session?.name ||
                    "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Amount: </span>
                  <span className="text-green-600 font-semibold">
                    {formatCurrency(paymentResponse.payment.amount)}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Payment Type: </span>
                  {paymentResponse.payment.payment_type
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </div>
                <div>
                  <span className="font-semibold">Status: </span>
                  <span
                    className={getStatusColor(paymentResponse.payment.status)}
                  >
                    {paymentResponse.payment.status.charAt(0).toUpperCase() +
                      paymentResponse.payment.status.slice(1)}
                  </span>
                </div>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                  onClick={handleProceedToPayment}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Proceed to Payment
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
