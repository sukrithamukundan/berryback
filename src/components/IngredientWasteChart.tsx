
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IngredientWasteChartProps {
  data: { 
    weekly: { name: string; value: number }[]; 
    monthly: { name: string; value: number }[];
    yearly: { name: string; value: number }[];
  };
  variant?: "pie" | "donut";
  onTimeFrameChange?: (timeFrame: "weekly" | "monthly" | "yearly") => void;
}

const COLORS = ['#472D21', '#5A392C', '#8B6B61', '#A08880', '#D6CBC7'];

const IngredientWasteChart = ({ data, variant = "pie", onTimeFrameChange }: IngredientWasteChartProps) => {
  // State for selected time frame
  const [timeFrame, setTimeFrame] = useState<"weekly" | "monthly" | "yearly">("weekly");
  
  // Calculate inner radius based on variant
  const innerRadius = variant === "donut" ? "60%" : "0%";
  const outerRadius = "80%";
  
  // Get the appropriate data based on selected time frame
  const currentData = data[timeFrame];
  
  // Handle time frame change
  const handleTimeFrameChange = (value: "weekly" | "monthly" | "yearly") => {
    setTimeFrame(value);
    if (onTimeFrameChange) {
      onTimeFrameChange(value);
    }
  };

  return (
    <div className="w-full h-full">
      {onTimeFrameChange && (
        <div className="mb-4 flex justify-end">
          <Select
            value={timeFrame}
            onValueChange={(value: "weekly" | "monthly" | "yearly") => handleTimeFrameChange(value)}
          >
            <SelectTrigger className="w-[120px] border-[#472D21]/20">
              <SelectValue placeholder="Time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      
      <ResponsiveContainer width="100%" height={onTimeFrameChange ? "90%" : "100%"}>
        <PieChart>
          <Pie
            data={currentData}
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
            {currentData.map((entry, index) => (
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
  );
};

export default IngredientWasteChart;
