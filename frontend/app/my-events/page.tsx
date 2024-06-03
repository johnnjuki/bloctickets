"use client";

import Link from "next/link";
import { useAccount, useReadContract } from "wagmi";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, UserIcon } from "lucide-react";
import { Header } from "@/components/header";
import { blocTicketsAbi } from "@/blockchain/abi/blocTickets-abi";

export default function Component() {
  const { address, isConnected } = useAccount();

  if (address) {
    const {
      data: events,
      isPending,
      error,
    } = useReadContract({
      address: "0x7D460fa04fC38DD7599D25C240801B0B0c4DeDC0",
      abi: blocTicketsAbi,
      functionName: "getEventsByOrganizer",
      args: [address],
    });
  }

  if (!isConnected) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Please connect your wallet</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1 px-4 py-8 md:px-6 lg:px-10">
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
          <Card>
            <CardHeader>
              <CardTitle>Tech Conference 2023</CardTitle>
              <CardDescription>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-500">June 15, 2023</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-500">San Francisco, CA</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-500">1,200 attendees</span>
                </div>
                <Button variant="outline" size="sm">
                  View Event
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
