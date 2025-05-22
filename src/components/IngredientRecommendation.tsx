
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface IngredientRecommendation {
  name: string;
  currentUsage: number;
  projectedUsage: number;
  trend: "increase" | "decrease" | "stable";
  priority: "high" | "medium" | "low";
  recommendation: string;
}

interface IngredientRecommendationProps {
  recommendations: IngredientRecommendation[];
}

const IngredientRecommendation = ({ recommendations }: IngredientRecommendationProps) => {
  // Get trend icon based on the trend direction
  const getTrendIcon = (trend: "increase" | "decrease" | "stable") => {
    switch (trend) {
      case "increase":
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case "decrease":
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      case "stable":
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  // Get badge color based on priority
  const getPriorityBadge = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-500">High Priority</Badge>;
      case "medium":
        return <Badge className="bg-amber-500">Medium Priority</Badge>;
      case "low":
        return <Badge className="bg-green-500">Low Priority</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#472D21]">
          Ingredient Purchase Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No recommendations available</p>
        ) : (
          recommendations.map((item, index) => (
            <div 
              key={index}
              className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0"
            >
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium text-[#472D21]">{item.name}</h3>
                {getPriorityBadge(item.priority)}
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <span className="flex items-center">
                  {getTrendIcon(item.trend)}
                  <span className="ml-1">
                    {item.trend === "increase" 
                      ? `${Math.round((item.projectedUsage / item.currentUsage - 1) * 100)}% projected increase`
                      : item.trend === "decrease"
                        ? `${Math.round((1 - item.projectedUsage / item.currentUsage) * 100)}% projected decrease`
                        : "Stable usage"
                    }
                  </span>
                </span>
              </div>
              <p className="text-sm">{item.recommendation}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default IngredientRecommendation;
