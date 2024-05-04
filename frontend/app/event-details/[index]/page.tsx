"use client";

import { ArrowLeft, CalendarRange, Locate, Ticket } from "lucide-react";
import Image from "next/image";
import { useReadContract } from "wagmi";
import { useRouter } from "next/navigation";

import { ticketopiaAbi } from "@/blockchain/abi/ticketopia-abi";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function EventDetailsPage({
  params,
}: {
  params: { index: number };
}) {
  const router = useRouter();

  const {
    data: event,
    isPending,
    error,
  } = useReadContract({
    address: "0xAc6EAbE774C25F984E3dB85d84FcE27b3A7247eB",
    abi: ticketopiaAbi,
    functionName: "getEvent",
    args: [BigInt(params.index)],
  });

  return (
    <>
      <section className="flex w-full flex-col gap-8 bg-gray-100 py-12 dark:bg-gray-800">
        <Link href={"/events"}>
          <ArrowLeft className="mx-4 h-10 w-10 text-gray-500 dark:text-gray-400" />
        </Link>
        {error && (
          <div className="flex h-screen items-center justify-center">
            <p>Error fetching events, try again later</p>
          </div>
        )}

        {isPending && (
          <div className="flex flex-1 items-center justify-center gap-6">
            <Skeleton className="rounded-xl" />
            <Skeleton className="rounded-xl" />
          </div>
        )}
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm font-medium dark:bg-gray-700">
                Upcoming Event
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                {event?.name}
              </h1>
              <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                <div>
                  <CalendarRange className="mr-1 inline-block h-5 w-5" />
                  {event?.date}
                </div>
                <div>
                  <Locate className="mr-1 inline-block h-5 w-5" />
                  {event?.venue}
                </div>
              </div>
              <div className="text-4xl font-bold">KES {event?.price}</div>
              <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label className="text-base font-medium" htmlFor="tickets">
                    Number of Tickets
                  </Label>
                  <Input
                    id="tickets"
                    type="number"
                    name="tickets"
                    required
                    defaultValue={1}
                  />
                </div>
                <Button className="w-full sm:w-auto">
                  <Ticket className="mr-2 h-5 w-5" />
                  Buy Tickets
                </Button>
              </div>
            </div>
            <Image
              alt="Event Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
              height="400"
              src="/static/images/concert/concert-3.jpg"
              width="600"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                About the Event
              </h2>
              <p className="max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                {event?.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
