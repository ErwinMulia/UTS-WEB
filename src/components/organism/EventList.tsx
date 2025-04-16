import { EventCard } from "@/components/molecul/EventCard";

const events = [
  {
    id: 1,
    title: "Konser Dewa 19",
    date: "15 Juni 2023",
    location: "Jakarta",
    price: "Rp 500.000",
    image: "/images/dewa-concert.jpg",
  },
];

export function EventList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
