import { DateTab } from "@/types";
import {
  endOfMonth,
  endOfQuarter,
  endOfToday,
  endOfWeek,
  endOfYesterday,
  startOfMonth,
  startOfQuarter,
  startOfToday,
  startOfWeek,
  startOfYesterday,
} from "date-fns";

export const TAB_START_END: Record<
  DateTab,
  {
    getStart: () => Date;
    getEnd: () => Date;
  }
> = {
  TODAY: {
    getStart: startOfToday,
    getEnd: endOfToday,
  },
  YESTERDAY: {
    getStart: startOfYesterday,
    getEnd: endOfYesterday,
  },
  WEEK: {
    getStart: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getEnd: () => endOfWeek(new Date(), { weekStartsOn: 1 }),
  },
  MONTH: {
    getStart: () => startOfMonth(new Date()),
    getEnd: () => endOfMonth(new Date()),
  },
  QUARTER: {
    getStart: () => startOfQuarter(new Date()),
    getEnd: () => endOfQuarter(new Date()),
  },
};
