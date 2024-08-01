"use client";

import {
  CalendarRange,
  CircleDollarSign,
  MapPin,
  Ticket
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { parseEther } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import {processCheckout} from "@/lib/TokenFuction";
import { blocTicketsAbi , contractAddress} from "@/blockchain/abi/blocTickets-abi";
import { Header } from "@/components/header";
import { Button } from "@/components/shared/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getExchangeRate } from "@/lib/get-exchange-rate";
import { convertDateFromMilliseconds } from "@/lib/utils";
import { toast } from "sonner";

export default function EventDetailsPage({
  params,
}: {
  params: { index: number };
}) {
  const router = useRouter();

  const { address, isConnected } = useAccount();
  const [cid, setCid] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const {
    data: event,
    isPending,
    error,
  } = useReadContract({
    address: contractAddress,
    abi: blocTicketsAbi,
    functionName: "getEvent",
    args: [BigInt(params.index)],
  });
  console.log(event);

  const {
    data: hash,
    isPending: buyTicketPending,
    error: buyTicketError,
    writeContractAsync,
  } = useWriteContract();

  const {
    data: mintTicketHash,
    isPending: mintTicketPending,
    error: ticketsError,
    writeContractAsync: mintTicketAsync,
  } = useWriteContract();

  async function buyTicket(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }

    if (!event) {
      return;
    }

    if (address === event?.[1]) {
      toast("You cannot buy your own ticket!", {
        description: "Go to the event dahsboard instead.",
        action: {
          label: "Go",
          onClick: () => router.push(`/my-events/${event?.[0]}`),
        },
      });

      return;
    }

    try {
      // const exchangeRate = await getExchangeRate();
      // const priceInCELO = parseFloat(event?.[7]) / exchangeRate;
      // console.log(priceInCELO);
      const paid = await processCheckout(event?.[1] as `0x{string}`, Number(event?.[7]));

      if (paid){

        const hash = await writeContractAsync({
          address: contractAddress,
          abi: blocTicketsAbi,
          functionName: "buyTicket",
          args: [BigInt(params.index)],
          
        });
  
        if (hash) {
          toast("You have purchased a ticket!");
          try {
            setIsUploading(true);
            const ticketNumber = event?.[10]?.length + 1;
            const nftImage = createEventImage(
              event?.[2],
              event?.[3],
              convertDateFromMilliseconds(Number(event?.[5])),
              event?.[6],
              ticketNumber,
            );
            console.log(nftImage);
    
            const blob = await (await fetch(nftImage)).blob();
    
            const data = new FormData();
            data.set("file", blob);
            const res = await fetch("/api/files", {
              method: "POST",
              body: data,
            });
            const resData = await res.json();
            setCid(resData.IpfsHash);
    
            const hash = await mintTicketAsync({
              address: contractAddress,
              abi: blocTicketsAbi,
              functionName: "mintTicketNft",
              args: [BigInt(params.index), resData.IpfsHash],
            });
    
            if (hash) {
              toast("Ticket NFT minted!");
              setIsUploading(false);
              router.push(`/tickets/${event?.[0]}`);
            
            }
          } catch (error) {
            setIsUploading(false);
            toast.error("Minting Ticket NFT failed!");
            console.log(error);
            return;
          }
        }

      }else{
        toast("make sure you have the amount");
      }
    
    } catch (error) {
      console.log(error);
      toast.error("Purchase failed!");
      toast.error(`${error}`);
    }
  }

  const isTicketPurchased = event?.[11].includes(address!!);

  function createEventImage(
    eventName: string,
    venue: string,
    date: string,
    time: string,
    number: number,
    width = 600,
    height = 400,
  ) {
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Could not get canvas context");
    }

    canvas.width = width;
    canvas.height = height;

    const gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      100,
      width / 2,
      height / 2,
      width,
    );
    gradient.addColorStop(0, "#ff7f50");
    gradient.addColorStop(0.5, "#6a5acd");
    gradient.addColorStop(1, "#1e90ff");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.shadowColor = "#000000";
    ctx.shadowBlur = 20;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 10;
    ctx.strokeRect(0, 0, width, height);
    ctx.shadowBlur = 0; 

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 24pt Arial"; 
    ctx.shadowColor = "#000000";
    ctx.shadowBlur = 10;
    ctx.fillText(eventName, 50, 100);
    ctx.font = "16pt Arial"; 
    ctx.fillText(`Venue: ${venue}`, 50, 150);
    ctx.fillText(`Date: ${date}`, 50, 200);
    ctx.fillText(`Time: ${time}`, 50, 250);
    ctx.fillText(`Ticket Number: ${number}`, 50, 300);
    ctx.shadowBlur = 0; 

    ctx.globalAlpha = 0.1;
    ctx.font = "italic 40pt Arial"; 
    ctx.fillText("TICKET", width / 4, height / 1.5);
    ctx.globalAlpha = 1.0;

    const imageUrl = canvas.toDataURL("image/png");

    return imageUrl;
  }

  return (
    <main>
      <div className="hidden sm:block">
        <Header />
      </div>
      <section className="flex w-full flex-col gap-8 bg-gray-100 rounded-lg py-12 ">
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
                    <MapPin className="h-5 w-5" />
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
                  {Number(event?.[7])/10**18} cUSD
                </p>
              </div>

              {isTicketPurchased ? (
                <Link href={`/tickets/${event?.[0]}`} prefetch={false}>
                  <Button className="mt-4 w-full sm:w-auto">
                    <Ticket className="mr-2 h-5 w-5" />
                    Unveil your NFT ticket
                  </Button>
                </Link>
              ) : (
                <form onSubmit={buyTicket}>
                  <Button
                    className="w-full sm:w-auto"
                    type="submit"
                    disabled={
                      buyTicketPending || isTicketPurchased || isUploading
                    } 
                  >
                    <Ticket className="mr-2 h-5 w-5" />
                    {isUploading
                      ? "Minting NFT Ticket..."
                      : buyTicketPending
                        ? "Buying Ticket..."
                        : mintTicketHash || isTicketPurchased
                          ? "NFT Ticket Minted"
                          : "Buy Ticket"}
                  </Button>
                </form>
              )}
            </div>
            <Image
              alt="Event banner"
              className="mx-auto aspect-video overflow-hidden rounded-lg object-cover"
              height="600"
              src={`https://ipfs.io/ipfs/${event?.[10]}`}
              width="600"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-8 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10">
            <div className="space-y-2">
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
