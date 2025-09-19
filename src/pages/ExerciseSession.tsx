import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Pause, 
  Play, 
  Square, 
  Mic, 
  Camera,
  RotateCcw,
  ArrowLeft
} from "lucide-react";
import exerciseIllustration from "@/assets/exercise-illustration.png";

export const ExerciseSession = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(3);
  const [totalExercises] = useState(7);
  const [sessionTime, setSessionTime] = useState(0);
  const [currentReps, setCurrentReps] = useState(0);
  const [targetReps] = useState(12);
  const [feedback, setFeedback] = useState("Position yourself like a tall bamboo reaching for sunlight");

  const exerciseProgress = (currentExercise / totalExercises) * 100;
  const repsProgress = (currentReps / targetReps) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    navigate("/summary");
  };

  const simulateRepDetection = () => {
    if (currentReps < targetReps) {
      setCurrentReps(prev => prev + 1);
      const feedbacks = [
        "Excellent form! Move like water flowing downstream",
        "Breathe deeply, like a tree drawing strength from earth",
        "Steady rhythm, like waves gently touching shore",
        "Perfect alignment! Stand proud like a mountain peak"
      ];
      setFeedback(feedbacks[Math.floor(Math.random() * feedbacks.length)]);
    }
  };

  const handleNextExercise = () => {
    if (currentExercise < totalExercises) {
      setCurrentExercise(prev => prev + 1);
      setCurrentReps(0);
      setFeedback("Position yourself like a tall bamboo reaching for sunlight");
    } else {
      navigate("/summary");
    }
  };

  // Simple exercise metadata for display in the UI.
  const exercises = [
    { name: "Ankle Pumps", description: "Gently point and flex your foot to increase circulation and ankle mobility." },
    { name: "Heel Slides", description: "Slide your heel toward your buttocks keeping your foot on the floor to improve knee flexion." },
    { name: "Quadriceps Sets", description: "Tighten the muscles on the front of your thigh and hold for a few seconds to build strength." },
    { name: "Straight Leg Raises", description: "Lie down and lift your straight leg a few inches, keeping your knee locked, to engage the hip flexors." },
    { name: "Mini Squats", description: "Stand with feet hip-width and bend knees slightly, keeping weight on heels to activate glutes safely." },
    { name: "Calf Raises", description: "Rise onto your toes slowly and lower back down to strengthen calf muscles and balance." },
    { name: "Hamstring Curls", description: "Bend your knee to bring your heel toward your buttock to target hamstring strength." },
  ];

  const currentExerciseMeta = exercises[currentExercise - 1] ?? { name: `Exercise ${currentExercise}`, description: "Follow the on-screen guidance for this exercise." };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background/95 to-muted/40 overflow-hidden">
      {/* Background Illustration */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src={exerciseIllustration} 
          alt="Exercise Background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="flex items-center space-x-2"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
        </div>
        
        <div className="text-center">
          <h1 className="font-header text-lg md:text-xl lg:text-2xl text-foreground">
            Exercise {currentExercise} of {totalExercises}
          </h1>
          <p className="font-caption text-sm md:text-base text-muted-foreground">
            {formatTime(sessionTime)}
          </p>
        </div>

        <Button variant="ghost" size="icon-sm" aria-label="Toggle camera">
          <Camera className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
      </div>

      {/* Progress Indicator */}
      <div className="relative z-10 px-4 py-2 bg-background/60 backdrop-blur-sm">
        <Progress value={exerciseProgress} className="h-2 mb-1" />
        <p className="font-caption text-xs md:text-sm text-center text-muted-foreground">
          Session Progress
        </p>
      </div>

      {/* Camera/Skeletal Overlay Area */}
      <div className="relative flex-1 flex items-center justify-center px-4 py-8">
        {/* Exercise Area - Responsive sizing */}
        <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg aspect-[3/4] md:aspect-[4/3] lg:aspect-[16/10] rounded-xl border-2 border-secondary/30 bg-gradient-calm backdrop-blur-sm overflow-hidden">
          {/* Background visuals removed for a cleaner progress card - kept intentionally empty */}

          {/* Rep Counter */}
          <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2">
            <p className="font-header text-sm md:text-base text-foreground">
              {currentReps}/{targetReps}
            </p>
            <p className="font-caption text-xs md:text-sm text-muted-foreground">Reps</p>
          </div>

          {/* Progress Ring around center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
              <svg className="w-full h-full transform -rotate-90 progress-ring" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className="text-muted/30"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 35}`}
                  strokeDashoffset={`${2 * Math.PI * 35 * (1 - repsProgress / 100)}`}
                  className="text-secondary transition-all duration-300"
                />
              </svg>
              <button
                onClick={handlePlayPause}
                aria-label={isPlaying ? "Pause session" : "Start session"}
                title={isPlaying ? "Pause session" : "Start session"}
                className="absolute inset-2 rounded-full flex items-center justify-center bg-transparent border-0 p-0 focus:outline-none"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
                ) : (
                  <Play className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Feedback */}
      <div className="relative z-10 px-4 pb-6">
        <div className="app-container">
          <Card className="card-nature responsive-card-padding bg-background/90 backdrop-blur-sm border-secondary/20">
            <div className="text-center">
              <h3 className="font-header text-base md:text-lg text-foreground mb-1">{currentExerciseMeta.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{currentExerciseMeta.description}</p>
              <p className="text-nature-cue text-sm md:text-base mb-3">
                {feedback}
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={simulateRepDetection}
                  className="text-secondary"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Rep +1
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNextExercise}
                >
                  Next Exercise →
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Control Bar */}
      <div className="relative z-10 p-4 bg-background/80 backdrop-blur-sm border-t border-border/50">
        <div className="app-container">
          <div className="flex items-center justify-center">
            <Button
              variant="destructive"
              size="lg"
              onClick={handleStop}
              className="w-full max-w-sm mx-auto flex items-center justify-center"
            >
              <Square className="w-4 h-4 mr-2" />
              End Session
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};