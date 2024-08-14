"use client";

import { Bar, BarChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTranslations } from "next-intl";

export type UserMovementsChartDataType = {
  user: string;
  in: number;
  out: number;
  commission: number;
};

const config = {
  in: {
    label: "In",
    color: "hsl(var(--chart-1))",
  },
  out: {
    label: "Out",
    color: "hsl(var(--chart-2))",
  },
  commission: {
    label: "Commission",
    color: "hsl(var(--chart-3))",
  },
};

export function UserMovementsChart({
  data,
}: {
  data: UserMovementsChartDataType[];
}) {
  const t = useTranslations();

  const neededUsers = 2 - data.length; // 2 is the minimum number of users needed
  const users = Array.from({ length: neededUsers }, (_, i) => ({
    user: "",
    in: 0,
    out: 0,
    commission: 0,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Movements per user")}</CardTitle>
        <CardDescription>{t("Detailed movements")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart
            accessibilityLayer
            data={[...data, ...(neededUsers > 0 ? users : [])]}
          >
            <XAxis
              dataKey='user'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Bar dataKey='in' stackId='a' fill='var(--color-in)' />
            <Bar dataKey='out' stackId='a' fill='var(--color-out)' />
            <Bar
              dataKey='commission'
              stackId='a'
              fill='var(--color-commission)'
            />
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
