import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Camera, User, FileText, Settings } from "lucide-react";
import logoImage from "@/assets/logo.png";

const ONBOARDING_STEPS = [
  {
    id: "welcome",
    title: "Welcome to BioAdapt",
    subtitle: "Heal Like Nature Intended",
    content: "Bio-mimetic rehabilitation that adapts to your natural healing patterns",
    icon: User,
  },
  {
    id: "medical-history", 
    title: "Medical History",
    subtitle: "Help us understand your needs",
    content: "We'll customize your rehabilitation program based on your specific condition and goals",
    icon: FileText,
  },
  {
    id: "camera-permission",
    title: "Camera Permission",
    subtitle: "Motion tracking for accurate feedback",
    content: "We use your camera to analyze movement patterns and provide real-time corrections",
    icon: Camera,
  },
  {
    id: "calibration",
    title: "Calibration Complete",
    subtitle: "You're ready to begin healing",
    content: "Your personalized rehabilitation program is ready. Let's start your healing journey.",
    icon: Settings,
  },
];

export const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  const currentStepData = ONBOARDING_STEPS[currentStep];
  const progress = ((currentStep + 1) / ONBOARDING_STEPS.length) * 100;
  
  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/dashboard");
    }
  };
  
  const handleSkip = () => {
    navigate("/dashboard");
  };

  return (
    <div className="mobile-container flex flex-col min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      {/* Progress Indicator */}
      <div className="pt-8 pb-4">
        <Progress value={progress} className="h-2 mb-2" />
        <div className="flex justify-center space-x-2">
          {ONBOARDING_STEPS.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-colors duration-300",
                index <= currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-4">
        <Card className="card-nature p-8 text-center">
          {/* Logo */}
          {currentStep === 0 && (
            <div className="mb-8 flex justify-center">
              <img 
                src={logoImage} 
                alt="BioAdapt Logo" 
                className="w-24 h-24 loading-leaf"
              />
            </div>
          )}
          
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-gradient-sky rounded-full flex items-center justify-center">
              <currentStepData.icon className="w-8 h-8 text-white" />
            </div>
          </div>
          
          {/* Content */}
          <h1 className="font-header text-2xl mb-2 text-foreground">
            {currentStepData.title}
          </h1>
          <h2 className="font-body text-lg text-secondary mb-4">
            {currentStepData.subtitle}
          </h2>
          <p className="font-body text-foreground-body mb-8 leading-relaxed">
            {currentStepData.content}
          </p>
          
          {/* Call to Action */}
          {currentStep === ONBOARDING_STEPS.length - 1 ? (
            <Button
              variant="healing"
              size="lg"
              onClick={handleNext}
              className="w-full mb-4"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          ) : (
            <Button
              variant="default"
              size="lg"
              onClick={handleNext}
              className="w-full mb-4"
            >
              {currentStep === 2 ? "Allow Camera Access" : "Next"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          )}
          
          {currentStep < ONBOARDING_STEPS.length - 1 && (
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="text-muted-foreground"
            >
              Skip for now
            </Button>
          )}
        </Card>
      </div>
      
      {/* Footer */}
      <div className="p-4 text-center">
        <p className="font-caption text-sm text-muted-foreground">
          Step {currentStep + 1} of {ONBOARDING_STEPS.length}
        </p>
      </div>
    </div>
  );
};

function cn(...inputs: string[]) {
  return inputs.filter(Boolean).join(' ');
}