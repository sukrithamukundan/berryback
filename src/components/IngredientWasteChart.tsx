
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface IngredientWasteChartProps {
  data: { name: string; value: number }[];
  variant?: "pie" | "donut";
}

const COLORS = ['#472D21', '#5A392C', '#8B6B61', '#A08880', '#D6CBC7'];

const IngredientWasteChart = ({ data, variant = "pie" }: IngredientWasteChartProps) => {
  // Calculate inner radius based on variant
  const innerRadius = variant === "donut" ? "60%" : "0%";
  const outerRadius = "80%";

  return (
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
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
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
  );
};

export default IngredientWasteChart;
