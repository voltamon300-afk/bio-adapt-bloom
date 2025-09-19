import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Play, 
  TrendingUp, 
  Video, 
  Award, 
  Settings, 
  Bell,
  Mic
} from "lucide-react";

const ACTION_CARDS = [
  {
    id: "session",
    title: "Start Session",
    subtitle: "Begin your healing",
    icon: Play,
    route: "/exercise",
    variant: "healing" as const,
    description: "Start your personalized rehabilitation session"
  },
  {
    id: "progress",
    title: "Progress",
    subtitle: "Track your journey",
    icon: TrendingUp,
    route: "/progress",
    variant: "default" as const,
    description: "View your recovery trends and achievements"
  },
  {
    id: "telehealth",
    title: "Telehealth",
    subtitle: "Connect with care",
    icon: Video,
    route: "/telehealth",
    variant: "nature" as const,
    description: "Schedule or join a video call with your clinician"
  },
  {
    id: "rewards",
    title: "Rewards",
    subtitle: "Celebrate milestones",
    icon: Award,
    route: "/progress",
    variant: "energy" as const,
    description: "View your achievements and unlock new goals"
  },
];

export const Dashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (route: string) => {
    navigate(route);
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  return (
    <div className="mobile-container min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Header */}
      <div className="flex items-center justify-between py-6 px-2">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/avatar-placeholder.png" alt="User" />
            <AvatarFallback className="bg-gradient-sky text-white font-header">
              JD
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-header text-xl text-foreground">
              Hello, Jordan
            </h1>
            <p className="font-caption text-sm text-muted-foreground">
              Ready to continue your healing journey?
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSettingsClick}
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="mb-8 px-2">
        <Card className="card-nature p-6 bg-gradient-calm border-secondary/20">
          <div className="text-center">
            <h2 className="font-header text-lg mb-2 text-foreground">
              Today's Focus: Gentle Movement
            </h2>
            <p className="text-nature-cue text-sm mb-4">
              "Like a tree that bends in the wind, find strength in flexibility"
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <span className="font-caption text-muted-foreground">3 exercises remaining</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="font-caption text-muted-foreground">15 min session</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Cards Grid */}
      <div className="mobile-grid mb-8 px-2">
        {ACTION_CARDS.map((card) => (
          <Card
            key={card.id}
            className="card-elevated cursor-pointer group p-6 hover:shadow-card-hover transition-all duration-300"
            onClick={() => handleCardClick(card.route)}
          >
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110
                  ${card.variant === 'healing' ? 'bg-gradient-healing' : 
                    card.variant === 'energy' ? 'bg-gradient-energy' : 
                    card.variant === 'nature' ? 'bg-gradient-calm border border-secondary/20' : 
                    'bg-primary'}
                `}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="font-header text-base mb-1 text-foreground">
                {card.title}
              </h3>
              <p className="font-caption text-xs text-muted-foreground mb-2">
                {card.subtitle}
              </p>
              <p className="font-body text-xs text-foreground-body leading-relaxed">
                {card.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="px-2 mb-6">
        <Card className="card-elevated p-4">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <p className="font-header text-lg text-primary">73%</p>
              <p className="font-caption text-xs text-muted-foreground">Progress</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center flex-1">
              <p className="font-header text-lg text-secondary">12</p>
              <p className="font-caption text-xs text-muted-foreground">Days Active</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center flex-1">
              <p className="font-header text-lg text-accent">245</p>
              <p className="font-caption text-xs text-muted-foreground">Points</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Voice Command Indicator */}
      <div className="fixed bottom-4 right-4">
        <Button
          variant="secondary"
          size="icon-lg"
          className="rounded-full shadow-lg bg-secondary/90 backdrop-blur-sm border border-secondary-foreground/10"
        >
          <Mic className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};