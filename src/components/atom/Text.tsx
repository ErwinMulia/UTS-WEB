export function Text({ children, className }: { children: React.ReactNode, className?: string }) {
    return <span className={className}>{children}</span>;
  }