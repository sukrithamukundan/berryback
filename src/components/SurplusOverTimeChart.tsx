
import { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceDot,
  Legend 
} from "recharts";
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
  // State to toggle forecast visibility
  const [showForecast, setShowForecast] = useState(true);
  
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

  // Generate forecast data based on historical data
  const generateForecastData = () => {
    if (!data || data.length === 0) return [];
    
    // Calculate average trend (simple linear regression approach)
    let sum = 0;
    const recentData = timeFrame === "week" ? data.slice(-3) : 
                        timeFrame === "month" ? data.slice(-7) : 
                        data.slice(-4);
                        
    for (let i = 1; i < recentData.length; i++) {
      sum += recentData[i].amount - recentData[i-1].amount;
    }
    
    const avgChange = sum / (recentData.length - 1) || 0;
    const lastValue = data[data.length - 1].amount;
    
    // Generate forecast points
    const forecastPoints = [];
    const forecastCount = timeFrame === "week" ? 3 : 
                          timeFrame === "month" ? 7 : 
                          4;
    
    // Create date extensions based on timeframe
    const getNextDate = (lastDate: string, index: number) => {
      if (timeFrame === "year") {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const lastMonth = lastDate.split(" ")[0];
        const lastYear = parseInt(lastDate.split(" ")[1]);
        
        let monthIndex = months.indexOf(lastMonth);
        let year = lastYear;
        
        for (let i = 0; i <= index; i++) {
          monthIndex++;
          if (monthIndex >= 12) {
            monthIndex = 0;
            year++;
          }
        }
        
        return `${months[monthIndex]} ${year}`;
      } else {
        // For week and month views
        const dateParts = lastDate.split(" ");
        const month = dateParts[0];
        let day = parseInt(dateParts[1]);
        day = day + index + 1;
        return `${month} ${day}`;
      }
    };
    
    for (let i = 0; i < forecastCount; i++) {
      const projectedValue = Math.max(0, lastValue + avgChange * (i + 1));
      const nextDate = getNextDate(data[data.length - 1].date, i);
      
      forecastPoints.push({
        date: nextDate,
        forecast: parseFloat(projectedValue.toFixed(1))
      });
    }
    
    // Combine historical data with forecast
    return data.map(item => ({ 
      ...item
    })).concat(forecastPoints);
  };
  
  // Combined data with forecast
  const combinedData = showForecast ? generateForecastData() : data;
  
  return (
    <div className="w-full h-full">
      <div className="mb-4 flex justify-between items-center">
        {onTimeFrameChange && (
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
        )}
        
        <div className="flex items-center">
          <label className="text-sm text-gray-600 mr-2">Show forecast</label>
          <input 
            type="checkbox" 
            checked={showForecast} 
            onChange={() => setShowForecast(!showForecast)} 
            className="form-checkbox h-4 w-4 text-[#472D21] rounded border-gray-300 focus:ring-[#472D21]"
          />
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={onTimeFrameChange ? "88%" : "100%"}>
        <LineChart
          data={combinedData}
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
            formatter={(value, name) => {
              const formattedName = name === "amount" ? "Actual" : "Forecast";
              return [value ? `${value} items` : "N/A", formattedName];
            }}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend 
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ fontSize: "12px", paddingBottom: "10px" }}
          />
          <Line 
            type="monotone" 
            dataKey="amount" 
            stroke="#472D21" 
            strokeWidth={2.5} 
            dot={false}
            name="Actual"
            activeDot={{ r: 6, fill: "#472D21", stroke: "white", strokeWidth: 2 }}
            fill="url(#colorUv)"
          />
          {showForecast && (
            <Line 
              type="monotone" 
              dataKey="forecast" 
              stroke="#472D21" 
              strokeWidth={2} 
              strokeDasharray="5 5"
              dot={false}
              name="Forecast"
              activeDot={{ r: 5, fill: "#472D21", stroke: "white", strokeWidth: 2 }}
            />
          )}
          <ReferenceDot
            x={peakDay.date}
            y={peakDay.amount}
            r={4}
            fill="#472D21"
            stroke="white"
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#472D21" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#472D21" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
      
      <div className="mt-2 bg-[#472D21]/10 p-2 rounded-md flex items-center">
        <span className="text-[#472D21] font-medium text-sm">
          Peak surplus {timeFrame === "year" ? "in" : "on"} {getPeakDayName()} ({peakDay.amount} items)
        </span>
      </div>
    </div>
  );
};

export default SurplusOverTimeChart;
