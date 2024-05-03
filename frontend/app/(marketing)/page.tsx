import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Button } from "@/components/shared/ui/button";
import { LandingPrimaryImageCtaSection } from "@/components/landing/cta/LandingPrimaryCta";
import { LandingTestimonialInline } from "@/components/landing/testimonial/LandingTestimonialInline";
import { LandingTestimonialInlineItem } from "@/components/landing/testimonial/LandingTestimonialInlineItem";
import { LandingProductFeature } from "@/components/landing/LandingProductFeature";
import { LandingProductFeatureKeyPoints } from "@/components/landing/LandingProductFeatureKeyPoints";
import { LandingTestimonialGrid } from "@/components/landing/testimonial/LandingTestimonialGrid";
import { Footer } from "@/components/footer";

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

const keyPoints = [
  {
    title: "Decentralized",
    description: "Ticketopia is built on top of web3.0.",
  },
  {
    title: "Secure",
    description:
      "We use the latest security standards to ensure your data stays safe.",
  },
  {
    title: "Support",
    description:
      "24/7 customer support. We are here to help you at any time of the day. Just ask.",
  },
];

const testimonialItems = [
  {
    name: "Mathew",
    text: "After using this, I cannot imagine going back to the old way of doing things.",
    handle: "@heymatt_oo",
    imageSrc: "https://picsum.photos/100/100.webp?random=2",
  },
  {
    name: "Joshua",
    text: "Perfect for my use case",
    handle: "@joshua",
    imageSrc: "https://picsum.photos/100/100.webp?random=3",
  },
  {
    name: "Parl Coppa",
    text: "This is the best thing since sliced bread. I cannot believe I did not think of it myself.",
    handle: "@coppalipse",
    imageSrc: "https://picsum.photos/100/100.webp?random=1",
    featured: true, // Feature this testimonial
  },
];

export default function Page() {
  return (
    <main className="flex flex-col">
      <div className="w-full items-center justify-between text-sm lg:flex">
        <div className="flex w-full items-center justify-between border-b px-8 pb-6 pt-8">
          <Link href="/" className="md:text-3xl font-bold">
            Ticketopia
          </Link>
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hidden md:block text-sm font-medium underline-offset-4 hover:underline"
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
        imageSrc="/static/images/concert/concert-1.jpg"
        imageAlt="Concert image"
        withBackground
      >
        <Button size="xl" asChild>
          <Link href="/create-event">Create Event</Link>
        </Button>

        <Button size="xl" variant="outlinePrimary">
          <Link href="/events">Upcoming Events</Link>
        </Button>
      </LandingPrimaryImageCtaSection>

      <LandingProductFeature
      className="hidden md:block"
        title="Blockchain-Powered Ticketing"
        descriptionComponent={
          <>
            <LandingProductFeatureKeyPoints
              className="mb-8"
              keyPoints={keyPoints}
            />
          </>
        }
        imageSrc="/static/images/concert/concert-3.jpg"
        imageAlt="Concert image"
        imagePosition="left"
        imagePerspective="none"
      />

      <LandingTestimonialGrid
        title="Don't take it from us"
        description="See what 120k event organizers have to say about our product."
        testimonialItems={testimonialItems}
        withBackground
        withBackgroundGlow
      />

      <Footer />
    </main>
  );
}
