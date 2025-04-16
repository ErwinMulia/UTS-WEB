interface StatItemProps {
    value: string;
    label: string;
  }
  
  export function StatItem({ value, label }: StatItemProps) {
    return (
      <div className="flex items-center">
        <div className="text-3xl font-bold mr-2">{value}</div>
        <div className="text-sm">{label}</div>
      </div>
    );
  }