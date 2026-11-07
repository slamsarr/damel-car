import {
  Armchair, BatteryCharging, Building2, Car, CircleDot, Clock, Cog, Disc3, Droplet, FlaskConical,
  Filter, Flower2, Fuel, Lightbulb, MapPin, MessageCircle, MoveHorizontal, Scale, ShieldCheck,
  Snowflake, Sparkles, Thermometer, Wind, Wrench, type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Armchair, BatteryCharging, Building2, Car, CircleDot, Clock, Cog, Disc3, Droplet, FlaskConical,
  Filter, Flower2, Fuel, Lightbulb, MapPin, MessageCircle, MoveHorizontal, Scale, ShieldCheck,
  Snowflake, Sparkles, Thermometer, Wind, Wrench,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const C = icons[name] ?? Sparkles;
  return <C className={className} aria-hidden="true" strokeWidth={1.75} />;
}
