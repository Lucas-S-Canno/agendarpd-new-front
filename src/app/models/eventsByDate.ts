import { EventModel } from "./event";

export interface EventsByDate {
  date: string;
  displayDate: string;
  events: EventModel[];
  expanded?: boolean;
}
