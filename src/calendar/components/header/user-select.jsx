import { useCalendar } from "@/calendar/contexts/calendar-context";

import { AvatarGroup } from "@/components/ui/avatar-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function UserSelect() {
  const { users, selectedUserId, setSelectedUserId } = useCalendar();

  return (
    <Select value={selectedUserId} onValueChange={setSelectedUserId}>
      <SelectTrigger className="bigcal-flex-1 md:bigcal-w-48">
        <SelectValue />
      </SelectTrigger>

      <SelectContent align="end">
        <SelectItem value="all">
          <div className="bigcal-flex bigcal-items-center bigcal-gap-1">
            <AvatarGroup max={2}>
              {users.map(user => (
                <Avatar key={user.id} className="bigcal-size-6 bigcal-text-xxs">
                  <AvatarImage src={user.picturePath ?? undefined} alt={user.name} />
                  <AvatarFallback className="bigcal-text-xxs">{user.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
            All
          </div>
        </SelectItem>

        {users.map(user => (
          <SelectItem key={user.id} value={user.id} className="bigcal-flex-1">
            <div className="bigcal-flex bigcal-items-center bigcal-gap-2">
              <Avatar key={user.id} className="bigcal-size-6">
                <AvatarImage src={user.picturePath ?? undefined} alt={user.name} />
                <AvatarFallback className="bigcal-text-xxs">{user.name[0]}</AvatarFallback>
              </Avatar>

              <p className="bigcal-truncate">{user.name}</p>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
