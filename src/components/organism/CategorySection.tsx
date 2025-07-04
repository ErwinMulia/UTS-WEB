'use client'

import { useState } from "react";
import CategoryFilter from "../molecul/CategoryFilter";

const allEvents = [
  { id: 1, title: "Concert Asian", category: "Music", date: "2025-05-01" },
  { id: 2, title: "Football Match", category: "Sport", date: "2025-05-03" },
  { id: 3, title: "Stand-up Comedy", category: "Theater", date: "2025-05-05" },
  { id: 4, title: "Jazz Night", category: "Music", date: "2025-05-10" },
];

export default function CategorySection() {
  const [filtered, setFiltered] = useState(allEvents);

  const handleFilter = (category: string) => {
    if (category === "All") {
      setFiltered(allEvents);
    } else {
      setFiltered(allEvents.filter((e) => e.category === category));
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Event Categories</h2>
      <CategoryFilter onFilterChange={handleFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((event) => (
          <div
            key={event.id}
            className="border rounded-xl p-4 shadow-md hover:shadow-lg transition-all"
          >
            <h3 className="text-lg font-semibold text-gray-700">{event.title}</h3>
            <p className="text-sm text-gray-600">{event.date}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-gray-700 rounded-full text-xs text-white">
              {event.category}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}