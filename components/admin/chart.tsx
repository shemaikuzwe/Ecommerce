"use client";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { use } from "react";
import { ChartData } from "@/lib/types/types";
export default function Chart({
  dataPromise,
}: {
  dataPromise: Promise<ChartData[]>;
}) {
  const chartConfig = {
    product: {
      label: "Product",
    },
    users: {
      label: "Orders",
    },
  } satisfies ChartConfig;
  const data = use(dataPromise);
  return (
    <Card className="rounded-sm w-full md:max-w-md lg:max-w-lg">
      <CardHeader className={"p-2 bg-muted"}>
        <CardTitle className="text-md text-center">Products Overview</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="pl-2 py-3">
        <ChartContainer config={chartConfig}>
          <BarChart data={data} accessibilityLayer>
            <XAxis
              dataKey="product"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="orders" fill="#2563eb" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}