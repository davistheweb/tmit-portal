import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useNavigate } from "react-router"

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
]

export default function BookHostel() {
  const navigate = useNavigate()

  const handleSelect = (hostelId: string) => {
    console.log("[v0] Selected hostel:", hostelId)
    // Add your selection logic here
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8">
        <nav className="mb-4 flex items-center gap-1.5 text-xs sm:mb-6 sm:gap-2 sm:text-sm text-muted-foreground">
          <button onClick={() => navigate("/dashboard/hostels")} className="hover:text-foreground transition-colors">
            Hostel
          </button>
          <span>/</span>
          <span className="text-foreground">Book Hostel</span>
        </nav>

        <h1 className="mb-4 text-xl font-bold text-foreground sm:mb-6 sm:text-2xl md:mb-8 md:text-3xl lg:text-4xl">
          Book Hostel
        </h1>

        {/* Select Hostel Section */}
        <div className="rounded-lg border bg-white shadow-sm">
          <div className="border-b bg-muted/50 px-3 py-2.5 sm:px-4 sm:py-3 md:px-6">
            <h2 className="text-sm font-semibold text-foreground sm:text-base md:text-lg">Select Hostel</h2>
          </div>

          <div className="space-y-3 p-3 sm:space-y-4 sm:p-4 md:p-6">
            {hostels.map((hostel) => (
              <Card
                key={hostel.id}
                className="overflow-hidden border-2 transition-all hover:border-emerald-200 hover:shadow-md"
              >
                <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:p-6">
                  {/* Icon and Details Section */}
                  <div className="flex flex-col gap-3 xs:flex-row xs:items-start xs:gap-4 lg:flex-1 lg:gap-5">
                    {/* Hostel Icon */}
                    <div className="mx-auto flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border-2 border-muted bg-muted/30 xs:mx-0 sm:h-20 sm:w-20 lg:h-24 lg:w-24">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-muted-foreground sm:h-12 sm:w-12 lg:h-14 lg:w-14"
                      >
                        <rect x="8" y="12" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="2" />
                        <rect x="12" y="16" width="6" height="6" rx="1" fill="currentColor" />
                        <rect x="21" y="16" width="6" height="6" rx="1" fill="currentColor" />
                        <rect x="30" y="16" width="6" height="6" rx="1" fill="currentColor" />
                        <rect x="12" y="25" width="6" height="6" rx="1" fill="currentColor" />
                        <rect x="21" y="25" width="6" height="6" rx="1" fill="currentColor" />
                        <rect x="30" y="25" width="6" height="6" rx="1" fill="currentColor" />
                        <path
                          d="M18 40 L18 34 C18 32.8954 18.8954 32 20 32 L28 32 C29.1046 32 30 32.8954 30 34 L30 40"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>

                    {/* Hostel Details */}
                    <div className="flex-1 space-y-2 text-center xs:text-left">
                      <h3 className="text-lg font-bold text-foreground sm:text-xl lg:text-2xl">{hostel.name}</h3>
                      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground xs:justify-start sm:text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{hostel.location}</span>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground xs:justify-start sm:gap-4 sm:text-sm">
                        <div className="flex items-center gap-1.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3.5 w-3.5 sm:h-4 sm:w-4"
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
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                          >
                            <path d="M2 4v16" />
                            <path d="M2 8h18a2 2 0 0 1 2 2v10" />
                            <path d="M2 17h20" />
                            <path d="M6 8v9" />
                          </svg>
                          <span className="font-medium">{hostel.beds}</span>
                          <span>beds</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                          >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          <span className="font-medium">{hostel.gender}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price and Button Section - Stacks on mobile, side by side on tablet, column on desktop */}
                  <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between lg:w-auto lg:flex-col lg:items-end lg:border-t-0 lg:pt-0">
                    <div className="text-center sm:text-left lg:text-right">
                      <p className="text-lg font-bold text-foreground sm:text-xl lg:text-2xl">
                        ₦{hostel.priceMin.toLocaleString()} - ₦{hostel.priceMax.toLocaleString()}
                      </p>
                      <span className="text-xs font-normal text-muted-foreground sm:text-sm">/room</span>
                    </div>
                    <Button
                      onClick={() => handleSelect(hostel.id)}
                      className="min-h-[48px] w-full bg-emerald-600 px-8 text-sm font-medium hover:bg-emerald-700 sm:w-auto sm:min-w-[140px] lg:w-full lg:min-w-[160px]"
                    >
                      Select
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
