import { Button } from "@/components/ui/button"

export default function EventsPage() {
  return (
    <main>
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="space-y-6 md:space-y-8 lg:space-y-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Upcoming Events</h1>
            <div className="flex items-center space-x-4">
              <Button size="sm" variant="outline">
                All
              </Button>
              <Button size="sm" variant="outline">
                Tech
              </Button>
              <Button size="sm" variant="outline">
                Design
              </Button>
              <Button size="sm" variant="outline">
                Marketing
              </Button>
              <Button size="sm" variant="outline">
                Startup
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
            <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                alt="Event 1"
                className="w-full h-48 object-cover"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width="300"
              />
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2">Tech Conference 2023</h3>
                <div className="flex items-center space-x-2 mb-3">
                  <CalendarIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">May 15, 2023</p>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <ClockIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">9:00 AM - 5:00 PM</p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                  Join us for the annual Tech Conference, where industry leaders and innovators gather to share their
                  insights and explore the latest trends in technology.
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                alt="Event 2"
                className="w-full h-48 object-cover"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width="300"
              />
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2">Design Workshop</h3>
                <div className="flex items-center space-x-2 mb-3">
                  <CalendarIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">June 5, 2023</p>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <ClockIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">2:00 PM - 6:00 PM</p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                  Explore the latest design trends and techniques in this hands-on workshop led by industry experts.
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                alt="Event 3"
                className="w-full h-48 object-cover"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width="300"
              />
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2">Marketing Summit</h3>
                <div className="flex items-center space-x-2 mb-3">
                  <CalendarIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">July 20, 2023</p>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <ClockIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">10:00 AM - 4:00 PM</p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                  Join us for the annual Marketing Summit, where marketing professionals come together to share their
                  strategies and insights.
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                alt="Event 4"
                className="w-full h-48 object-cover"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width="300"
              />
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2">Startup Pitch Competition</h3>
                <div className="flex items-center space-x-2 mb-3">
                  <CalendarIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">August 10, 2023</p>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <ClockIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">6:00 PM - 9:00 PM</p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                  Witness the future of entrepreneurship as startups pitch their innovative ideas to a panel of
                  investors and industry experts.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button>View More Events</Button>
          </div>
        </div>
      </section>
    </main>
  )
}

function CalendarIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}


function ClockIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
