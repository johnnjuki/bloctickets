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

  return (
    <main className="px-4">
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="flex h-screen flex-col items-center justify-center gap-12 rounded-lg bg-gray-100">
        {isPending && <Skeleton className="h-64 w-full rounded-lg" />}
        {nftTicketUri ? (
          <>
            <p className="font-semibold text-green-600">
              Here is your NFT Ticket
            </p>
            <div className="px-6">
              <Image
                alt="NFT Ticket"
                className=""
                height="300"
                src={`https://${process.env.NEXT_PUBLIC_IPFS_GATEWAY}/ipfs/${nftTicketUri[0]}`}
                width="450"
              />
            </div>
          </>
        ) : (
          <p>You don&apos;t have a ticket</p>
        )}
        {error && <p>{error.message}</p>}
      </div>
    </main>
  );
}
