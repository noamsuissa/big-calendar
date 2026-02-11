import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const eventBulletVariants = cva("bigcal-size-2 bigcal-rounded-full", {
  variants: {
    color: {
      blue: "bigcal-bg-blue-600 dark:bigcal-bg-blue-500",
      green: "bigcal-bg-green-600 dark:bigcal-bg-green-500",
      red: "bigcal-bg-red-600 dark:bigcal-bg-red-500",
      yellow: "bigcal-bg-yellow-600 dark:bigcal-bg-yellow-500",
      purple: "bigcal-bg-purple-600 dark:bigcal-bg-purple-500",
      gray: "bigcal-bg-neutral-600 dark:bigcal-bg-neutral-500",
      orange: "bigcal-bg-orange-600 dark:bigcal-bg-orange-500",
    },
  },
  defaultVariants: {
    color: "blue",
  },
});

export function EventBullet({ color, className }) {
  return <div className={cn(eventBulletVariants({ color, className }))} />;
}
