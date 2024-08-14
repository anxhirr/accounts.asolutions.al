import { Messages } from "@/global";
import { DateTab } from "@/types";
import {
  ArrowUpDown,
  Home,
  LucideProps,
  Package,
  ShoppingCart,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export const SIDEBAR_ITEMS: {
  label: keyof Messages;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}[] = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Package,
    label: "Products",
    href: "/products",
  },
  {
    icon: ShoppingCart,
    label: "Transaction",
    href: "/transaction",
  },
  {
    icon: ArrowUpDown,
    label: "Movement",
    href: "/movement",
  },
];

export const SETTING_ITEMS: {
  text: "General" | "Members";
  // | "Security"
  // | "Integrations"
  // | "Support"
  // | "Organizations"
  // | "Advanced";
  href: string;
}[] = [
  {
    text: "General",
    href: "",
  },
  {
    text: "Members",
    href: "/members",
  },
  // {
  //   text: "Security",
  //   href: "#",
  // },
  // {
  //   text: "Integrations",
  //   href: "#",
  // },
  // {
  //   text: "Support",
  //   href: "#",
  // },
  // {
  //   text: "Organizations",
  //   href: "#",
  // },
  // {
  //   text: "Advanced",
  //   href: "#",
  // },
];

export const DATE_TABS: DateTab[] = [
  "TODAY",
  "YESTERDAY",
  "WEEK",
  "MONTH",
  "QUARTER",
];
