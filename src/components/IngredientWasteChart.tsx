
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IngredientWasteChartProps {
  data: { name: string; value: number }[];
  variant?: "pie" | "donut";
  timeFrame?: "week" | "month" | "year";
  onTimeFrameChange?: (timeFrame: "week" | "month" | "year") => void;
}

const COLORS = ['#472D21', '#5A392C', '#8B6B61', '#A08880', '#D6CBC7'];

const IngredientWasteChart = ({ 
  data, 
  variant = "pie", 
  timeFrame = "week",
  onTimeFrameChange
}: IngredientWasteChartProps) => {
  // Calculate inner radius based on variant
  const innerRadius = variant === "donut" ? "60%" : "0%";
  const outerRadius = "80%";

  return (
    <div className="w-full h-full flex flex-col">
      {onTimeFrameChange && (
        <div className="mb-4 flex justify-end">
          <Select
            value={timeFrame}
            onValueChange={(value: "week" | "month" | "year") => onTimeFrameChange(value)}
          >
            <SelectTrigger className="w-[120px] border-[#472D21]/20">
              <SelectValue placeholder="Time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              dataKey="value"
              stroke="none"
              // Improve label rendering to prevent text from being cut off
              label={({ name, percent }) => {
                // Only show percentage in the chart for better readability
                return `${(percent * 100).toFixed(0)}%`;
              }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend 
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                paddingTop: "20px",
                fontSize: "12px"
              }}
            />
            <Tooltip
              formatter={(value) => `${value}%`}
              contentStyle={{ 
                background: "white", 
                borderRadius: "8px", 
                border: "none", 
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)" 
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IngredientWasteChart;
