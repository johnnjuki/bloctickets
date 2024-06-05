"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAccount, useReadContract } from "wagmi";

import { blocTicketsAbi } from "@/blockchain/abi/blocTickets-abi";
import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/header";

export default function TicketsPage({ params }: { params: { id: number } }) {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  if (!isConnected) {
    router.push("/");
  }

  const {
    data: nftTicketUri,
    isPending,
    error,
  } = useReadContract({
    address: "0x198e09d359478dA45E0Bd4ACd86aAf5487E8B353",
    abi: blocTicketsAbi,
    functionName: "getUserPurchasedTickets",
    args: [BigInt(params.id), address!!],
  });

  if (!nftTicketUri) {
    return (
      <div className="mx-auto px-4 py-12 sm:px-6 lg:px-8">
        You don't have a ticket
      </div>
    );
  }

  if (isPending) {
    return (
      <main className="mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Skeleton className="h-64 w-full rounded-lg" />
      </main>
    );
  }

  return (
    <main className="px-4">
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="flex h-screen items-center justify-center flex-col gap-12 bg-gray-100 rounded-lg">
        <p className="font-semibold text-green-600">Here is your NFT Ticket</p>
        <div className="px-6">
          <Image
            alt="NFT Ticket"
            className=""
            height="300"
            src={`https://${process.env.NEXT_PUBLIC_IPFS_GATEWAY}/ipfs/${nftTicketUri[0]}`}
            width="450"
          />
        </div>
      </div>
    </main>
  );
}
