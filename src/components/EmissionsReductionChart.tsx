
import { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EmissionsReductionChartProps {
  dailyData: { date: string; amount: number }[];
  monthlyData: { month: string; amount: number; percentage: number }[];
  timeFrame?: "week" | "month" | "year";
  onTimeFrameChange?: (timeFrame: "week" | "month" | "year") => void;
}

const EmissionsReductionChart = ({ 
  dailyData, 
  monthlyData,
  timeFrame = "month",
  onTimeFrameChange
}: EmissionsReductionChartProps) => {
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
      
      <div className="flex-grow grid grid-rows-[2fr,1fr] gap-4">
        {/* Daily/Weekly emission trend line chart */}
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dailyData}
              margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                domain={[0, 'dataMax + 5']}
              />
              <Tooltip
                contentStyle={{ 
                  background: "white", 
                  borderRadius: "8px", 
                  border: "none", 
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)" 
                }}
                formatter={(value) => [`${value} kg`, "CO₂ Emissions"]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#4ade80" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 6, fill: "#4ade80", stroke: "white", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Monthly comparison bar chart */}
        <div className="w-full h-full flex items-center">
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              data={monthlyData}
              margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                domain={[0, 'dataMax + 5']}
              />
              <Tooltip
                contentStyle={{ 
                  background: "white", 
                  borderRadius: "8px", 
                  border: "none", 
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)" 
                }}
                formatter={(value) => [`${value} kg`, "CO₂ Emissions"]}
                labelFormatter={(label) => label}
              />
              <Bar dataKey="amount" fill="#4ade80" radius={[4, 4, 0, 0]} />
              {/* Render percentage reduction labels */}
              {monthlyData.map((entry, index) => (
                <text
                  key={`percentage-${index}`}
                  x={0} // This will be calculated by recharts
                  y={0} // This will be calculated by recharts
                  dx={index * 100 + 50} // Adjust based on chart width and number of bars
                  dy={-10}
                  fill="#16a34a"
                  fontSize={14}
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {entry.percentage > 0 ? `+${entry.percentage}%` : `${entry.percentage}%`}
                </text>
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EmissionsReductionChart;
