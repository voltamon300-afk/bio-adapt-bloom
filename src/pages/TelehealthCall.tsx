import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone,
  Settings,
  MessageSquare,
  Users,
  ArrowLeft,
  Calendar,
  Clock,
  User
} from "lucide-react";

export const TelehealthCall = () => {
  const navigate = useNavigate();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isInCall, setIsInCall] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isInCall) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isInCall]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleJoinCall = () => {
    setIsInCall(true);
  };

  const handleEndCall = () => {
    setIsInCall(false);
    setCallDuration(0);
    navigate("/dashboard");
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
  };

  if (isInCall) {
    return (
      <div className="relative min-h-screen bg-gray-900 overflow-hidden flex flex-col">
        {/* Main Video Area grows to fill space */}
        <div className="relative flex-1">
            {/* Clinician Video (Main) - Responsive */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-6">
              <div className="w-full max-w-6xl max-h-[calc(100vh-14rem)] h-full flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center overflow-hidden px-4">
                  <div className="text-center text-white px-4">
                    <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-gradient-sky rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-white" />
                    </div>
                    <h3 className="font-header text-xl md:text-2xl lg:text-3xl mb-2">Dr. Sarah Chen</h3>
                    <p className="font-body text-sm md:text-base opacity-80">Physical Therapist</p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Video (Picture-in-Picture) - Responsive and fits above controls */}
            <div
              className="absolute right-4 md:right-6"
              style={{ bottom: '5.5rem' }}
              aria-hidden={false}
            >
              <div className="rounded-lg border-2 border-white/20 overflow-hidden bg-gray-700" style={{ width: 'clamp(96px, 20vw, 320px)', height: 'clamp(128px, 28vw, 480px)' }}>
                <div className="w-full h-full bg-gradient-to-br from-secondary/30 to-primary/30 flex items-center justify-center">
                  {isVideoOn ? (
                    <div className="text-center text-white">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-healing rounded-full flex items-center justify-center mx-auto mb-2">
                        <User className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <p className="font-caption text-xs md:text-sm">You</p>
                    </div>
                  ) : (
                    <div className="text-center text-white/60">
                      <VideoOff className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2" />
                      <p className="font-caption text-xs md:text-sm">Video Off</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          {/* Call Info - Responsive */}
          <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
            <p className="font-caption text-sm md:text-base">{formatDuration(callDuration)}</p>
          </div>

              {/* Control Bar - Responsive: fixed overlay at bottom */}
          <div className="fixed left-0 right-0 bottom-0 bg-black/60 backdrop-blur-sm p-3 md:p-6 z-40">
            <div className="relative">
              {/* Centered trio: mic, video, end call */}
              <div className="mx-auto w-[min(420px,80vw)] flex items-center justify-between">
                <Button
                  variant={isMicOn ? "secondary" : "destructive"}
                  size="icon-lg"
                  onClick={toggleMic}
                  aria-label={isMicOn ? "Mute microphone" : "Unmute microphone"}
                  className="rounded-full w-12 h-12 md:w-14 md:h-14"
                >
                  {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                </Button>

                <Button
                  variant={isVideoOn ? "secondary" : "destructive"}
                  size="icon-lg"
                  onClick={toggleVideo}
                  aria-label={isVideoOn ? "Turn video off" : "Turn video on"}
                  className="rounded-full w-12 h-12 md:w-14 md:h-14"
                >
                  {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                </Button>

                <Button
                  variant="destructive"
                  size="icon-lg"
                  onClick={handleEndCall}
                  aria-label="End call"
                  className="rounded-full w-12 h-12 md:w-14 md:h-14"
                >
                  <Phone className="w-6 h-6 rotate-[135deg]" />
                </Button>
              </div>

              {/* Secondary icons right side: messages, settings */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-3">
                <Button
                  variant="nature"
                  aria-label="Open messages"
                  size="icon-lg"
                  className="rounded-full w-10 h-10 md:w-12 md:h-12"
                >
                  <MessageSquare className="w-5 h-5" />
                </Button>

                <Button
                  variant="ghost"
                  aria-label="Call settings"
                  size="icon-lg"
                  className="rounded-full text-white hover:bg-white/20 w-10 h-10 md:w-12 md:h-12"
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

            {/* Adjust Plan removed per request */}
        </div>
      </div>
    );
  }

  // Pre-call lobby - Responsive
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
          Telehealth
        </h1>

        <div className="w-16" />
      </div>

      {/* Upcoming Appointment */}
      <div className="mb-6 px-2">
        <Card className="card-nature responsive-card-padding">
          <div className="text-center mb-4">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-sky rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
            </div>
            <h2 className="font-header text-xl md:text-2xl lg:text-3xl text-foreground mb-2">
              Dr. Sarah Chen
            </h2>
            <p className="font-body text-sm md:text-base text-muted-foreground mb-1">
              Physical Therapist
            </p>
            <p className="font-caption text-xs md:text-sm text-secondary">
              Specialized in Bio-mimetic Rehabilitation
            </p>
          </div>

          <div className="bg-gradient-calm p-4 md:p-6 rounded-lg border border-secondary/10 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                <span className="font-body text-sm md:text-base text-foreground">Today</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
                <span className="font-body text-sm md:text-base text-foreground">2:00 PM</span>
              </div>
            </div>
            <p className="font-caption text-xs md:text-sm text-muted-foreground">
              Follow-up session: Progress review and plan adjustment
            </p>
          </div>

          <div className="text-center">
            <p className="text-nature-cue text-sm md:text-base mb-4">
              "Healing is a matter of time, but it is sometimes also a matter of opportunity"
            </p>
          </div>
        </Card>
      </div>

      {/* Pre-call Settings */}
      <div className="mb-6 px-2">
        <Card className="card-elevated responsive-card-padding">
          <h3 className="font-header text-lg md:text-xl lg:text-2xl text-foreground mb-4">
            Check Your Setup
          </h3>
          
          {/* Video Preview - Responsive */}
          <div className="mb-4">
            <div className="aspect-video bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg border border-border flex items-center justify-center mb-3">
              {isVideoOn ? (
                <div className="text-center text-foreground">
                  <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-healing rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
                  </div>
                  <p className="font-body text-sm md:text-base">Video Preview</p>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <VideoOff className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3" />
                  <p className="font-body text-sm md:text-base">Camera Off</p>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant={isMicOn ? "secondary" : "outline"}
                size="sm"
                onClick={toggleMic}
                className="flex items-center space-x-2"
              >
                {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                <span>{isMicOn ? "Mic On" : "Mic Off"}</span>
              </Button>
              
              <Button
                variant={isVideoOn ? "secondary" : "outline"}
                size="sm"
                onClick={toggleVideo}
                className="flex items-center space-x-2"
              >
                {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                <span>{isVideoOn ? "Video On" : "Video Off"}</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Connection Info */}
      <div className="mb-8 px-2">
        <Card className="card-elevated responsive-card-padding">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <p className="font-body text-sm md:text-base text-foreground">
              Secure connection ready
            </p>
          </div>
          <p className="font-caption text-xs md:text-sm text-muted-foreground mt-1 ml-5">
            Your session is encrypted and HIPAA compliant
          </p>
        </Card>
      </div>

      {/* Join Call Button */}
      <div className="px-2 pb-8">
        <Button
          variant="healing"
          size="xl"
          onClick={handleJoinCall}
          className="w-full max-w-md mx-auto flex items-center justify-center space-x-3"
        >
          <Video className="w-6 h-6" />
          <span>Join Call</span>
        </Button>
        
        <div className="text-center mt-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="text-muted-foreground"
          >
            Reschedule Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};