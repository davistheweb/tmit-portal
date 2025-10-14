import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router";

const hostels = [
  {
    id: "A",
    name: "HOSTEL A",
    location: "-",
    rooms: 73,
    beds: 577,
    gender: "Male",
    priceMin: 40000,
    priceMax: 40000,
  },
  {
    id: "B",
    name: "HOSTEL B",
    location: "-",
    rooms: 82,
    beds: 656,
    gender: "Male",
    priceMin: 40000,
    priceMax: 40000,
  },
  {
    id: "C",
    name: "HOSTEL C",
    location: "-",
    rooms: 65,
    beds: 520,
    gender: "Female",
    priceMin: 40000,
    priceMax: 40000,
  },
  {
    id: "D",
    name: "HOSTEL D",
    location: "-",
    rooms: 90,
    beds: 720,
    gender: "Female",
    priceMin: 40000,
    priceMax: 40000,
  },
];

export default function BookHostel() {
  const navigate = useNavigate();

  const handleSelect = (hostelId: string) => {
    console.log("[v0] Selected hostel:", hostelId);
    // Add your selection logic here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <button
            onClick={() => navigate("/dashboard/hostels")}
            className="hover:text-foreground"
          >
            Hostel
          </button>
          <span>/</span>
          <span className="text-foreground">Book Hostel</span>
        </nav>

        <h1 className="mb-8 text-2xl font-bold text-foreground sm:text-3xl">
          Book Hostel
        </h1>

        {/* Select Hostel Section */}
        <div className="rounded-lg border bg-white">
          <div className="border-b bg-muted/50 px-4 py-3 sm:px-6">
            <h2 className="text-base font-semibold text-foreground sm:text-lg">
              Select Hostel
            </h2>
          </div>

          <div className="space-y-4 p-4 sm:p-6">
            {hostels.map((hostel) => (
              <Card
                key={hostel.id}
                className="overflow-hidden border-2 transition-all hover:border-emerald-200 hover:shadow-md"
              >
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  {/* Left Section - Icon and Details */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                    {/* Hostel Icon */}
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border-2 border-muted bg-muted/30 sm:h-20 sm:w-20">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-muted-foreground sm:h-12 sm:w-12"
                      >
                        <rect
                          x="8"
                          y="12"
                          width="32"
                          height="28"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <rect
                          x="12"
                          y="16"
                          width="6"
                          height="6"
                          rx="1"
                          fill="currentColor"
                        />
                        <rect
                          x="21"
                          y="16"
                          width="6"
                          height="6"
                          rx="1"
                          fill="currentColor"
                        />
                        <rect
                          x="30"
                          y="16"
                          width="6"
                          height="6"
                          rx="1"
                          fill="currentColor"
                        />
                        <rect
                          x="12"
                          y="25"
                          width="6"
                          height="6"
                          rx="1"
                          fill="currentColor"
                        />
                        <rect
                          x="21"
                          y="25"
                          width="6"
                          height="6"
                          rx="1"
                          fill="currentColor"
                        />
                        <rect
                          x="30"
                          y="25"
                          width="6"
                          height="6"
                          rx="1"
                          fill="currentColor"
                        />
                        <path
                          d="M18 40 L18 34 C18 32.8954 18.8954 32 20 32 L28 32 C29.1046 32 30 32.8954 30 34 L30 40"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>

                    {/* Hostel Details */}
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-bold text-foreground sm:text-xl">
                        {hostel.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{hostel.location}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground sm:gap-4">
                        <div className="flex items-center gap-1.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                            <path d="M12 3v6" />
                          </svg>
                          <span className="font-medium">{hostel.rooms}</span>
                          <span>rooms</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M2 4v16" />
                            <path d="M2 8h18a2 2 0 0 1 2 2v10" />
                            <path d="M2 17h20" />
                            <path d="M6 8v9" />
                          </svg>
                          <span className="font-medium">{hostel.beds}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          <span className="font-medium">{hostel.gender}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Price and Button */}
                  <div className="flex flex-row items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center">
                    <div className="text-left sm:text-right">
                      <p className="text-lg font-bold text-foreground sm:text-xl">
                        ₦{hostel.priceMin.toLocaleString()} - ₦
                        {hostel.priceMax.toLocaleString()}
                        <span className="text-sm font-normal text-muted-foreground">
                          /room
                        </span>
                      </p>
                    </div>
                    <Button
                      onClick={() => handleSelect(hostel.id)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 sm:w-32 cursor-pointer"
                    >
                      Book
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
