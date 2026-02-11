import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "bigcal-fixed bigcal-inset-0 bigcal-z-50 bigcal-bg-black/80 data-[state=open]:bigcal-animate-in data-[state=closed]:bigcal-animate-out data-[state=closed]:bigcal-fade-out-0 data-[state=open]:bigcal-fade-in-0",
        className
      )}
      {...props}
    />
  )
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "bigcal-fixed bigcal-left-[50%] bigcal-top-[50%] bigcal-z-50 bigcal-grid bigcal-w-full bigcal-max-w-lg bigcal-translate-x-[-50%] bigcal-translate-y-[-50%] bigcal-gap-4 bigcal-border bigcal-bg-background bigcal-p-6 bigcal-shadow-lg bigcal-duration-200 data-[state=open]:bigcal-animate-in data-[state=closed]:bigcal-animate-out data-[state=closed]:bigcal-fade-out-0 data-[state=open]:bigcal-fade-in-0 data-[state=closed]:bigcal-zoom-out-95 data-[state=open]:bigcal-zoom-in-95 data-[state=closed]:bigcal-slide-out-to-left-1/2 data-[state=closed]:bigcal-slide-out-to-top-[48%] data-[state=open]:bigcal-slide-in-from-left-1/2 data-[state=open]:bigcal-slide-in-from-top-[48%] sm:bigcal-rounded-lg",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="bigcal-absolute bigcal-right-4 bigcal-top-4 bigcal-rounded-sm bigcal-opacity-70 bigcal-ring-offset-background bigcal-transition-opacity hover:bigcal-opacity-100 focus:bigcal-outline-none focus:bigcal-ring-2 focus:bigcal-ring-ring focus:bigcal-ring-offset-2 disabled:bigcal-pointer-events-none data-[state=open]:bigcal-bg-accent data-[state=open]:bigcal-text-muted-foreground">
          <X className="bigcal-size-4" />
          <span className="bigcal-sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

function DialogHeader({ className, ...props }) {
  return <div className={cn("bigcal-flex bigcal-flex-col bigcal-space-y-1.5 bigcal-text-center sm:bigcal-text-left", className)} {...props} />;
}
DialogHeader.displayName = "DialogHeader";

function DialogFooter({ className, ...props }) {
  return <div className={cn("bigcal-flex bigcal-flex-col-reverse sm:bigcal-flex-row sm:bigcal-justify-end sm:bigcal-space-x-2", className)} {...props} />;
}
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title ref={ref} className={cn("bigcal-text-lg bigcal-font-semibold bigcal-leading-none bigcal-tracking-tight", className)} {...props} />
  )
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef(
  ({ className, ...props }, ref) => <DialogPrimitive.Description ref={ref} className={cn("bigcal-text-sm bigcal-text-muted-foreground", className)} {...props} />
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export { Dialog, DialogPortal, DialogOverlay, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription };
