"use client";

import Link from "next/link";
import { useAccount, useReadContract } from "wagmi";

import { blocTicketsAbi } from "@/blockchain/abi/blocTickets-abi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { convertDateFromMilliseconds } from "@/lib/utils";
import { CalendarIcon, MapPinIcon, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function MyEventsPage() {
  const { address, isConnected } = useAccount();

  const {
    data: events,
    isPending,
    error,
  } = useReadContract({
    address: "0x22bCf29fb2FcD789c37ac9c8FB314868b98Ef90E",
    abi: blocTicketsAbi,
    functionName: "getEventsByOrganizer",
    args: [address!!],
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!isConnected) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Please connect your wallet</p>
      </div>
    );
  }

  // TODO: Add logo

  return (
    <main className="flex flex-col">
      <div className="flex-1 px-4 py-8 md:px-6 lg:px-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Your Events</h1>
          <Link
            href="create-event"
            className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          >
            Create Event
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events?.length === 0 && (
            <div className="flex h-screen items-center justify-center">
              <p>No events found</p>
            </div>
          )}
          {error && (
            <div className="flex h-screen items-center justify-center">
              <p>
                Error fetching events, connect wallet if not connected and try
                again
                {error.message}
              </p>
            </div>
          )}

          {isPending ? (
            <Skeleton className="h-[250px] w-[250px] rounded-xl" />
          ) : (
            events?.map((event: any) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle>{event.name}</CardTitle>
                  <CardDescription className="flex flex-col items-start gap-2">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-500">
                        {convertDateFromMilliseconds(Number(event.date))}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-500">{event.venue}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-500">
                        {event.ticketHolders.length}{" "}
                        {event.ticketHolders.length === 1
                          ? "attendee"
                          : "attendees"}
                      </span>
                    </div>
                    <Link href={`/my-events/${event.id}`}>
                      <Button variant="outline" size="sm">
                        View Event
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
