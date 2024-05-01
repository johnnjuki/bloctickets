import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t bg-gray-100 px-4 py-6 dark:bg-gray-800 sm:flex-row md:px-6">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2024 Ticketopia. All rights reserved.
      </p>
      <nav className="flex gap-4 sm:ml-auto sm:gap-6">
        <Link className="text-xs underline-offset-4 hover:underline" href="#">
          Terms of Service
        </Link>
        <Link className="text-xs underline-offset-4 hover:underline" href="#">
          Privacy Policy
        </Link>
        <Link className="text-xs underline-offset-4 hover:underline" href="#">
          Twitter
        </Link>
        <Link className="text-xs underline-offset-4 hover:underline" href="#">
          Discord
        </Link>
      </nav>
    </footer>
  );
}
