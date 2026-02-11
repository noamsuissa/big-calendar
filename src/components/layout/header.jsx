import { ArrowUpRight, Calendar } from "lucide-react";

import { ToggleTheme } from "@/components/layout/change-theme";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bigcal-mx-auto bigcal-flex bigcal-h-[88px] bigcal-w-full bigcal-max-w-screen-2xl bigcal-items-center bigcal-justify-center">
      <div className="bigcal-my-3 bigcal-flex bigcal-h-14 bigcal-w-full bigcal-items-center bigcal-justify-between bigcal-px-8">
        <div className="bigcal-flex bigcal-items-center bigcal-gap-3.5">
          <div className="bigcal-flex bigcal-size-12 bigcal-items-center bigcal-justify-center bigcal-rounded-full bigcal-border bigcal-p-3">
            <Calendar className="bigcal-size-6 bigcal-text-foreground" />
          </div>

          <div className="bigcal-space-y-1">
            <p className="bigcal-text-lg bigcal-font-medium bigcal-leading-6">Big calendar</p>
            <p className="bigcal-text-sm bigcal-text-foreground">
              Built with React and Tailwind by{" "}
              <a
                href="https://github.com/lramos33"
                target="_blank"
                className="bigcal-inline-flex bigcal-gap-0.5 bigcal-text-sm bigcal-underline focus-visible:bigcal-outline-none focus-visible:bigcal-ring-1 focus-visible:bigcal-ring-ring"
              >
                lramos33
                <ArrowUpRight size={12} className="bigcal-text-foreground" />
              </a>
            </p>
          </div>
        </div>

        <div className="bigcal-hidden bigcal-items-center bigcal-gap-4 md:bigcal-flex">
          <a
            href="https://github.com/lramos33/big-calendar"
            target="_blank"
            className="bigcal-inline-flex bigcal-gap-0.5 bigcal-text-sm hover:bigcal-underline focus-visible:bigcal-outline-none focus-visible:bigcal-ring-1 focus-visible:bigcal-ring-ring"
          >
            View on GitHub
            <ArrowUpRight size={14} className="bigcal-text-foreground" />
          </a>

          <div className="bigcal-flex bigcal-items-center bigcal-gap-2">
            <Button size="icon" asChild variant="ghost">
              <a href="https://x.com/leoo_ramos1" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
            </Button>

            <ToggleTheme />
          </div>
        </div>
      </div>
    </header>
  );
}
