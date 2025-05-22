
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EmissionsReductionChartProps {
  dailyData: { date: string; amount: number }[];
  timeFrame?: "week" | "month" | "year";
  onTimeFrameChange?: (timeFrame: "week" | "month" | "year") => void;
}

const EmissionsReductionChart = ({ 
  dailyData, 
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
      
      <div className="flex-grow">
        {/* Emissions trend line chart */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dailyData}
            margin={{ top: 20, right: 20, left: 5, bottom: 20 }}
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
              label={{ value: 'CO₂ Emissions (kg)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 12, fill: '#666' } }}
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
    </div>
  );
};

export default EmissionsReductionChart;
