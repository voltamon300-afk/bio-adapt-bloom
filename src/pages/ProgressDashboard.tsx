import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Share, 
  TrendingUp, 
  Calendar,
  Target,
  Award,
  Activity
} from "lucide-react";

const RECOVERY_DATA = [
  { day: "Mon", progress: 65 },
  { day: "Tue", progress: 70 },
  { day: "Wed", progress: 68 },
  { day: "Thu", progress: 75 },
  { day: "Fri", progress: 78 },
  { day: "Sat", progress: 80 },
  { day: "Sun", progress: 73 },
];

const COMPLIANCE_WEEKS = [
  [true, true, false, true, true, true, false],
  [true, true, true, false, true, true, true],
  [false, true, true, true, true, false, true],
  [true, true, true, true, false, true, true],
];

export const ProgressDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Header */}
      <div className="flex items-center justify-between py-6 px-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/dashboard")}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
        
        <h1 className="font-header text-xl text-foreground">
          Your Progress
        </h1>

        <Button variant="ghost" size="icon-sm">
          <Share className="w-4 h-4" />
        </Button>
      </div>

      {/* Overall Progress */}
      <div className="mb-6 px-2">
        <Card className="card-nature p-6">
          <div className="text-center mb-4">
            <h2 className="font-header text-2xl text-foreground mb-2">73%</h2>
            <p className="font-body text-sm text-muted-foreground mb-4">
              Recovery Progress
            </p>
            <Progress value={73} className="h-3 mb-2" />
            <p className="text-nature-cue text-sm">
              "You're growing stronger, like bamboo reaching for the sky"
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border/50">
            <div className="text-center">
              <div className="w-8 h-8 bg-gradient-healing rounded-full flex items-center justify-center mx-auto mb-2">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <p className="font-header text-lg text-foreground">156</p>
              <p className="font-caption text-xs text-muted-foreground">Sessions</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-gradient-sky rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="w-4 h-4 text-white" />
              </div>
              <p className="font-header text-lg text-foreground">89%</p>
              <p className="font-caption text-xs text-muted-foreground">Accuracy</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-gradient-energy rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="w-4 h-4 text-white" />
              </div>
              <p className="font-header text-lg text-foreground">12</p>
              <p className="font-caption text-xs text-muted-foreground">Streaks</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recovery Trend Chart */}
      <div className="mb-6 px-2">
        <Card className="card-elevated p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-header text-lg text-foreground">Recovery Trend</h3>
            <TrendingUp className="w-5 h-5 text-secondary" />
          </div>
          
          {/* Simple line chart simulation */}
          <div className="relative h-32 mb-4">
            <svg className="w-full h-full" viewBox="0 0 300 120">
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#2196F3" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              
              {/* Grid lines */}
              {[20, 40, 60, 80, 100].map((y) => (
                <line 
                  key={y} 
                  x1="0" 
                  y1={120 - y} 
                  x2="300" 
                  y2={120 - y} 
                  stroke="#e2e8f0" 
                  strokeWidth="1" 
                />
              ))}
              
              {/* Progress line */}
              <polyline
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={RECOVERY_DATA.map((item, index) => 
                  `${(index * 45) + 20},${120 - item.progress}`
                ).join(' ')}
              />
              
              {/* Data points */}
              {RECOVERY_DATA.map((item, index) => (
                <circle
                  key={index}
                  cx={(index * 45) + 20}
                  cy={120 - item.progress}
                  r="4"
                  fill="#4CAF50"
                  stroke="white"
                  strokeWidth="2"
                />
              ))}
            </svg>
          </div>
          
          {/* Week labels */}
          <div className="flex justify-between text-xs text-muted-foreground">
            {RECOVERY_DATA.map((item) => (
              <span key={item.day} className="font-caption">{item.day}</span>
            ))}
          </div>
        </Card>
      </div>

      {/* Compliance Calendar */}
      <div className="mb-6 px-2">
        <Card className="card-elevated p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-header text-lg text-foreground">Activity Calendar</h3>
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          
          <div className="space-y-2">
            {COMPLIANCE_WEEKS.map((week, weekIndex) => (
              <div key={weekIndex} className="flex space-x-2">
                {week.map((active, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`w-6 h-6 rounded-sm ${
                      active ? 'bg-secondary' : 'bg-muted'
                    } transition-colors duration-200`}
                  />
                ))}
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-secondary rounded-sm" />
              <span className="font-caption text-xs text-muted-foreground">Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-muted rounded-sm" />
              <span className="font-caption text-xs text-muted-foreground">Rest</span>
            </div>
            <span className="font-caption text-xs text-foreground">
              85% Compliance
            </span>
          </div>
        </Card>
      </div>

      {/* Achievements */}
      <div className="mb-6 px-2">
        <Card className="card-elevated p-6">
          <h3 className="font-header text-lg text-foreground mb-4">Recent Achievements</h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gradient-calm rounded-lg border border-secondary/10">
              <div className="w-10 h-10 bg-gradient-energy rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-body text-sm text-foreground">Week Warrior</p>
                <p className="font-caption text-xs text-muted-foreground">
                  Completed 7 days straight
                </p>
              </div>
              <span className="font-caption text-xs text-accent">+50pts</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gradient-calm rounded-lg border border-secondary/10">
              <div className="w-10 h-10 bg-gradient-healing rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-body text-sm text-foreground">Perfect Form</p>
                <p className="font-caption text-xs text-muted-foreground">
                  95% accuracy in last session
                </p>
              </div>
              <span className="font-caption text-xs text-accent">+25pts</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Share Report Button */}
      <div className="px-2 pb-8">
        <Button
          variant="healing"
          size="lg"
          className="w-full"
          onClick={() => {
            // Simulate sharing
            navigator.share?.({
              title: "My BioAdapt Progress",
              text: "Check out my rehabilitation progress!",
              url: window.location.href
            }).catch(() => {
              // Fallback for browsers without native sharing
              navigator.clipboard?.writeText(window.location.href);
            });
          }}
        >
          <Share className="w-5 h-5 mr-2" />
          Share Progress Report
        </Button>
      </div>
    </div>
  );
};