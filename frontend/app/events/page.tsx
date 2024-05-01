"use client";

import { ticketopiaAbi } from "@/blockchain/abi/ticketopia-abi";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useReadContract } from "wagmi";

export default function EventsPage() {
  const {
    data: events,
    isPending,
    error,
  } = useReadContract({
    address: "0xd5AcB550fA8E975B8C327cd3E6d1520306861f15",
    abi: ticketopiaAbi,
    functionName: "getAllEvents",
  });

  // TODO: Display nicely
  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16 lg:py-20">
        <div className="space-y-6 md:space-y-8 lg:space-y-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Upcoming Events
            </h1>
            <div className="flex items-center space-x-4">
              <Button size="sm" variant="outline">
                All
              </Button>
              <Button size="sm" variant="outline">
                Tech
              </Button>
              <Button size="sm" variant="outline">
                Design
              </Button>
              <Button size="sm" variant="outline">
                Marketing
              </Button>
              <Button size="sm" variant="outline">
                Startup
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-10">
            {events?.map((event, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg dark:bg-gray-900"
              >
                <Image
                  alt="Event 1"
                  className="h-48 w-full object-cover"
                  height="200"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/200",
                    objectFit: "cover",
                  }}
                  width="300"
                />
                <div className="p-4 md:p-6">
                  <h3 className="mb-2 text-lg font-semibold md:text-xl">
                    {event.eventName}
                  </h3>
                  <div className="mb-3 flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <p className="text-gray-500 dark:text-gray-400">
                      {event.date}
                    </p>
                  </div>
                  <div className="mb-3 flex items-center space-x-2">
                    <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <p className="text-gray-500 dark:text-gray-400">
                      {event.time}
                    </p>
                  </div>
                  {/* <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                    {event.description}
                  </p> */}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Button>View More Events</Button>
          </div>
        </div>
      </section>
    </main>
  );
}

function CalendarIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function ClockIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
