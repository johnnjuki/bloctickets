import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Button } from "@/components/shared/ui/button";
import { LandingPrimaryImageCtaSection } from "@/components/landing/cta/LandingPrimaryCta";
import { LandingTestimonialInline } from "@/components/landing/testimonial/LandingTestimonialInline";
import { LandingTestimonialInlineItem } from "@/components/landing/testimonial/LandingTestimonialInlineItem";

const navLinks = [
  {
    name: "Explore events",
    href: "/events",
  },
  {
    name: "Create event",
    href: "/create-event",
  },
  {
    name: "About us",
    href: "/",
  },
];

export default function Page() {
  return (
    <main className="flex flex-col">
      <div className="w-full items-center justify-between text-sm lg:flex">
        <div className="flex w-full items-center justify-between border-b px-8 pb-6 pt-8">
          <Link href="/" className="text-3xl font-bold">
            Ticketopia
          </Link>
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium underline-offset-4 hover:underline"
              >
                {link.name}
              </Link>
            ))}
            <ConnectButton />
          </nav>
        </div>
      </div>

      <LandingPrimaryImageCtaSection
        title="Discover top events near you"
        description="Ticketopia is the leading web3 platform for events. Enjoy secure, decentralized ticketing and resale capabilities."
        imageSrc="/static/images/image-concert.jpg"
        imageAlt="Concert image"
        withBackground
        footerComponent={
          <LandingTestimonialInline>
            <LandingTestimonialInlineItem
              imageSrc="/static/images/people/1.webp"
              name="John Doe"
              text="I love this app"
            />

            <LandingTestimonialInlineItem
              imageSrc="/static/images/people/2.webp"
              name="Jane Doe"
              text="Best app on the market"
            />

            <LandingTestimonialInlineItem
              imageSrc="/static/images/people/3.webp"
              name="Alice Doe"
              text="Never seen anything like it"
              suffix="CEO of Instagram"
            />

            <LandingTestimonialInlineItem
              imageSrc="/static/images/people/5.webp"
              name="Guido Ross"
              text="Nothing comes close to it"
              suffix="DevOps at Meta"
            />
          </LandingTestimonialInline>
        }
      >
        <Button size="xl" asChild>
          <Link href="/create-event">Create Event</Link>
        </Button>

        <Button size="xl" variant="outlinePrimary">
          <Link href="/events">Upcoming Events</Link>
        </Button>
      </LandingPrimaryImageCtaSection>
    </main>
  );
}
