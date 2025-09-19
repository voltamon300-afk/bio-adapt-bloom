import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Play,
  TrendingUp,
  Video,
  Settings,
  Bell,
  Mic,
  Clock,
  Repeat,
  Share2,
  MessageSquare
} from "lucide-react";

const ACTION_CARDS = [
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
];

export const Dashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (route: string) => {
    navigate(route);
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  // Placeholder recent sessions data to render a small list.
  const recent = [
    { id: 1, title: "Knee Rehab - Session 12", date: "2025-09-18", duration: "15m" },
    { id: 2, title: "Mobility Check-in", date: "2025-09-15", duration: "10m" },
  ];

  return (
    <div className="app-container min-h-screen bg-gradient-to-b from-background via-background to-muted/20 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 md:w-14 md:h-14">
              <AvatarImage src="/avatar-placeholder.png" alt="User" />
              <AvatarFallback className="bg-gradient-sky text-white font-header">JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-header text-2xl md:text-3xl text-foreground">Hello, Jordan</h1>
              <p className="text-sm text-muted-foreground">Ready to continue your healing journey?</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="View notifications" title="You have new notifications">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSettingsClick} aria-label="Open settings">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Hero / Focus card */}
        <Card className="mb-8 card-nature responsive-card-padding bg-gradient-calm border-secondary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="font-header text-lg md:text-2xl text-foreground">Today's Focus: Gentle Movement</h2>
              <p className="text-sm text-nature-cue mt-1">"Like a tree that bends in the wind, find strength in flexibility"</p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <span>3 exercises</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>15 min</span>
              </div>
              <Button variant="healing" size="sm" onClick={() => navigate("/exercise")}>Continue</Button>
            </div>
          </div>
        </Card>

        {/* Action row - centered */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {ACTION_CARDS.map((card) => (
              <Card key={card.id} className="flex items-center gap-4 p-4 cursor-pointer hover:shadow-card-hover transition-all duration-200" onClick={() => handleCardClick(card.route)}>
                <div className={
                  `flex-shrink-0 rounded-xl flex items-center justify-center p-3 transition-transform duration-200` +
                  (card.variant === 'healing' ? ' bg-gradient-healing' : card.variant === 'nature' ? ' bg-gradient-calm border border-secondary/20' : ' bg-primary')
                }>
                  <card.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-header text-base md:text-lg text-foreground">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.subtitle}</p>
                  <p className="mt-2 text-sm text-foreground-body">{card.description}</p>
                </div>
                <div className="hidden md:block">
                  <Button variant="ghost" size="sm" aria-label={`Open ${card.title}`}>Open</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats + Recent */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl md:text-3xl font-header text-primary">73%</p>
                <p className="text-sm text-muted-foreground">Progress</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium">12</p>
                <p className="text-sm text-muted-foreground">Days Active</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div>
              <p className="text-lg font-header mb-2">Recent Sessions</p>
              <ul className="space-y-2">
                {recent.map((r) => (
                  <li key={r.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{r.title}</p>
                      <p className="text-xs text-muted-foreground">{r.date} • {r.duration}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon-sm" aria-label="Retry session"><Repeat className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon-sm" aria-label="Share session"><Share2 className="w-4 h-4" /></Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex flex-col h-full justify-between">
              <div>
                <p className="text-lg font-header mb-2">Quick Actions</p>
                <div className="flex flex-col gap-2">
                  <Button variant="session" size="default" onClick={() => navigate('/exercise')}>
                    <Play className="w-4 h-4 mr-2" /> Start Session
                  </Button>
                  <Button variant="secondary" size="default" onClick={() => navigate('/progress')}>
                    <TrendingUp className="w-4 h-4 mr-2" /> View Progress
                  </Button>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-4">Last synced: 2 hours ago</div>
            </div>
          </Card>
        </div>

      </div>

      {/* Voice Command Indicator */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8">
        <Button variant="secondary" size="icon-lg" className="rounded-full shadow-lg bg-secondary/90 backdrop-blur-sm border border-secondary-foreground/10" aria-label="Voice command">
          <Mic className="w-5 h-5" />
        </Button>
      </div>

      {/* Chatbot / Assistant */}
      <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 lg:bottom-8 lg:left-8">
        <Button variant="healing" size="icon-lg" className="rounded-full shadow-lg bg-gradient-healing/95 backdrop-blur-sm border border-secondary-foreground/10" aria-label="Open assistant">
          <MessageSquare className="w-5 h-5 text-white" />
        </Button>
      </div>
    </div>
  );
};