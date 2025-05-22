
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, ReferenceArea } from "recharts";
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
  
  // Find lowest day
  const lowestDay = data.reduce((min, current) => 
    current.amount < min.amount ? current : min, data[0]);
  
  // Generate dynamic reduction recommendation
  const generateRecommendation = () => {
    // Calculate average surplus
    const totalSurplus = data.reduce((sum, item) => sum + item.amount, 0);
    const averageSurplus = totalSurplus / data.length;
    
    // If peak day is significantly higher than average (>25% above average)
    if (peakDay.amount > averageSurplus * 1.25) {
      const peakDayName = getDayName(peakDay.date);
      const reductionPercentage = Math.round((peakDay.amount - averageSurplus) / peakDay.amount * 100);
      
      return {
        day: peakDayName,
        percentage: reductionPercentage,
        message: `Reduce production by ${reductionPercentage}% on ${peakDayName}s`
      };
    } else {
      // If no significant peak, recommend general reduction
      return {
        day: "all days",
        percentage: 5,
        message: "Consider reducing overall production by 5%"
      };
    }
  };
  
  // Extract day name from the date string
  const getDayName = (dateString: string) => {
    // For year view, just return the month name
    if (timeFrame === "year") {
      return dateString;
    }
    
    // For week and month views, try to get the day of week
    try {
      // Add a year to make the date parsing work (the data just has "Apr 1" format without year)
      const dateParts = dateString.split(" ");
      if (dateParts.length > 1) {
        const fullDate = `${dateParts[0]} ${dateParts[1]}, 2024`;
        const date = new Date(fullDate);
        return date.toLocaleDateString('en-US', { weekday: 'long' });
      }
      return dateString;
    } catch (error) {
      // If date parsing fails, just return the original date string
      return dateString;
    }
  };
  
  // Get peak day name using the helper function
  const getPeakDayName = () => getDayName(peakDay.date);
  
  // Generate recommendation
  const recommendation = generateRecommendation();
  
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
        <ResponsiveContainer width="100%" height="80%">
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
              stroke="#472D21" 
              strokeWidth={2.5} 
              dot={false}
              activeDot={{ r: 6, fill: "#472D21", stroke: "white", strokeWidth: 2 }}
              fill="url(#colorUv)"
            />
            {/* Peak day reference dot */}
            <ReferenceDot
              x={peakDay.date}
              y={peakDay.amount}
              r={4}
              fill="#472D21"
              stroke="white"
            />
            {/* Lowest day reference dot */}
            <ReferenceDot
              x={lowestDay.date}
              y={lowestDay.amount}
              r={4}
              fill="#7CB9E8"
              stroke="white"
            />
            {/* Add reference area for peak day */}
            <ReferenceArea
              x1={peakDay.date}
              x2={peakDay.date}
              y1={0}
              y2={peakDay.amount}
              fillOpacity={0.1}
              fill="#472D21"
              stroke="none"
            />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#472D21" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#472D21" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="bg-[#472D21]/10 p-2 rounded-md flex items-center">
          <span className="text-[#472D21] font-medium text-sm">
            Peak surplus {timeFrame === "year" ? "in" : "on"} {getPeakDayName()} ({peakDay.amount} items)
          </span>
        </div>
        
        <div className="bg-red-50 p-2 rounded-md flex items-center">
          <div className="bg-red-400 rounded-full p-1 mr-2 flex-shrink-0">
            <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 6L12 2M12 2L8 6M12 2V18M21 12L17 16M17 16L13 12M17 16H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-700 text-sm font-medium">
              Waste Reduction Recommendation
            </span>
            <span className="text-gray-700 text-sm">
              {recommendation.message}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurplusOverTimeChart;
