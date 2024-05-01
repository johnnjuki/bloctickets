import { Label } from "@/components/ui/label";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
  SelectGroup,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarRange, Locate, Ticket } from "lucide-react";

export default function EventDetailsPage() {
  return (
    <>
      <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm font-medium dark:bg-gray-700">
                Upcoming Event
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Web Development Conference 2024
              </h1>
              <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                <div>
                  <CalendarRange className="mr-1 inline-block h-5 w-5" />
                  April 15, 2024
                </div>
                <div>
                  <Locate className="mr-1 inline-block h-5 w-5" />
                  San Francisco, CA
                </div>
              </div>
              <div className="text-4xl font-bold">$299</div>
              <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                <div className="grid gap-2">
                  <Label className="text-base font-medium" htmlFor="tickets">
                    Number of Tickets
                  </Label>
                  <Select defaultValue="1">
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of tickets" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full sm:w-auto">
                  <Ticket className="mr-2 h-5 w-5" />
                  Buy Tickets
                </Button>
              </div>
            </div>
            <img
              alt="Event Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
              height="400"
              src="/placeholder.svg"
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
              <p className="max-w-[800px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The Web Development Conference 2024 is a premier event for web
                developers, designers, and industry leaders to come together and
                explore the latest trends, technologies, and best practices in
                web development. Attendees will have the opportunity to learn
                from industry experts, network with peers, and discover
                innovative solutions to their development challenges.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Event Schedule
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">Keynote Address</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    9:00 AM - 10:00 AM
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">Technical Workshops</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    10:30 AM - 12:30 PM
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">Networking Lunch</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    12:30 PM - 1:30 PM
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">Panel Discussions</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    2:00 PM - 4:00 PM
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">Breakout Sessions</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    4:30 PM - 6:00 PM
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">Closing Remarks</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    6:30 PM - 7:00 PM
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Featured Speakers
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div className="grid gap-2">
                  <img
                    alt="Speaker"
                    className="mx-auto aspect-square overflow-hidden rounded-full object-cover"
                    height={120}
                    src="/placeholder.svg"
                    width={120}
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-bold">John Doe</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Senior Web Developer
                    </p>
                  </div>
                </div>
                <div className="grid gap-2">
                  <img
                    alt="Speaker"
                    className="mx-auto aspect-square overflow-hidden rounded-full object-cover"
                    height={120}
                    src="/placeholder.svg"
                    width={120}
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-bold">Jane Smith</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      UI/UX Designer
                    </p>
                  </div>
                </div>
                <div className="grid gap-2">
                  <img
                    alt="Speaker"
                    className="mx-auto aspect-square overflow-hidden rounded-full object-cover"
                    height={120}
                    src="/placeholder.svg"
                    width={120}
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-bold">Michael Johnson</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Full-Stack Developer
                    </p>
                  </div>
                </div>
                <div className="grid gap-2">
                  <img
                    alt="Speaker"
                    className="mx-auto aspect-square overflow-hidden rounded-full object-cover"
                    height={120}
                    src="/placeholder.svg"
                    width={120}
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-bold">Emily Davis</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Front-End Engineer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
