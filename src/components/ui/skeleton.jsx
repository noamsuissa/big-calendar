import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      className={cn("bigcal-animate-pulse bigcal-rounded-md bigcal-bg-primary/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
