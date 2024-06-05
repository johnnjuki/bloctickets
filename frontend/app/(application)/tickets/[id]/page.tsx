"use client";

import { blocTicketsAbi } from "@/blockchain/abi/blocTickets-abi";
import { useAccount, useReadContract } from "wagmi";
import {useRouter} from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function TicketsPage({
    params,
}: {
    params: {id: number}
}) {

    const {address, isConnected} = useAccount();
    const router = useRouter();

    if (!isConnected) {

        router.push("/")
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
        <div className="mx-auto px-4 py-12 sm:px-6 lg:px-8">You don't have a ticket</div>
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

        <main>

            <div className="flex h-screen items-center justify-center">
            <p className="font-semibold text-green-600">
                    Here is your NFT Ticket
                  </p>
                  <div className="mt-4">
                    <Image
                      alt="NFT Ticket"
                      className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                      height="400"
                      src={`https://${process.env.NEXT_PUBLIC_IPFS_GATEWAY}/ipfs/${nftTicketUri[0]}`}
                      width="600"
                    />
                  </div>


            </div>

        </main>

    );
}