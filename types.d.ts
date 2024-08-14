import { status } from "./supabase/migrations/schema";

type DateTab = "TODAY" | "YESTERDAY" | "WEEK" | "MONTH" | "QUARTER";

type Status = (typeof status.enumValues)[number];

type TransactionTab = "IN" | "OUT";

type Locale = "en" | "al";
