import { cn } from "./ui/utils.js";
function GlassCard({
  children,
  className,
  hover = false,
  onClick
}) {
  return <div
    onClick={onClick}
    className={cn(
      "rounded-xl bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] shadow-[var(--glass-shadow)]",
      hover && "transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10",
      className
    )}
  >
      {children}
    </div>;
}
export {
  GlassCard
};
