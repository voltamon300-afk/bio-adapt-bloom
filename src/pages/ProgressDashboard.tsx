import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/sonner";
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

  const shareProgress = async () => {
    const shareData = {
      title: "My BioAdapt Progress",
      text: "Check out my rehabilitation progress!",
      url: window.location.origin + "/progress",
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast("Shared successfully");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        toast("Link copied to clipboard");
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = shareData.url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        toast("Link copied");
      }
    } catch (e) {
      toast("Share cancelled or failed");
    }
  };

  return (
    <div className="app-container min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
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

        <h1 className="font-header text-xl md:text-2xl lg:text-3xl text-foreground responsive-header">
          Your Progress
        </h1>

        <Button variant="ghost" size="icon-sm" onClick={shareProgress} aria-label="Share Progress">
          <Share className="w-4 h-4" />
        </Button>
      </div>

      {/* Overall Progress */}
      <div className="mb-6 px-2">
        <Card className="card-nature responsive-card-padding">
          <div className="text-center mb-4">
            <h2 className="font-header text-2xl md:text-3xl lg:text-4xl text-foreground mb-2">73%</h2>
            <p className="font-body text-sm md:text-base text-muted-foreground mb-4">
              Recovery Progress
            </p>
            <Progress value={73} className="h-3 mb-2" />
            <p className="text-nature-cue text-sm md:text-base">
              "You're growing stronger, like bamboo reaching for the sky"
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-6 pt-4 border-t border-border/50">
            <div className="text-center">
              <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-healing rounded-full flex items-center justify-center mx-auto mb-2">
                <Activity className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <p className="font-header text-lg md:text-xl lg:text-2xl text-foreground">156</p>
              <p className="font-caption text-xs md:text-sm text-muted-foreground">Sessions</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-sky rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <p className="font-header text-lg md:text-xl lg:text-2xl text-foreground">89%</p>
              <p className="font-caption text-xs md:text-sm text-muted-foreground">Accuracy</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-energy rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <p className="font-header text-lg md:text-xl lg:text-2xl text-foreground">12</p>
              <p className="font-caption text-xs md:text-sm text-muted-foreground">Streaks</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recovery Trend Chart */}
      <div className="mb-6 px-2">
        <Card className="card-elevated responsive-card-padding">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-header text-lg md:text-xl lg:text-2xl text-foreground">Recovery Trend</h3>
            <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
          </div>
          
          {/* Simple line chart simulation - responsive height */}
          <div className="relative h-32 md:h-40 lg:h-48 mb-4">
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
          <div className="flex justify-between text-xs md:text-sm text-muted-foreground">
            {RECOVERY_DATA.map((item) => (
              <span key={item.day} className="font-caption">{item.day}</span>
            ))}
          </div>
        </Card>
      </div>

      {/* Compliance Calendar */}
      <div className="mb-6 px-2">
        <Card className="card-elevated responsive-card-padding">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-header text-lg md:text-xl lg:text-2xl text-foreground">Activity Calendar</h3>
            <Calendar className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </div>
          
          <div className="space-y-2 md:space-y-3">
            {COMPLIANCE_WEEKS.map((week, weekIndex) => (
              <div key={weekIndex} className="flex space-x-2 md:space-x-3 justify-center">
                {week.map((active, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-sm ${
                      active ? 'bg-secondary' : 'bg-muted'
                    } transition-colors duration-200`}
                  />
                ))}
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-secondary rounded-sm" />
              <span className="font-caption text-xs md:text-sm text-muted-foreground">Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-muted rounded-sm" />
              <span className="font-caption text-xs md:text-sm text-muted-foreground">Rest</span>
            </div>
            <span className="font-caption text-xs md:text-sm text-foreground">
              85% Compliance
            </span>
          </div>
        </Card>
      </div>


      {/* Share Report Button */}
      <div className="px-2 pb-8">
        <Button
          variant="healing"
          size="lg"
          className="w-full max-w-md mx-auto block"
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
