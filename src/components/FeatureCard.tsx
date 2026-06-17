import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  colorClass: string; // Tailwind bg gradient class
}

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  href,
  colorClass,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-indigo-500/30 dark:hover:border-indigo-400/30"
    >
      {/* Dynamic Background Glow */}
      <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl transition-opacity group-hover:opacity-100" />
      
      <div>
        {/* Animated Icon Badge */}
        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${colorClass} text-white shadow-sm transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="h-6 w-6" />
        </div>
        
        {/* Card Title & Content */}
        <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      
      {/* Learn More Indicator */}
      <div className="mt-6 flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
        Explore hub &rarr;
      </div>
    </Link>
  );
}
