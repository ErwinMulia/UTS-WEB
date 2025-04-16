import { StatItem } from "@/components/atom/StatItem";

const stats = [
  { value: "50K+", label: "Review\nPelanggan" },
  { value: "500+", label: "Partner\nKerjasama" },
  { value: "10K+", label: "Acara\nTersedia" }
];

export default function StatsSections() {
  return (
    <div className="flex flex-wrap gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatItem key={index} value={stat.value} label={stat.label} />
      ))}
    </div>
  );
}