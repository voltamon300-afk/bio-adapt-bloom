import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Mic, 
  Eye, 
  Moon, 
  Globe, 
  Bell,
  Shield,
  HelpCircle,
  User,
  LogOut
} from "lucide-react";

export const Settings = () => {
  const navigate = useNavigate();
  const [voiceCommands, setVoiceCommands] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleLanguageChange = (value: string) => {
    console.log("Language changed to:", value);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="app-container min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Header */}
      <div className="grid grid-cols-3 items-center py-6 px-2">
        <div className="col-start-1">
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

        <div className="col-start-2 text-center">
          <h1 className="font-header text-xl md:text-2xl lg:text-3xl text-foreground responsive-header">
            Settings
          </h1>
        </div>

        <div className="col-start-3 text-right">
          <div className="w-16 inline-block" /> {/* keeps header balanced */}
        </div>
      </div>

      {/* Profile Section */}
      <div className="mb-6 px-2">
        <Card className="card-nature responsive-card-padding">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-sky rounded-full flex items-center justify-center">
              <User className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="font-header text-lg md:text-xl lg:text-2xl text-foreground">Jordan Davis</h2>
              <p className="font-body text-sm md:text-base text-muted-foreground">
                jordan.davis@email.com
              </p>
              <p className="font-caption text-xs md:text-sm text-secondary">
                Premium Member
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Accessibility Settings */}
      <div className="mb-6 px-2">
        <Card className="card-elevated responsive-card-padding">
          <h3 className="font-header text-lg md:text-xl lg:text-2xl text-foreground mb-4 flex items-center">
            <Eye className="w-5 h-5 md:w-6 md:h-6 mr-2 text-primary" />
            Accessibility
          </h3>
          
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="voice-commands" className="font-body text-sm md:text-base text-foreground">
                  Voice Commands
                </Label>
                <p className="font-caption text-xs md:text-sm text-muted-foreground">
                  Control the app with voice instructions
                </p>
              </div>
              <Switch
                id="voice-commands"
                checked={voiceCommands}
                onCheckedChange={setVoiceCommands}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="high-contrast" className="font-body text-sm md:text-base text-foreground">
                  High Contrast
                </Label>
                <p className="font-caption text-xs md:text-sm text-muted-foreground">
                  Increase contrast for better visibility
                </p>
              </div>
              <Switch
                id="high-contrast"
                checked={highContrast}
                onCheckedChange={setHighContrast}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="dark-mode" className="font-body text-sm md:text-base text-foreground">
                  Dark Mode
                </Label>
                <p className="font-caption text-xs md:text-sm text-muted-foreground">
                  Switch to dark theme
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Preferences */}
      <div className="mb-6 px-2">
        <Card className="card-elevated responsive-card-padding">
          <h3 className="font-header text-lg md:text-xl lg:text-2xl text-foreground mb-4 flex items-center">
            <Globe className="w-5 h-5 md:w-6 md:h-6 mr-2 text-secondary" />
            Preferences
          </h3>
          
          <div className="space-y-4 md:space-y-6">
            <div>
              <Label className="font-body text-sm md:text-base text-foreground mb-2 block">
                Language
              </Label>
              <Select onValueChange={handleLanguageChange} defaultValue="en">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                  <SelectItem value="es">🇪🇸 Español</SelectItem>
                  <SelectItem value="fr">🇫🇷 Français</SelectItem>
                  <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                  <SelectItem value="zh">🇨🇳 中文</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="notifications" className="font-body text-sm md:text-base text-foreground">
                  Push Notifications
                </Label>
                <p className="font-caption text-xs md:text-sm text-muted-foreground">
                  Receive session reminders and progress updates
                </p>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Support & Privacy */}
      <div className="mb-6 px-2">
        <Card className="card-elevated responsive-card-padding">
          <h3 className="font-header text-lg md:text-xl lg:text-2xl text-foreground mb-4 flex items-center">
            <Shield className="w-5 h-5 md:w-6 md:h-6 mr-2 text-accent" />
            Support & Privacy
          </h3>
          
          <div className="space-y-3">
            <Button
              variant="ghost"
              className="w-full justify-start text-sm md:text-base"
              onClick={() => {}}
            >
              <HelpCircle className="w-5 h-5 md:w-6 md:h-6 mr-3" />
              Help & Support
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start text-sm md:text-base"
              onClick={() => {}}
            >
              <Shield className="w-5 h-5 md:w-6 md:h-6 mr-3" />
              Privacy Policy
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start text-sm md:text-base"
              onClick={() => {}}
            >
              <Bell className="w-5 h-5 md:w-6 md:h-6 mr-3" />
              Notification Settings
            </Button>
          </div>
        </Card>
      </div>

      {/* Nature Inspiration Quote */}
      <div className="mb-6 px-2">
        <Card className="card-nature responsive-card-padding bg-gradient-calm border-secondary/20">
          <div className="text-center">
            <p className="text-nature-cue text-sm md:text-base mb-2">
              "In every walk with nature, one receives far more than they seek"
            </p>
            <p className="font-caption text-xs md:text-sm text-muted-foreground">
              - John Muir
            </p>
          </div>
        </Card>
      </div>

      {/* Logout */}
      <div className="px-2 pb-8">
        <Button
          variant="outline"
          size="lg"
          className="w-full max-w-md mx-auto block border-destructive/20 text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};