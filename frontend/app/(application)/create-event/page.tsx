"use client";

require("dotenv").config();
import { useAccount, useWriteContract } from "wagmi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/shared/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/header";
import {
  blocTicketsAbi,
  contractAddress,
} from "@/blockchain/abi/blocTickets-abi";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { processCheckout } from "@/lib/TokenFuction";

export default function CreateEventPage() {
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);
  const inputFile = useRef(null);
  const { address, isConnected } = useAccount();
  const { isPending, error, writeContractAsync } = useWriteContract();
  const router = useRouter();

  const uploadFile = async (fileToUpload: any) => {
    try {
      setUploading(true);
      const data = new FormData();
      data.set("file", fileToUpload);
      const res = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const resData = await res.json();
      setCid(resData.IpfsHash);
      console.log(resData.IpfsHash);
      setUploading(false);
    } catch (e: any) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  console.log(uploading);
  console.log(file);

  const handleChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    uploadFile(selectedFile);
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    try {
      const dateObject = new Date(data.date as string);
      const dateInMilliseconds = dateObject.getTime();

      const paid = await processCheckout(contractAddress as `0x{string}` , Number(1 * 10 ** 18));

      if (paid) {
        const hash = await writeContractAsync({
          address: contractAddress,
          abi: blocTicketsAbi,
          functionName: "createEvent",
          args: [
            data.name as string,
            data.venue as string,
            data.category as string,
            BigInt(dateInMilliseconds),
            data.time as string,
            BigInt(Number(data.price) * 10 ** 18),
            cid as string,
            BigInt(data.tickets as string),
            data.description as string,
          ],
        });
        if (hash) {
          console.log(hash);
          toast("Event has been created", {
            description: `${data.date} at ${data.time}`,
          });
          router.push("/events");
        }
      } else {
        toast("ensure you have right amount");
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to create event, try again.");
      return;
    }
  }

  // TODO add upload event banner/image

  return (
    <main className="flex flex-col ">
      <div className="hidden sm:block">
        <Header />
      </div>
      <section className="selection: border-rounded-md mx-auto max-w-md space-y-6 px-6 py-8 shadow-lg shadow-gray-500">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Create Event</h1>
          <p className="text-gray-500 ">
            Fill out the details to create a new event.
          </p>
        </div>

        <form onSubmit={submit} className="">
          <div className="width-fit mb-2 grid max-w-sm items-center gap-1.5">
            <Label htmlFor="poster">Poster</Label>
            <p className="text-sm text-gray-400">
              (Upload poster for your event)
            </p>
            <Input
              id="poster"
              type="file"
              ref={inputFile}
              onChange={handleChange}
              className="w-fit text-gray-500"
              required
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Event Name</Label>
              <Input id="name" name="name" required />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="venue">Venue</Label>
              <Input id="venue" name="venue" required />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger
                  className="w-[180px]"
                  name="category"
                  id="category"
                  
                >
                  <SelectValue placeholder="Select  category"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select category</SelectLabel>
                    <SelectItem value="Education & Learning" >
                      Education & Learning
                    </SelectItem>
                    <SelectItem value="Entertainment" >Entertainment</SelectItem>
                    <SelectItem value="Travel & Outdoor">
                      Travel & Outdoor
                    </SelectItem>
                    <SelectItem value="Movies & Film" >Movies & Film</SelectItem>
                    <SelectItem value="Sports" >Sports</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" type="date" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="time">Time</Label>
              <Input id="time" name="time" type="time" required />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="price">Price (cUSD)</Label>
              <Input id="price" name="price" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tickets">Number of Tickets</Label>
              <Input id="tickets" name="tickets" type="number" required />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="name">Event Description</Label>
              <Textarea id="description" name="description" required />
            </div>
          </div>

          <Button disabled={isPending} className="mt-8 w-full" type="submit">
            {isPending ? "Creating..." : "Create Event"}
          </Button>
        </form>
      </section>
    </main>
  );
}
