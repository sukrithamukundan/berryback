
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SurplusOverTimeChartProps {
  data: { date: string; amount: number }[];
  timeFrame?: "week" | "month" | "year";
  onTimeFrameChange?: (timeFrame: "week" | "month" | "year") => void;
}

const SurplusOverTimeChart = ({ 
  data, 
  timeFrame = "week",
  onTimeFrameChange
}: SurplusOverTimeChartProps) => {
  // Find peak day (highest amount)
  const peakDay = data.reduce((max, current) => 
    current.amount > max.amount ? current : max, data[0]);
  
  // Extract day of week from the date string for the peak day
  const getPeakDayName = () => {
    // For year view, just return the month name
    if (timeFrame === "year") {
      return peakDay.date;
    }
    
    // For week and month views, try to get the day of week
    try {
      // Add a year to make the date parsing work (the data just has "Apr 1" format without year)
      const dateParts = peakDay.date.split(" ");
      if (dateParts.length > 1) {
        const fullDate = `${dateParts[0]} ${dateParts[1]}, 2024`;
        const date = new Date(fullDate);
        return date.toLocaleDateString('en-US', { weekday: 'long' });
      }
      return peakDay.date;
    } catch (error) {
      // If date parsing fails, just return the original date string
      return peakDay.date;
    }
  };
  
  return (
    <div className="w-full h-full">
      {onTimeFrameChange && (
        <div className="mb-4 flex justify-end">
          <Select
            value={timeFrame}
            onValueChange={(value: "week" | "month" | "year") => onTimeFrameChange(value)}
          >
            <SelectTrigger className="w-[120px]">
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
      
      <ResponsiveContainer width="100%" height={onTimeFrameChange ? "90%" : "100%"}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => {
              // Shorten date labels based on timeFrame
              if (timeFrame === "week" || timeFrame === "month") {
                return value.replace("Apr ", "");
              } else {
                // For year view, show only month
                const dateParts = value.split(" ");
                return dateParts[0];
              }
            }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            domain={[0, 'dataMax + 1']}
          />
          <Tooltip
            contentStyle={{ background: "white", borderRadius: "8px", border: "none", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
            formatter={(value) => [`${value} items`, "Surplus"]}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Line 
            type="monotone" 
            dataKey="amount" 
            stroke="#3B82F6" 
            strokeWidth={2.5} 
            dot={false}
            activeDot={{ r: 6, fill: "#3B82F6", stroke: "white", strokeWidth: 2 }}
            fill="url(#colorUv)"
          />
          <ReferenceDot
            x={peakDay.date}
            y={peakDay.amount}
            r={4}
            fill="#3B82F6"
            stroke="white"
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
      
      <div className="mt-2 bg-blue-100 p-2 rounded-md flex items-center">
        <span className="text-blue-700 font-medium text-sm">
          Peak surplus {timeFrame === "year" ? "in" : "on"} {getPeakDayName()} ({peakDay.amount} items)
        </span>
      </div>
    </div>
  );
};

export default SurplusOverTimeChart;
