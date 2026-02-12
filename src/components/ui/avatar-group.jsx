import { cloneElement, Children, forwardRef, useMemo } from "react";

import { cn } from "@/lib/utils";

// ================================== //

const AvatarGroup = forwardRef(({ className, children, max = 1, spacing = 10, ...props }, ref) => {
  const avatarItems = Children.toArray(children);

  const renderContent = useMemo(() => {
    return (
      <>
        {avatarItems.slice(0, max).map((child, index) => {
          return cloneElement(child, {
            className: cn(child.props.className, "bigcal-border-2 bigcal-border-background"),
            style: { marginLeft: index === 0 ? 0 : -spacing, ...child.props.style },
          });
        })}

        {avatarItems.length > max && (
          <div
            className={cn("relative bigcal-flex bigcal-items-center bigcal-justify-center bigcal-rounded-full bigcal-border-2 bigcal-border-background bigcal-bg-muted", avatarItems[0].props.className)}
            style={{ marginLeft: -spacing }}
          >
            <p>+{avatarItems.length - max}</p>
          </div>
        )}
      </>
    );
  }, [avatarItems, max, spacing]);

  return (
    <div ref={ref} className={cn("relative bigcal-flex", className)} {...props}>
      {renderContent}
    </div>
  );
});

AvatarGroup.displayName = "AvatarGroup";

// ================================== //

export { AvatarGroup };
