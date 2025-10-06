import { StudentProfile } from "./_components/StudentProfile";
import { FinancialSummary } from "./_components/FinancialSummary";
import { AcademicSummary } from "./_components/AcademicSummary";
// import { NotificationCenter } from "./_components/NotificationCenter";
// import { DashboardHeader } from "../components/dashboard-header";

export default function DashboardIndex() {
  return (
    <div className="min-h-screen bg-background">
      {/* <DashboardHeader /> */}

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Profile Section */}
          <div className="lg:col-span-3">
            <StudentProfile />
          </div>

          {/* Main Dashboard Content */}
          <div className="lg:col-span-9 space-y-6">
            {/* Financial Summary - Most Important */}
            <FinancialSummary />

            {/* Academic Summary */}
            <AcademicSummary />

            {/* Notification Center */}
            {/* <NotificationCenter /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
