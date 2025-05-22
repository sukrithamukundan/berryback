
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "@/components/BottomNavBar";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Award,
  Medal,
  Users,
  TrendingUp,
  Star,
  StarHalf
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock user impact data
const userImpact = {
  lifetimeCO2: 237.8,
  monthlyCO2: 42.3,
  mealsRescued: 26,
  carMilesAvoided: 189.4,
  waterSaved: 4520,
  points: 1450,
  streak: 7,
  rank: 23,
  level: 3
};

// Milestone definitions for badges
const milestones = [
  { type: "meals", threshold: 10, badge: "Rookie Rescuer", icon: <StarHalf className="h-4 w-4" /> },
  { type: "meals", threshold: 25, badge: "Food Savior", icon: <Star className="h-4 w-4" /> },
  { type: "meals", threshold: 50, badge: "Rescue Champion", icon: <Trophy className="h-4 w-4" /> },
  { type: "meals", threshold: 100, badge: "Food Waste Warrior", icon: <Award className="h-4 w-4" /> },
  { type: "CO2", threshold: 100, badge: "Climate Defender", icon: <Medal className="h-4 w-4" /> },
  { type: "CO2", threshold: 250, badge: "Carbon Crusher", icon: <Trophy className="h-4 w-4" /> },
  { type: "streak", threshold: 5, badge: "Consistency King", icon: <StarHalf className="h-4 w-4" /> },
  { type: "streak", threshold: 14, badge: "Dedicated Rescuer", icon: <Star className="h-4 w-4" /> },
];

// Mock leaderboard data
const leaderboard = [
  { rank: 1, name: "EcoChampion", points: 3250, mealsRescued: 47 },
  { rank: 2, name: "GreenWarrior", points: 2980, mealsRescued: 43 },
  { rank: 3, name: "FoodRescuer32", points: 2710, mealsRescued: 39 },
  { rank: 4, name: "ZeroWaste", points: 2540, mealsRescued: 36 },
  { rank: 5, name: "PlanetSaver", points: 2320, mealsRescued: 34 },
];

