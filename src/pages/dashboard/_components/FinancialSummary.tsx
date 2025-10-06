import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function FinancialSummary() {
  const totalFees = 250000;
  const amountPaid = 100500;
  const balance = totalFees - amountPaid;
  const percentagePaid = (amountPaid / totalFees) * 100;

  return (
    <Card className="border-success/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              Financial Summary
            </CardTitle>
            <CardDescription>
              Semester fee breakdown and payment status
            </CardDescription>
          </div>
          {balance > 0 && (
            <div className="flex items-center gap-2 text-warning bg-warning/10 px-3 py-1.5 rounded-md">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Payment Due</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Total Fees (Semester)
            </p>
            <p className="text-3xl font-bold">₦{totalFees.toLocaleString()}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Amount Paid
              <TrendingUp className="h-3 w-3 text-success" />
            </p>
            <p className="text-3xl font-bold text-success">
              ₦{amountPaid.toLocaleString()}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Balance Owed</p>
            <p className="text-3xl font-bold text-destructive">
              ₦{balance.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Payment Progress</span>
            <span className="font-medium">
              {percentagePaid.toFixed(1)}% Complete
            </span>
          </div>
          <Progress value={percentagePaid} className="h-3" />
        </div>

        <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/20">
          <p className="text-sm font-medium">
            Complete your payment before the deadline to avoid late fees and
            registration issues.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
