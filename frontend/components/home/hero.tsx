import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { DatePicker } from "../ui/datepicker";

export function HeroSection() {
    return (
        <div className="pt-32 flex space-x-10">
            <div className="justify-between flex flex-col flex-1">
                <h1 className="text-7xl font-medium mt-24">
                    Discover top events near you
                </h1>

                <div>
                    <p className="text-muted-foreground">
                        Search for events and select preferred date to secure your tickets
                    </p>

                    <Card className="mt-6 mb-8">
                        <CardHeader className="font-medium">
                            Get your tickets now
                        </CardHeader>
                        <CardContent className="flex gap-3">

                            <Select>
                                <SelectTrigger className="w-[135px]">
                                    <SelectValue placeholder="Event Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Events</SelectLabel>
                                        <SelectItem value="concerts">Concerts</SelectItem>
                                        <SelectItem value="sports">Sports</SelectItem>
                                        <SelectItem value="film">Film</SelectItem>
                                        <SelectItem value="art">Art Exhibits</SelectItem>
                                        <SelectItem value="comedy">Comedy Nights</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Select>
                                <SelectTrigger className="w-[135px]">
                                    <SelectValue placeholder="Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Location</SelectLabel>
                                        <SelectItem value="nairobi">Nairobi</SelectItem>
                                        <SelectItem value="nairobi">Naivasha</SelectItem>
                                        <SelectItem value="nairobi">Mombasa</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <DatePicker />

                            <Button>
                                Search
                            </Button>

                        </CardContent>

                    </Card>

                </div>

            </div>

            {/* Hero Image */}
            <div className="flex-1">
                <div className="flex justify-end">
                    <Image
                        className="rounded-lg"
                        width={410.8}
                        height={547.6}
                        src="/hero-concert.jpg"
                        alt="Picture of a concert"
                    />
                </div>
            </div>
        </div>
    );
}