const Profile = () => {
  const navigate = useNavigate();
  const [userBadges, setUserBadges] = useState<string[]>([]);
  const [nextMilestone, setNextMilestone] = useState<{type: string, threshold: number, badge: string, progress: number}>({
    type: "",
    threshold: 0,
    badge: "",
    progress: 0
  });
  
  useEffect(() => {
    // Calculate earned badges
    const earned = milestones.filter(milestone => {
      if (milestone.type === "meals" && userImpact.mealsRescued >= milestone.threshold) return true;
      if (milestone.type === "CO2" && userImpact.lifetimeCO2 >= milestone.threshold) return true;
      if (milestone.type === "streak" && userImpact.streak >= milestone.threshold) return true;
      return false;
    }).map(m => m.badge);
    
    setUserBadges(earned);
    
    // Find next milestone
    const next = {
      meals: milestones
        .filter(m => m.type === "meals" && userImpact.mealsRescued < m.threshold)
        .sort((a, b) => a.threshold - b.threshold)[0],
      CO2: milestones
        .filter(m => m.type === "CO2" && userImpact.lifetimeCO2 < m.threshold)
        .sort((a, b) => a.threshold - b.threshold)[0],
      streak: milestones
        .filter(m => m.type === "streak" && userImpact.streak < m.threshold)
        .sort((a, b) => a.threshold - b.threshold)[0]
    };
    
    // Choose the closest milestone
    let closestType = "meals";
    let closestProgress = next.meals ? userImpact.mealsRescued / next.meals.threshold : 0;
    
    if (next.CO2 && userImpact.lifetimeCO2 / next.CO2.threshold > closestProgress) {
      closestType = "CO2";
      closestProgress = userImpact.lifetimeCO2 / next.CO2.threshold;
    }
    
    if (next.streak && userImpact.streak / next.streak.threshold > closestProgress) {
      closestType = "streak";
      closestProgress = userImpact.streak / next.streak.threshold;
    }
    
    const selectedMilestone = next[closestType as keyof typeof next];
    
    if (selectedMilestone) {
      const currentValue = 
        closestType === "meals" ? userImpact.mealsRescued : 
        closestType === "CO2" ? userImpact.lifetimeCO2 : 
        userImpact.streak;
      
      setNextMilestone({
        type: closestType,
        threshold: selectedMilestone.threshold,
        badge: selectedMilestone.badge,
        progress: Math.min(Math.round((currentValue / selectedMilestone.threshold) * 100), 99)
      });
    }
  }, []);
  
  const handleLogout = () => {
    // Remove logged in status
    localStorage.removeItem("isLoggedIn");
    // Navigate to home
    navigate('/');
    // Reload page to reflect changes
    window.location.reload();
  };
  
  // App Bar Component
  const AppBar = () => (
    <div className="bg-[#472D21] text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-10">
      <div className="text-xl font-bold">BerryBack</div>
      <div className="flex items-center space-x-4">
        {/* Location and cart icons removed */}
      </div>
    </div>
  );
  
  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <AppBar />
      
      <h1 className="text-2xl font-bold mb-6 mt-4 text-[#472D21]">Your Profile</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-[#472D21] w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
            U
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-[#472D21]">User</h2>
            <p className="text-[#472D21]/70">user@example.com</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {userBadges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="bg-[#FEC6A1]/30 text-[#472D21]">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Impact Meter Dashboard */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-[#472D21]">Your Impact</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-[#472D21] flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-[#472D21]" />
                CO₂ Emissions Saved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span className="text-[#472D21]/80 text-sm">This Month</span>
                <span className="font-bold text-[#472D21]">{userImpact.monthlyCO2} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#472D21]/80 text-sm">Lifetime</span>
                <span className="font-bold text-[#472D21]">{userImpact.lifetimeCO2} kg</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-[#472D21] flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-[#472D21]" />
                Meals Rescued
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#472D21] text-center">
                {userImpact.mealsRescued}
              </div>
              <div className="text-[#472D21]/80 text-center text-sm">
                meals saved from landfill
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-[#472D21] flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-[#472D21]" />
                Environment Saved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span className="text-[#472D21]/80 text-sm">Car Miles Avoided</span>
                <span className="font-bold text-[#472D21]">{userImpact.carMilesAvoided}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#472D21]/80 text-sm">Water Saved</span>
                <span className="font-bold text-[#472D21]">{userImpact.waterSaved} liters</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-[#472D21] flex items-center">
                <Award className="h-5 w-5 mr-2 text-[#472D21]" />
                Your Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span className="text-[#472D21]/80 text-sm">Rescue Points</span>
                <span className="font-bold text-[#472D21]">{userImpact.points} pts</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-[#472D21]/80 text-sm">Current Streak</span>
                <span className="font-bold text-[#472D21]">{userImpact.streak} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#472D21]/80 text-sm">Level</span>
                <span className="font-bold text-[#472D21]">{userImpact.level}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Next Milestone Progress */}
      {nextMilestone.badge && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="font-semibold text-[#472D21] mb-2">Next Milestone: {nextMilestone.badge}</h3>
          <div className="flex items-center gap-2 mb-2">
            <Progress value={nextMilestone.progress} className="h-2" />
            <span className="text-sm text-[#472D21]/80">{nextMilestone.progress}%</span>
          </div>
          <p className="text-sm text-[#472D21]/80">
            {nextMilestone.type === "meals" ? 
              `Rescue ${nextMilestone.threshold - userImpact.mealsRescued} more meals` :
              nextMilestone.type === "CO2" ?
              `Save ${nextMilestone.threshold - userImpact.lifetimeCO2} more kg of CO₂` :
              `Keep your streak for ${nextMilestone.threshold - userImpact.streak} more days`
            }
          </p>
        </div>
      )}
      
      {/* Leaderboard */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <h3 className="font-medium text-[#472D21] flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Leaderboard
          </h3>
        </div>
        <div className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Points</TableHead>
                <TableHead className="text-right">Meals</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((user) => (
                <TableRow key={user.rank} className={user.rank === userImpact.rank ? "bg-[#FEC6A1]/10" : ""}>
                  <TableCell className="font-medium">
                    {user.rank <= 3 ? (
                      <div className="flex items-center">
                        {user.rank === 1 && <Trophy className="h-4 w-4 text-yellow-500 mr-1" />}
                        {user.rank === 2 && <Medal className="h-4 w-4 text-gray-400 mr-1" />}
                        {user.rank === 3 && <Medal className="h-4 w-4 text-amber-700 mr-1" />}
                        {user.rank}
                      </div>
                    ) : (
                      user.rank
                    )}
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.points}</TableCell>
                  <TableCell className="text-right">{user.mealsRescued}</TableCell>
                </TableRow>
              ))}
              {userImpact.rank > 5 && (
                <>
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-sm text-[#472D21]/50">...</TableCell>
                  </TableRow>
                  <TableRow className="bg-[#FEC6A1]/10">
                    <TableCell className="font-medium">{userImpact.rank}</TableCell>
                    <TableCell>You</TableCell>
                    <TableCell>{userImpact.points}</TableCell>
                    <TableCell className="text-right">{userImpact.mealsRescued}</TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="font-medium text-[#472D21]">Account Settings</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li className="text-[#472D21]/80">Personal Information</li>
              <li className="text-[#472D21]/80">Payment Methods</li>
              <li className="text-[#472D21]/80">Notifications</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="font-medium text-[#472D21]">Support</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li className="text-[#472D21]/80">Help Center</li>
              <li className="text-[#472D21]/80">Contact Us</li>
              <li className="text-[#472D21]/80">Privacy Policy</li>
              <li className="text-[#472D21]/80">Terms of Service</li>
            </ul>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full border-red-500 text-red-500 hover:bg-red-50"
          onClick={handleLogout}
        >
          Sign Out
        </Button>
      </div>
      
      <BottomNavBar />
    </div>
  );
};

export default Profile;
