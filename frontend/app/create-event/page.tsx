"use client";

import { useWriteContract } from "wagmi";
import { ticketopiaAbi } from "@/blockchain/abi/ticketopia-abi";

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner";

export default function CreateEventPage() {
  const { isPending, error, writeContractAsync } = useWriteContract()

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    try {
      const hash = await writeContractAsync({
        address: "0xfbf8aEA9EcE9D77B12607201092CB9E2E9d98a52",
        abi: ticketopiaAbi,
        functionName: "addEvent",
        args: [data.name as string, data.venue as string, data.date as string, data.time as string, BigInt(data.price as string), BigInt(data.tickets as string)],
      })
      if (hash) {
        console.log(hash)
        toast("Event has been created", {
          description: `${data.date} at ${data.time}`,
        })
      }

    } catch (e) {
      toast.error("Failed to create event, try again.")
      return
    }
  }

  // TODO add Transation receipt

  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Create Event</h1>
        <p className="text-gray-500 dark:text-gray-400">Fill out the details to create a new event.</p>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Event Name</Label>
            <Input id="name" name="name" placeholder="Enter event name" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="venue">Venue</Label>
            <Input id="venue" name="venue" placeholder="Enter venue" required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="date">Date</Label>
            <Input id="date" name="date" type="date" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="time">Time</Label>
            <Input id="time" name="time" type="time" required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            {/* /// TODO: (ksh) */}
            <Label htmlFor="price">Price</Label>
            <Input id="price" name="price" placeholder="Enter price" type="number" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="tickets">Tickets</Label>
            <Input id="tickets" name="tickets" placeholder="Enter number of tickets" type="number" required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="image">Event Image</Label>
            <Input id="image" name="image" type="file" />
          </div>
        </div>
        <Button disabled={isPending} className="w-full" type="submit">
          {isPending ? "Creating..." : "Create Event"}
        </Button>
      </form>
    </div>
  )
}
