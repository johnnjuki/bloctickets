import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <div>
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="#">
          <Ticket className="h-6 w-6" />
          <span className="ml-2 hidden sm:block">Ticketopia</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link
            className="hidden text-sm font-medium underline-offset-4 hover:underline sm:block"
            href="/events"
          >
            Events
          </Link>
          <Link
            className="hidden text-sm font-medium underline-offset-4 hover:underline sm:block"
            href="/create-event"
          >
            Create event
          </Link>
          <Link
            className="hidden text-sm font-medium underline-offset-4 hover:underline sm:block"
            href="#"
          >
            About
          </Link>
          <Button variant="outline">
            <w3m-button />
          </Button>
        </nav>
      </header>
    </div>
  );
}
