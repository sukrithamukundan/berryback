
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from "recharts";

interface SurplusOverTimeChartProps {
  data: { date: string; amount: number }[];
}

const SurplusOverTimeChart = ({ data }: SurplusOverTimeChartProps) => {
  // Find peak day (highest amount)
  const peakDay = data.reduce((max, current) => 
    current.amount > max.amount ? current : max, data[0]);
  
  return (
    <ResponsiveContainer width="100%" height="100%">
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
            // Shorten date labels to prevent crowding
            return value.replace("Apr ", "");
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
  );
};

export default SurplusOverTimeChart;
