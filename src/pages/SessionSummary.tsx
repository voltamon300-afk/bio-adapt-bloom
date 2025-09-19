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
    <div className="mobile-container min-h-screen bg-gradient-to-b from-background via-background to-muted/20 relative overflow-hidden">
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
          <div className="w-20 h-20 bg-gradient-healing rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-header text-2xl text-foreground mb-2">
            Session Complete!
          </h1>
          <p className="text-nature-cue text-sm">
            "Like a river that shapes the stone, your persistence creates progress"
          </p>
        </div>

        {/* Main Stats Card */}
        <div className="mb-6 px-2">
          <Card className="card-nature p-6">
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Reps Completed */}
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-sky rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <p className="font-header text-2xl text-foreground">
                  {sessionData.totalReps}
                </p>
                <p className="font-caption text-sm text-muted-foreground">
                  of {sessionData.targetReps} reps
                </p>
                <Progress value={repsProgress} className="h-2 mt-2" />
              </div>

              {/* Correctness */}
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-healing rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <p className="font-header text-2xl text-foreground">
                  {sessionData.correctnessPercentage}%
                </p>
                <p className="font-caption text-sm text-muted-foreground">
                  Correctness
                </p>
                <Progress value={sessionData.correctnessPercentage} className="h-2 mt-2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Duration */}
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-energy rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <p className="font-header text-lg text-foreground">
                  {sessionData.duration}
                </p>
                <p className="font-caption text-sm text-muted-foreground">
                  Duration
                </p>
              </div>

              {/* Exercises */}
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/90 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <p className="font-header text-lg text-foreground">
                  {sessionData.exercisesCompleted}/{sessionData.totalExercises}
                </p>
                <p className="font-caption text-sm text-muted-foreground">
                  Exercises
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Achievement & Points */}
        <div className="mb-6 px-2">
          <Card className="card-elevated p-6">
            <div className="text-center mb-4">
              <h3 className="font-header text-lg text-foreground mb-2">
                Great Progress!
              </h3>
              <div className="flex items-center justify-center space-x-6">
                <div className="text-center">
                  <p className="font-header text-xl text-accent">+{sessionData.pointsEarned}</p>
                  <p className="font-caption text-xs text-muted-foreground">Points Earned</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="font-header text-xl text-secondary">{sessionData.streak}</p>
                  <p className="font-caption text-xs text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </div>

            {/* Achievement Badge */}
            <div className="bg-gradient-calm p-4 rounded-lg border border-secondary/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-energy rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-body text-sm text-foreground">Consistency Champion</p>
                  <p className="font-caption text-xs text-muted-foreground">
                    5 days in a row - keep the momentum!
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Nature Feedback */}
        <div className="mb-8 px-2">
          <Card className="card-nature p-4 bg-gradient-calm border-secondary/20">
            <div className="text-center">
              <p className="text-nature-cue text-sm mb-2">
                "Your dedication blooms like a flower in spring - beautiful and steady"
              </p>
              <p className="font-caption text-xs text-muted-foreground">
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
            className="w-full"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Schedule Next Session
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleRestartSession}
              className="flex items-center justify-center"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Retry
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
              className="flex items-center justify-center"
            >
              <Share className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>

          <Button
            variant="nature"
            onClick={handleHome}
            className="w-full"
          >
            <Home className="w-5 h-5 mr-2" />
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};