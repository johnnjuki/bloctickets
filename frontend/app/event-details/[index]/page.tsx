"use client";

import {
  ArrowLeft,
  CalendarRange,
  CircleDollarSign,
  Locate,
  Ticket,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { parseEther } from "viem";
import { useRouter } from "next/navigation";

import { blocTicketsAbi } from "@/blockchain/abi/blocTickets-abi";
import { Button } from "@/components/shared/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { convertDateFromMilliseconds } from "@/lib/utils";
import { toast } from "sonner";

export default function EventDetailsPage({
  params,
}: {
  params: { index: number };
}) {
  const router = useRouter();

  const { address, isConnected } = useAccount();

  const {
    data: event,
    isPending,
    error,
  } = useReadContract({
    address: "0x22bCf29fb2FcD789c37ac9c8FB314868b98Ef90E",
    abi: blocTicketsAbi,
    functionName: "getEvent",
    args: [BigInt(params.index)],
  });

  const {
    data: hash,
    isPending: buyTicketPending,
    error: buyTicketError,
    writeContractAsync,
  } = useWriteContract();

  async function buyTicket(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }
    try {
      const hash = await writeContractAsync({
        address: "0x22bCf29fb2FcD789c37ac9c8FB314868b98Ef90E",
        abi: blocTicketsAbi,
        functionName: "buyTicket",
        args: [BigInt(params.index)],
        value: parseEther(`${event?.[7]}`, "wei"),
      });

      if (hash) {
        console.log(hash);
        toast("You have purchased a ticket!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Purchase failed!");
      // toast.error(`${error}`);
    }
  }

  const isTicketPurchased = event?.[10].includes(address!!);

  if (isConnected && address === event?.[1]) {
    router.push(`/my-events/${event?.[0]}`);
  }

  return (
    <main>
      <section className="flex w-full flex-col gap-8 bg-gray-100 py-12 ">
        {error && (
          <div className="flex h-screen items-center justify-center">
            <p>Error fetching events, try again later</p>
          </div>
        )}

        {isPending && <Skeleton className="rounded-xl" />}
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm font-medium">
                Upcoming Event
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                {/* {event?.name} */}
                {event?.[2]}
              </h1>
              <div className="flex items-center space-x-4 text-gray-500">
                <div className="flex items-center space-x-1">
                  <div>
                    <CalendarRange className="h-5 w-5" />
                  </div>
                  <p>
                    {/* {event?.date} */}
                    {convertDateFromMilliseconds(Number(event?.[5]))}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <div>
                    <Locate className="h-5 w-5" />
                  </div>
                  {/* {event?.venue} */}
                  <p>{event?.[3]}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div>
                  <CircleDollarSign className="h-6 w-6" />
                </div>
                <p className="text-2xl font-semibold">
                  {/* {event?.price} */}
                  {event?.[7]} CELO
                </p>
              </div>
              <form onSubmit={buyTicket}>
                <Button
                  className="w-full sm:w-auto"
                  type="submit"
                  disabled={buyTicketPending || isTicketPurchased}
                >
                  <Ticket className="mr-2 h-5 w-5" />
                  {buyTicketPending
                    ? "Buying Ticket..."
                    : hash || isTicketPurchased
                      ? "You have a ticket!"
                      : "Buy Ticket"}
                </Button>
              </form>
            </div>
            <Image
              alt="Event banner"
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
                {/* {event?.description} */}
                {event?.[9]}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
