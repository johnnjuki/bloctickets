"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAccount, useReadContract } from "wagmi";

import { blocTicketsAbi } from "@/blockchain/abi/blocTickets-abi";
import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";

export default function TicketsPage({ params }: { params: { id: number } }) {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  const {
    data: nftTicketUri,
    isPending,
    error,
  } = useReadContract({
    address: "0xcB9d3CF208858200EF12893db3dEF2Df191cb6C5",
    abi: blocTicketsAbi,
    functionName: "getUserPurchasedTickets",
    args: [BigInt(params.id), address!!],
  });

  return (
    <main className="px-4">
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className=" h-screen items-center justify-center rounded-lg bg-gray-100">
        {!isConnected && (
          <p>Please connect your wallet to view your tickets</p>
        )}

        {isPending && <Skeleton className="h-64 w-full rounded-lg" />}
        {nftTicketUri ? (
          <div className="flex flex-col gap-8 items-center justify-center h-screen w-full">
          <Badge>Reload the page if you can&apos;t see your NFT Ticket</Badge>
          
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
                </div>
        ) : (
          <p>You don&apos;t have a ticket</p>
        )}
        {error && <p>{error.message}</p>}
      </div>
    </main>
  );
}
