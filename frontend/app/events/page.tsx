"use client";

import Image from "next/image";
import Link from "next/link";
import { useReadContract } from "wagmi";

import { ticketopiaAbi } from "@/blockchain/abi/ticketopia-abi";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, CircleDollarSign, Clock, DollarSign } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function EventsPage() {
  const {
    data: events,
    isPending,
    error,
  } = useReadContract({
    address: "0xAc6EAbE774C25F984E3dB85d84FcE27b3A7247eB",
    abi: ticketopiaAbi,
    functionName: "getAllEvents",
  });

  const skeletons = [
    <Skeleton className="h-[250px] w-[250px] rounded-xl" />,
    <Skeleton className="h-[250px] w-[250px] rounded-xl" />,
    <Skeleton className="h-[250px] w-[250px] rounded-xl" />,
    <Skeleton className="h-[250px] w-[250px] rounded-xl" />,
  ];

  // TODO: Display nicely
  if (error) return <div>Error: {error.message}</div>;

  // TODO: Show price

  return (
    <main className="flex flex-col">
      <Header />
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16 lg:py-20">
        <div className="space-y-6 md:space-y-8 lg:space-y-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Upcoming Events
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-10">
            {events?.length === 0 && (
              <div className="flex h-screen items-center justify-center">
                <p>Error fetching events, try again later</p>
              </div>
            )}
            {error && (
              <div className="flex h-screen items-center justify-center">
                <p>Error fetching events, try again later</p>
              </div>
            )}
            {isPending
              ? skeletons.map((skeleton, index) => (
                  <div key={index}>{skeleton}</div>
                ))
              : events?.map((event, index) => (
                  <Link href={`/event-details/${index}`} key={index}>
                    <div
                      key={index}
                      className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg dark:bg-gray-900"
                    >
                      {/* TODO: Replace with users uploaded image */}
                      <Image
                        alt="Event 1"
                        className="h-48 w-full object-cover"
                        height="200"
                        src="/static/images/concert/concert-1.jpg"
                        style={{
                          aspectRatio: "300/200",
                          objectFit: "cover",
                        }}
                        width="300"
                      />
                      <div className="p-4 md:p-6">
                        <h3 className="mb-2 text-lg font-semibold md:text-xl">
                          {event.name}
                        </h3>
                        <div className="mb-3 flex items-center space-x-2">
                          <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                          <p className="text-gray-500 dark:text-gray-400">
                            {event.date}
                          </p>
                        </div>
                        <div className="mb-3 flex items-center space-x-2">
                          <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                          <p className="text-gray-500 dark:text-gray-400">
                            {event.time}
                          </p>
                        </div>
                        <div className="mb-3 flex items-center space-x-2">
                          <CircleDollarSign className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                          <p className="text-gray-500 dark:text-gray-400">
                            {event.price}
                          </p>
                        </div>

                        <p className="line-clamp-2 text-gray-600 dark:text-gray-300">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </section>
      <Footer showText={false} />
    </main>
  );
}
