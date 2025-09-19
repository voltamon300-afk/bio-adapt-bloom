import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Target, 
  Clock, 
  TrendingUp,
  Share,
  Home,
  RotateCcw,
  Calendar
} from "lucide-react";
import natureBg from "@/assets/nature-bg.png";

export const SessionSummary = () => {
  const navigate = useNavigate();
  
  // Mock session data
  const sessionData = {
    totalReps: 84,
    targetReps: 90,
    correctnessPercentage: 94,
    duration: "14:32",
    exercisesCompleted: 7,
    totalExercises: 7,
    pointsEarned: 125,
    streak: 5
  };

  const handleNextSession = () => {
    navigate("/dashboard");
  };

  const handleRestartSession = () => {
    navigate("/exercise");
  };

  const handleHome = () => {
    navigate("/dashboard");
  };

  const repsProgress = (sessionData.totalReps / sessionData.targetReps) * 100;

  return (
    <div className="app-container min-h-screen bg-gradient-to-b from-background via-background to-muted/20 relative overflow-hidden">
      {/* Background Nature Motif */}
      <div className="absolute inset-0 opacity-5">
        <img 
          src={natureBg} 
          alt="Nature Background" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 py-8">
        {/* Completion Badge */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-healing rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-white" />
          </div>
          <h1 className="font-header text-2xl md:text-3xl lg:text-4xl text-foreground mb-2 responsive-header">
            Session Complete!
          </h1>
          <p className="text-nature-cue text-sm md:text-base responsive-body">
            "Like a river that shapes the stone, your persistence creates progress"
          </p>
        </div>

        {/* Main Stats Card */}
        <div className="mb-6 px-2">
          <Card className="card-nature responsive-card-padding">
            <div className="grid grid-cols-2 gap-6 md:gap-8 lg:gap-10 mb-6">
              {/* Reps Completed */}
              <div className="text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-sky rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <p className="font-header text-2xl md:text-3xl lg:text-4xl text-foreground">
                  {sessionData.totalReps}
                </p>
                <p className="font-caption text-sm md:text-base text-muted-foreground">
                  of {sessionData.targetReps} reps
                </p>
                <Progress value={repsProgress} className="h-2 mt-2" />
              </div>

              {/* Correctness */}
              <div className="text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-healing rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <p className="font-header text-2xl md:text-3xl lg:text-4xl text-foreground">
                  {sessionData.correctnessPercentage}%
                </p>
                <p className="font-caption text-sm md:text-base text-muted-foreground">
                  Correctness
                </p>
                <Progress value={sessionData.correctnessPercentage} className="h-2 mt-2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 md:gap-8 lg:gap-10">
              {/* Duration */}
              <div className="text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-energy rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <p className="font-header text-lg md:text-xl lg:text-2xl text-foreground">
                  {sessionData.duration}
                </p>
                <p className="font-caption text-sm md:text-base text-muted-foreground">
                  Duration
                </p>
              </div>

              {/* Exercises */}
              <div className="text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-primary/90 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <p className="font-header text-lg md:text-xl lg:text-2xl text-foreground">
                  {sessionData.exercisesCompleted}/{sessionData.totalExercises}
                </p>
                <p className="font-caption text-sm md:text-base text-muted-foreground">
                  Exercises
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Achievement & Points */}
        <div className="mb-6 px-2">
          <Card className="card-elevated responsive-card-padding">
            <div className="text-center mb-4">
              <h3 className="font-header text-lg md:text-xl lg:text-2xl text-foreground mb-2">
                Great Progress!
              </h3>
              <div className="flex items-center justify-center space-x-6 md:space-x-8 lg:space-x-10">
                <div className="text-center">
                  <p className="font-header text-xl md:text-2xl lg:text-3xl text-accent">+{sessionData.pointsEarned}</p>
                  <p className="font-caption text-xs md:text-sm text-muted-foreground">Points Earned</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="font-header text-xl md:text-2xl lg:text-3xl text-secondary">{sessionData.streak}</p>
                  <p className="font-caption text-xs md:text-sm text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </div>

            {/* Achievement Badge */}
            <div className="bg-gradient-calm p-4 md:p-6 rounded-lg border border-secondary/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-energy rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-body text-sm md:text-base text-foreground">Consistency Champion</p>
                  <p className="font-caption text-xs md:text-sm text-muted-foreground">
                    5 days in a row - keep the momentum!
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Nature Feedback */}
        <div className="mb-8 px-2">
          <Card className="card-nature responsive-card-padding bg-gradient-calm border-secondary/20">
            <div className="text-center">
              <p className="text-nature-cue text-sm md:text-base mb-2">
                "Your dedication blooms like a flower in spring - beautiful and steady"
              </p>
              <p className="font-caption text-xs md:text-sm text-muted-foreground">
                Next session recommendation: Focus on balance exercises
              </p>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 px-2">
          <Button
            variant="healing"
            size="lg"
            onClick={handleNextSession}
            className="w-full max-w-md mx-auto flex items-center justify-center space-x-2"
            aria-label="Schedule next session"
          >
            <Calendar className="w-5 h-5" />
            <span>Schedule Next Session</span>
          </Button>

          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            <Button
              variant="outline"
              onClick={handleRestartSession}
              className="flex items-center justify-center space-x-2"
              aria-label="Restart session"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry</span>
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => {
                navigator.share?.({
                  title: "BioAdapt Session Complete!",
                  text: `Just completed a rehabilitation session with ${sessionData.correctnessPercentage}% accuracy!`,
                  url: window.location.href
                });
              }}
              className="flex items-center justify-center space-x-2"
              aria-label="Share session"
            >
              <Share className="w-4 h-4" />
              <span>Share</span>
            </Button>
          </div>

          <Button
            variant="nature"
            onClick={handleHome}
            className="w-full max-w-md mx-auto block"
          >
            <Home className="w-5 h-5 mr-2" />
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};