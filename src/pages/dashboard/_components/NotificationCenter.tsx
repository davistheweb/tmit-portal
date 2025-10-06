import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell, CheckCircle2, Clock, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function NotificationCenter() {
  const notifications = [
    {
      id: 1,
      type: "deadline",
      title: "Course Registration Deadline",
      message: "Complete your course registration before March 15, 2024",
      date: "2 days left",
      icon: Clock,
      variant: "warning" as const,
    },
    {
      id: 2,
      type: "approval",
      title: "Fee Payment Approved",
      message: "Your partial payment of ₦100,500 has been confirmed",
      date: "1 day ago",
      icon: CheckCircle2,
      variant: "success" as const,
    },
    {
      id: 3,
      type: "notice",
      title: "Department Notice",
      message:
        "All 100 level students are required to attend the orientation program on March 20",
      date: "3 days ago",
      icon: Info,
      variant: "default" as const,
    },
    {
      id: 4,
      type: "deadline",
      title: "Outstanding Balance",
      message:
        "Please clear your outstanding balance of ₦149,500 to avoid registration issues",
      date: "5 days ago",
      icon: Clock,
      variant: "destructive" as const,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Bell className="h-6 w-6 text-success" />
          Notification Center
        </CardTitle>
        <CardDescription>
          Important notices, approvals, and deadlines
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div
                  className={`p-2 rounded-full ${
                    notification.variant === "success"
                      ? "bg-success/10 text-success"
                      : notification.variant === "warning"
                        ? "bg-warning/10 text-warning"
                        : notification.variant === "destructive"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-balance leading-tight">
                      {notification.title}
                    </h4>
                    <Badge
                      variant="outline"
                      className="text-xs whitespace-nowrap"
                    >
                      {notification.date}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground text-pretty">
                    {notification.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <button className="text-sm text-success hover:underline font-medium">
            View All Notifications →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
