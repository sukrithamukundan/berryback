
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";

interface RevenueChartProps {
  data: { time: string; amount: number }[];
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  // Format to display currency properly
  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

  return (
    <ChartContainer
      config={{
        revenue: {
          theme: {
            light: "#472D21",
            dark: "#E3D9D5"
          }
        }
      }}
      className="h-[300px] w-full"
    >
      <LineChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="time" 
          tickLine={false}
          axisLine={false}
          padding={{ left: 10, right: 10 }}
        />
        <YAxis 
          tickFormatter={formatCurrency}
          tickLine={false}
          axisLine={false}
          padding={{ top: 10, bottom: 10 }}
        />
        <Tooltip 
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="font-medium">{payload[0].payload.time}</div>
                  <div className="text-[#472D21]">
                    {formatCurrency(payload[0].value as number)}
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Line 
          type="monotone" 
          dataKey="amount" 
          stroke="var(--color-revenue)" 
          strokeWidth={2}
          dot={{ strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default RevenueChart;
