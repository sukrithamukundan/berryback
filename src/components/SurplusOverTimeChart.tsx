
import { useState, useRef, useEffect } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceDot,
  Legend,
  Area
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TrendingDown, TrendingUp, Volume2, Volume, Mic, MicOff, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  // Toast for notifications
  const { toast } = useToast();
  
  // State to toggle forecast visibility
  const [showForecast, setShowForecast] = useState(true);
  
  // State for confidence intervals
  const [showConfidenceIntervals, setShowConfidenceIntervals] = useState(true);
  
  // State for voice feedback
  const [voiceSummary, setVoiceSummary] = useState<string | null>(null);
  const [isVoiceOn, setIsVoiceOn] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceQuestion, setVoiceQuestion] = useState("");
  
  // Speech synthesis ref
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  
  // Speech recognition ref
  const recognitionRef = useRef<any>(null);
  
  // Find peak and lowest days
  const peakDay = data.reduce((max, current) => 
    current.amount > max.amount ? current : max, data[0]);
    
  const lowestDay = data.reduce((min, current) => 
    current.amount < min.amount ? current : min, data[0]);
  
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
    
    // Calculate standard deviation for confidence intervals
    let sumSquaredDifferences = 0;
    for (let i = 1; i < recentData.length; i++) {
      const diff = (recentData[i].amount - recentData[i-1].amount) - avgChange;
      sumSquaredDifferences += diff * diff;
    }
    const stdDev = Math.sqrt(sumSquaredDifferences / (recentData.length - 1)) || avgChange * 0.3;
    
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
      const confidenceUpper = Math.max(0, projectedValue + stdDev * (i + 1) * 0.8);
      const confidenceLower = Math.max(0, projectedValue - stdDev * (i + 1) * 0.8);
      
      const nextDate = getNextDate(data[data.length - 1].date, i);
      
      forecastPoints.push({
        date: nextDate,
        amount: undefined, // Actual will be empty for forecast dates
        forecast: parseFloat(projectedValue.toFixed(1)),
        confidenceUpper: parseFloat(confidenceUpper.toFixed(1)),
        confidenceLower: parseFloat(confidenceLower.toFixed(1))
      });
    }
    
    // Combine historical data with forecast
    return data.map(item => ({ 
      ...item, 
      forecast: undefined,
      confidenceUpper: undefined,
      confidenceLower: undefined
    })).concat(forecastPoints);
  };
  
  // Combined data with forecast
  const combinedData = showForecast ? generateForecastData() : data;
  
  // Generate voice summary
  const generateVoiceSummary = () => {
    const trend = data.length > 1 && data[data.length - 1].amount > data[0].amount ? "increasing" : "decreasing";
    const peakValue = peakDay.amount;
    const peakDate = getPeakDayName();
    const lowestValue = lowestDay.amount;
    
    // Generate appropriate time frame text
    const timeFrameText = timeFrame === "week" ? "this week" : 
                          timeFrame === "month" ? "this month" : "this year";
    
    const summary = `Food surplus is ${trend}. Peak surplus of ${peakValue} items on ${peakDate}. Consider reducing production by ${Math.round(peakValue * 0.8)} items on your highest day.`;
    
    return summary;
  };
  
  // Initialize speech synthesis and recognition
  useEffect(() => {
    // Initialize speech synthesis
    speechSynthesisRef.current = window.speechSynthesis;
    
    // Initialize speech recognition if supported
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setVoiceQuestion(transcript);
        processVoiceQuestion(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = () => {
        toast({
          title: "Voice Recognition Error",
          description: "Failed to recognize your voice. Please try again.",
          variant: "destructive",
        });
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
    
    // Generate initial voice summary
    setVoiceSummary(generateVoiceSummary());
    
    return () => {
      // Clean up
      if (speechSynthesisRef.current && speechSynthesisRef.current.speaking) {
        speechSynthesisRef.current.cancel();
      }
      
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [data, timeFrame]);
  
  // Process voice questions
  const processVoiceQuestion = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    let answer = "";
    
    // Simple rule-based response system
    if (lowerQuestion.includes("reduce") && lowerQuestion.includes("production")) {
      answer = `You should consider reducing production on ${getPeakDayName()}, which has the highest surplus of ${peakDay.amount} items.`;
    } else if (lowerQuestion.includes("lowest") || lowerQuestion.includes("minimum")) {
      answer = `The lowest surplus day is with ${lowestDay.amount} items.`;
    } else if (lowerQuestion.includes("highest") || lowerQuestion.includes("maximum") || lowerQuestion.includes("peak")) {
      answer = `The peak surplus day is ${getPeakDayName()} with ${peakDay.amount} items.`;
    } else if (lowerQuestion.includes("forecast") || lowerQuestion.includes("predict")) {
      if (showForecast) {
        const forecastData = combinedData.filter(item => item.forecast !== undefined);
        if (forecastData.length > 0) {
          const lastForecast = forecastData[forecastData.length - 1];
          answer = `The forecast for ${lastForecast.date} is ${lastForecast.forecast} items.`;
        } else {
          answer = "No forecast data is available.";
        }
      } else {
        answer = "Please enable the forecast feature to see predictions.";
      }
    } else {
      answer = "I'm sorry, I couldn't understand your question. Try asking about reducing production, peak days, or forecast.";
    }
    
    setVoiceSummary(answer);
    
    // Read the answer aloud if voice is on
    if (isVoiceOn) {
      speakText(answer);
    }
  };
  
  // Toggle listening for voice questions
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsListening(true);
          toast({
            title: "Listening...",
            description: "Ask a question about your surplus data.",
          });
        } catch (err) {
          toast({
            title: "Voice Recognition Error",
            description: "Failed to start voice recognition. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Voice Recognition Not Supported",
          description: "Your browser doesn't support voice recognition.",
          variant: "destructive",
        });
      }
    }
  };
  
  // Toggle text-to-speech
  const toggleVoice = () => {
    setIsVoiceOn(!isVoiceOn);
    
    if (!isVoiceOn && voiceSummary) {
      // Slight delay to ensure state has updated
      setTimeout(() => {
        speakText(voiceSummary);
      }, 100);
    } else if (speechSynthesisRef.current && speechSynthesisRef.current.speaking) {
      speechSynthesisRef.current.cancel();
    }
  };
  
  // Speak text using speech synthesis
  const speakText = (text: string) => {
    if (!speechSynthesisRef.current) return;
    
    if (speechSynthesisRef.current.speaking) {
      speechSynthesisRef.current.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower rate for clarity
    utterance.pitch = 1.0;
    
    // Find a good voice if available
    const voices = speechSynthesisRef.current.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes("Google") || voice.name.includes("Premium") || 
      voice.name.includes("Female") || voice.name.includes("Samantha"));
      
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    speechSynthesisRef.current.speak(utterance);
  };
  
  // Close speech bubble
  const closeSpeechBubble = () => {
    setVoiceSummary(null);
    if (speechSynthesisRef.current && speechSynthesisRef.current.speaking) {
      speechSynthesisRef.current.cancel();
    }
  };
  
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
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Forecast</label>
            <input 
              type="checkbox" 
              checked={showForecast} 
              onChange={() => setShowForecast(!showForecast)} 
              className="form-checkbox h-4 w-4 text-[#472D21] rounded border-gray-300 focus:ring-[#472D21]"
            />
          </div>
          
          {showForecast && (
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Confidence</label>
              <input 
                type="checkbox" 
                checked={showConfidenceIntervals} 
                onChange={() => setShowConfidenceIntervals(!showConfidenceIntervals)} 
                className="form-checkbox h-4 w-4 text-[#472D21] rounded border-gray-300 focus:ring-[#472D21]"
              />
            </div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleVoice}
            className="text-[#472D21] hover:bg-[#472D21]/10"
            title={isVoiceOn ? "Turn voice off" : "Turn voice on"}
          >
            {isVoiceOn ? <Volume2 size={18} /> : <Volume size={18} />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleListening}
            className={`${isListening ? 'bg-red-100' : ''} text-[#472D21] hover:bg-[#472D21]/10`}
            title="Ask a question"
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </Button>
        </div>
      </div>
      
      {/* Voice summary speech bubble */}
      {voiceSummary && (
        <div className="relative mb-4 bg-[#472D21]/10 rounded-lg p-3 pr-8">
          <div className="absolute bottom-0 left-6 transform translate-y-1/2 rotate-45 w-4 h-4 bg-[#472D21]/10"></div>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeSpeechBubble}
            className="absolute top-1 right-1 h-6 w-6 text-gray-500 hover:bg-[#472D21]/10"
          >
            <X size={14} />
          </Button>
          <p className="text-sm text-gray-700">{voiceSummary}</p>
        </div>
      )}
      
      {isListening && (
        <div className="mb-4 p-2 bg-red-50 rounded-lg text-center text-sm">
          <p>Listening... Ask a question about your surplus data</p>
          {voiceQuestion && <p className="font-medium mt-1">"{voiceQuestion}"</p>}
        </div>
      )}
      
      <ResponsiveContainer width="100%" height={onTimeFrameChange ? (voiceSummary ? "65%" : "80%") : "100%"}>
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
              const formattedName = name === "amount" ? "Actual" : 
                                    name === "forecast" ? "Forecast" :
                                    name === "confidenceUpper" ? "Upper Bound" :
                                    name === "confidenceLower" ? "Lower Bound" : "";
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
          
          {/* Historical Data Line */}
          <Line 
            type="monotone" 
            dataKey="amount" 
            stroke="#472D21" 
            strokeWidth={2.5} 
            dot={(props) => {
              const { cx, cy, payload } = props;
              
              // Special styling for highest and lowest points
              if (payload.date === peakDay.date) {
                return (
                  <g>
                    <circle cx={cx} cy={cy} r={6} fill="#472D21" stroke="white" strokeWidth={2} />
                    <TrendingUp x={Number(cx) - 8} y={Number(cy) - 16} size={16} color="#472D21" />
                  </g>
                );
              }
              
              if (payload.date === lowestDay.date) {
                return (
                  <g>
                    <circle cx={cx} cy={cy} r={6} fill="#8B572A" stroke="white" strokeWidth={2} />
                    <TrendingDown x={Number(cx) - 8} y={Number(cy) - 16} size={16} color="#8B572A" />
                  </g>
                );
              }
              
              // Regular dots
              return <circle cx={cx} cy={cy} r={4} fill="#472D21" />;
            }}
            activeDot={{ r: 6, fill: "#472D21", stroke: "white", strokeWidth: 2 }}
          />
          
          {/* Forecast Line */}
          {showForecast && (
            <Line 
              type="monotone" 
              dataKey="forecast" 
              stroke="#472D21" 
              strokeWidth={2} 
              strokeDasharray="5 5"
              dot={{ r: 4, fill: "#472D21", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#472D21", stroke: "white", strokeWidth: 2 }}
            />
          )}
          
          {/* Confidence intervals */}
          {showForecast && showConfidenceIntervals && (
            <>
              <Area
                type="monotone"
                dataKey="confidenceUpper"
                stroke="none"
                fill="#472D21"
                fillOpacity={0.1}
              />
              <Area
                type="monotone"
                dataKey="confidenceLower"
                stroke="none"
                fill="#472D21"
                fillOpacity={0.1}
              />
            </>
          )}
          
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
