
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CreateEventPage() {

  
    return (
      <div className="max-w-md mx-auto px-4 py-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Create Event</h1>
          <p className="text-gray-500 dark:text-gray-400">Fill out the details to create a new event.</p>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Event Name</Label>
              <Input id="name" placeholder="Enter event name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="venue">Venue</Label>
              <Input id="venue" placeholder="Enter venue" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="price">Price</Label>
              <Input id="price" placeholder="Enter price" type="number" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tickets">Tickets</Label>
              <Input id="tickets" placeholder="Enter number of tickets" type="number" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="image">Event Image</Label>
              <Input id="image" type="file" />
            </div>
          </div>
          <Button className="w-full" type="submit">
            Create Event
          </Button>
        </form>
      </div>
    )
  }
