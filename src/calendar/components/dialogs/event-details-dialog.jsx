import { format, parseISO } from "date-fns";
import { Calendar, Clock, Text, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EditEventDialog } from "@/calendar/components/dialogs/edit-event-dialog";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function EventDetailsDialog({ event, children }) {
  const startDate = parseISO(event.startDate);
  const endDate = parseISO(event.endDate);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{event.title}</DialogTitle>
          </DialogHeader>

          <div className="bigcal-space-y-4">
            <div className="bigcal-flex bigcal-items-start bigcal-gap-2">
              <User className="bigcal-mt-1 bigcal-size-4 bigcal-shrink-0" />
              <div>
                <p className="bigcal-text-sm bigcal-font-medium">Responsible</p>
                <p className="bigcal-text-sm bigcal-text-muted-foreground">{event.user.name}</p>
              </div>
            </div>

            <div className="bigcal-flex bigcal-items-start bigcal-gap-2">
              <Calendar className="bigcal-mt-1 bigcal-size-4 bigcal-shrink-0" />
              <div>
                <p className="bigcal-text-sm bigcal-font-medium">Start Date</p>
                <p className="bigcal-text-sm bigcal-text-muted-foreground">{format(startDate, "MMM d, yyyy h:mm a")}</p>
              </div>
            </div>

            <div className="bigcal-flex bigcal-items-start bigcal-gap-2">
              <Clock className="bigcal-mt-1 bigcal-size-4 bigcal-shrink-0" />
              <div>
                <p className="bigcal-text-sm bigcal-font-medium">End Date</p>
                <p className="bigcal-text-sm bigcal-text-muted-foreground">{format(endDate, "MMM d, yyyy h:mm a")}</p>
              </div>
            </div>

            <div className="bigcal-flex bigcal-items-start bigcal-gap-2">
              <Text className="bigcal-mt-1 bigcal-size-4 bigcal-shrink-0" />
              <div>
                <p className="bigcal-text-sm bigcal-font-medium">Description</p>
                <p className="bigcal-text-sm bigcal-text-muted-foreground">{event.description}</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <EditEventDialog event={event}>
              <Button type="button" variant="outline">
                Edit
              </Button>
            </EditEventDialog>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
